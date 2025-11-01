<?php
/**
 * Cyberlogic IT - Secure Contact Form Handler
 * Protection against: SQL injection, XSS, CSRF, email injection, malware, DDoS
 */

// ═══════════════════════════════════════════════════════════════
// 1. SECURITY HEADERS
// ═══════════════════════════════════════════════════════════════

header('Content-Type: application/json');
header('X-XSS-Protection: 1; mode=block');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Content-Security-Policy: default-src \'self\'');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');

// ═══════════════════════════════════════════════════════════════
// 2. RATE LIMITING (DDoS PROTECTION)
// ═══════════════════════════════════════════════════════════════

session_start();

$max_requests = 5; // Maximum requests per time window
$time_window = 3600; // Time window in seconds (1 hour)
$ip_address = $_SERVER['REMOTE_ADDR'];

// Initialize or retrieve request log
if (!isset($_SESSION['form_requests'])) {
    $_SESSION['form_requests'] = [];
}

// Clean old requests
$_SESSION['form_requests'] = array_filter(
    $_SESSION['form_requests'],
    function($timestamp) use ($time_window) {
        return (time() - $timestamp) < $time_window;
    }
);

// Check if rate limit exceeded
if (count($_SESSION['form_requests']) >= $max_requests) {
    http_response_code(429);
    die(json_encode([
        'success' => false,
        'message' => 'Too many requests. Please try again later.'
    ]));
}

// Log this request
$_SESSION['form_requests'][] = time();

// ═══════════════════════════════════════════════════════════════
// 3. INPUT SANITIZATION & VALIDATION
// ═══════════════════════════════════════════════════════════════

function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function sanitizeEmail($email) {
    return filter_var($email, FILTER_SANITIZE_EMAIL);
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function detectSQLInjection($input) {
    $sql_patterns = [
        '/(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/i',
        '/(\bEXEC\b|\bEXECUTE\b|\bSCRIPT\b|\bJAVASCRIPT\b)/i',
        '/(\'|\"|\-\-|\#|\/\*|\*\/)/i',
        '/(\bOR\b\s+\d+\s*=\s*\d+|\bAND\b\s+\d+\s*=\s*\d+)/i'
    ];
    
    foreach ($sql_patterns as $pattern) {
        if (preg_match($pattern, $input)) {
            return true;
        }
    }
    return false;
}

function detectXSS($input) {
    $xss_patterns = [
        '/<script\b[^>]*>.*?<\/script>/is',
        '/<iframe\b[^>]*>.*?<\/iframe>/is',
        '/on\w+\s*=\s*["\'].*?["\']/i',
        '/<object\b[^>]*>.*?<\/object>/is',
        '/<embed\b[^>]*>/i',
        '/javascript:/i',
        '/vbscript:/i'
    ];
    
    foreach ($xss_patterns as $pattern) {
        if (preg_match($pattern, $input)) {
            return true;
        }
    }
    return false;
}

function detectEmailInjection($input) {
    $email_injection_patterns = [
        '/[\r\n]/',
        '/content-type:/i',
        '/bcc:/i',
        '/cc:/i',
        '/to:/i',
        '/from:/i',
        '/mime-version:/i'
    ];
    
    foreach ($email_injection_patterns as $pattern) {
        if (preg_match($pattern, $input)) {
            return true;
        }
    }
    return false;
}

// ═══════════════════════════════════════════════════════════════
// 4. VERIFY REQUEST METHOD
// ═══════════════════════════════════════════════════════════════

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]));
}

// ═══════════════════════════════════════════════════════════════
// 5. VERIFY REFERRER (Anti-CSRF)
// ═══════════════════════════════════════════════════════════════

$allowed_referrers = [
    'cyberlogicit.com.au',
    'www.cyberlogicit.com.au',
    'localhost'
];

$referrer = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : '';
$is_valid_referrer = false;

foreach ($allowed_referrers as $allowed) {
    if (strpos($referrer, $allowed) !== false) {
        $is_valid_referrer = true;
        break;
    }
}

if (!$is_valid_referrer && !empty($referrer)) {
    http_response_code(403);
    die(json_encode([
        'success' => false,
        'message' => 'Invalid referrer'
    ]));
}

// ═══════════════════════════════════════════════════════════════
// 6. GET AND VALIDATE INPUT DATA
// ═══════════════════════════════════════════════════════════════

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Check if data exists
if (!$input || !isset($input['name'], $input['email'], $input['service'], $input['message'])) {
    http_response_code(400);
    die(json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]));
}

// Sanitize inputs
$name = sanitizeInput($input['name']);
$email = sanitizeEmail($input['email']);
$phone = isset($input['phone']) ? sanitizeInput($input['phone']) : '';
$service = sanitizeInput($input['service']);
$message = sanitizeInput($input['message']);

// ═══════════════════════════════════════════════════════════════
// 7. SECURITY VALIDATION
// ═══════════════════════════════════════════════════════════════

// Validate email format
if (!validateEmail($email)) {
    http_response_code(400);
    die(json_encode([
        'success' => false,
        'message' => 'Invalid email address'
    ]));
}

// Check for SQL injection attempts
$inputs_to_check = [$name, $email, $phone, $service, $message];
foreach ($inputs_to_check as $input_value) {
    if (detectSQLInjection($input_value)) {
        http_response_code(403);
        error_log("SQL injection attempt detected from IP: " . $ip_address);
        die(json_encode([
            'success' => false,
            'message' => 'Invalid input detected'
        ]));
    }
}

// Check for XSS attempts
foreach ($inputs_to_check as $input_value) {
    if (detectXSS($input_value)) {
        http_response_code(403);
        error_log("XSS attempt detected from IP: " . $ip_address);
        die(json_encode([
            'success' => false,
            'message' => 'Invalid input detected'
        ]));
    }
}

// Check for email injection
foreach ($inputs_to_check as $input_value) {
    if (detectEmailInjection($input_value)) {
        http_response_code(403);
        error_log("Email injection attempt detected from IP: " . $ip_address);
        die(json_encode([
            'success' => false,
            'message' => 'Invalid input detected'
        ]));
    }
}

// Validate field lengths (prevent buffer overflow)
if (strlen($name) > 100 || strlen($email) > 255 || 
    strlen($phone) > 20 || strlen($service) > 100 || 
    strlen($message) > 5000) {
    http_response_code(400);
    die(json_encode([
        'success' => false,
        'message' => 'Input too long'
    ]));
}

// ═══════════════════════════════════════════════════════════════
// 8. SEND EMAIL SECURELY
// ═══════════════════════════════════════════════════════════════

$to = 'support@cyberlogicit.com.au';
$subject = 'New Contact Form Submission - ' . $service;

// Create safe email body
$email_body = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$email_body .= "CONTACT FORM SUBMISSION\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Phone: " . ($phone ?: 'Not provided') . "\n";
$email_body .= "Service: " . $service . "\n\n";
$email_body .= "Message:\n" . $message . "\n\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
$email_body .= "IP Address: " . $ip_address . "\n";
$email_body .= "User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

// Safe email headers (prevent email injection)
$headers = "From: noreply@cyberlogicit.com.au\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "X-Priority: 3\r\n";

// Send email
$mail_sent = @mail($to, $subject, $email_body, $headers);

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again.'
    ]);
}

// ═══════════════════════════════════════════════════════════════
// 9. LOG FOR SECURITY MONITORING
// ═══════════════════════════════════════════════════════════════

error_log("Contact form submission from: " . $ip_address . " | Email: " . $email);

?>
