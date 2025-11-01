<?php
/**
 * Contact Form Email Handler
 * Cyberlogic IT - Contact Form Backend
 * 
 * This script processes contact form submissions and sends emails to support@cyberlogicit.com.au
 */

// Security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Allow CORS from your domain only (update with your actual domain)
header('Access-Control-Allow-Origin: https://www.cyberlogicit.com.au');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
define('RECIPIENT_EMAIL', 'support@cyberlogicit.com.au');
define('FROM_EMAIL', 'noreply@cyberlogicit.com.au');
define('FROM_NAME', 'Cyberlogic IT Website');

// Response function
function sendResponse($success, $message, $httpCode = 200) {
    http_response_code($httpCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method. Only POST requests are allowed.', 405);
}

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$requiredFields = ['name', 'email', 'service', 'message'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        sendResponse(false, "Missing required field: {$field}", 400);
    }
}

// Sanitize inputs
$name = filter_var(trim($data['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? filter_var(trim($data['phone']), FILTER_SANITIZE_STRING) : 'Not provided';
$service = filter_var(trim($data['service']), FILTER_SANITIZE_STRING);
$message = filter_var(trim($data['message']), FILTER_SANITIZE_STRING);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Invalid email address format.', 400);
}

// Validate name length
if (strlen($name) < 2 || strlen($name) > 100) {
    sendResponse(false, 'Name must be between 2 and 100 characters.', 400);
}

// Validate message length
if (strlen($message) < 10 || strlen($message) > 2000) {
    sendResponse(false, 'Message must be between 10 and 2000 characters.', 400);
}

// Service name mapping
$serviceNames = [
    'custom-systems' => 'Custom Computer Systems',
    'consulting' => 'IT Consulting',
    'network' => 'Network Solutions',
    'security' => 'Cybersecurity',
    'cloud' => 'Cloud Services',
    'support' => 'IT Support',
    'other' => 'Other'
];

$serviceName = isset($serviceNames[$service]) ? $serviceNames[$service] : 'General Inquiry';

// Prepare email
$subject = "New Contact Form Submission - {$serviceName}";
$timestamp = date('l, F j, Y \a\t g:i A T');

// HTML Email Body
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a2332; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #E89523; margin-bottom: 5px; }
        .value { color: #333; padding: 10px; background: white; border-left: 3px solid #E89523; }
        .message-box { background: white; padding: 15px; border: 1px solid #ddd; border-radius: 4px; white-space: pre-wrap; }
        .footer { background: #1a2332; color: #999; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
        .timestamp { color: #666; font-size: 12px; margin-top: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🔔 New Contact Form Submission</h2>
            <p>Cyberlogic IT Website</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Name:</div>
                <div class='value'>{$name}</div>
            </div>
            
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div class='value'><a href='mailto:{$email}'>{$email}</a></div>
            </div>
            
            <div class='field'>
                <div class='label'>📱 Phone:</div>
                <div class='value'>{$phone}</div>
            </div>
            
            <div class='field'>
                <div class='label'>🔧 Service Interested:</div>
                <div class='value'>{$serviceName}</div>
            </div>
            
            <div class='field'>
                <div class='label'>💬 Message:</div>
                <div class='message-box'>{$message}</div>
            </div>
            
            <div class='timestamp'>
                📅 Submitted on {$timestamp}
            </div>
        </div>
        <div class='footer'>
            <p>This is an automated message from your website contact form.</p>
            <p>Please respond to {$email} to continue the conversation.</p>
        </div>
    </div>
</body>
</html>
";

// Plain text version (fallback)
$textBody = "
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:     {$name}
Email:    {$email}
Phone:    {$phone}
Service:  {$serviceName}

Message:
{$message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: {$timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {$email}
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1',
    'Importance: High'
];

// Send email
$mailSent = mail(
    RECIPIENT_EMAIL,
    $subject,
    $htmlBody,
    implode("\r\n", $headers)
);

// Log submission (optional - for debugging)
if (defined('LOG_SUBMISSIONS') && LOG_SUBMISSIONS) {
    $logEntry = date('Y-m-d H:i:s') . " | {$name} | {$email} | {$service}\n";
    file_put_contents(__DIR__ . '/contact-submissions.log', $logEntry, FILE_APPEND | LOCK_EX);
}

// Send response
if ($mailSent) {
    sendResponse(true, 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
} else {
    sendResponse(false, 'Sorry, there was an error sending your message. Please try again or email us directly at support@cyberlogicit.com.au', 500);
}
?>
