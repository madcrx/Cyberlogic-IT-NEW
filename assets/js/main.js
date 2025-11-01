/**
 * Cyberlogic IT - Main JavaScript
 * Handles all interactivity, animations, and form submissions
 */

// ===== Utility Functions =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== Navigation Functionality =====
class Navigation {
    constructor() {
        this.navbar = $('#navbar');
        this.navToggle = $('#navToggle');
        this.navMenu = $('#navMenu');
        this.navLinks = $$('.nav-link');
        this.init();
    }

    init() {
        // Scroll event for navbar
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        this.updateActiveLink();
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    handleLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Only handle internal links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = $(`#${targetId}`);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            if (this.navMenu.classList.contains('active')) {
                this.toggleMenu();
            }
        }
    }

    handleOutsideClick(e) {
        if (!this.navMenu.contains(e.target) && 
            !this.navToggle.contains(e.target) && 
            this.navMenu.classList.contains('active')) {
            this.toggleMenu();
        }
    }

    updateActiveLink() {
        const sections = $$('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== Counter Animation =====
class CounterAnimation {
    constructor() {
        this.counters = $$('.stat-number');
        this.animated = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.checkScroll());
        this.checkScroll(); // Check on load
    }

    checkScroll() {
        if (this.animated) return;

        const heroStats = $('.hero-stats');
        if (!heroStats) return;

        const statsPosition = heroStats.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (statsPosition < screenHeight - 100) {
            this.animated = true;
            this.animateCounters();
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// ===== FAQ Accordion =====
class FAQAccordion {
    constructor() {
        this.faqItems = $$('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// ===== Contact Form Validation and Submission =====
class ContactForm {
    constructor() {
        this.form = $('#contactForm');
        if (!this.form) return;
        
        this.nameInput = $('#name');
        this.emailInput = $('#email');
        this.phoneInput = $('#phone');
        this.serviceSelect = $('#service');
        this.messageInput = $('#message');
        this.submitBtn = this.form.querySelector('.btn-submit');
        this.messageBox = this.form.querySelector('.form-message');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        [this.nameInput, this.emailInput, this.phoneInput, this.serviceSelect, this.messageInput].forEach(input => {
            if (input) {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            }
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorSpan = formGroup.querySelector('.form-error');
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearError(field);

        // Validation rules
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            formGroup.classList.add('error');
            errorSpan.textContent = errorMessage;
        }

        return isValid;
    }

    clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorSpan = formGroup.querySelector('.form-error');
        formGroup.classList.remove('error');
        errorSpan.textContent = '';
    }

    validateForm() {
        const fields = [this.nameInput, this.emailInput, this.serviceSelect, this.messageInput];
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate phone if provided
        if (this.phoneInput.value) {
            if (!this.validateField(this.phoneInput)) {
                isValid = false;
            }
        }

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.showMessage('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        // Collect form data
        const formData = {
            name: this.nameInput.value,
            email: this.emailInput.value,
            phone: this.phoneInput.value,
            service: this.serviceSelect.value,
            message: this.messageInput.value,
            timestamp: new Date().toISOString()
        };

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateSubmission(formData);
            
            // Success
            this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
            this.form.reset();
            
            // Store submission in localStorage for admin panel
            this.storeSubmission(formData);
            
        } catch (error) {
            this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    simulateSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 1500);
        });
    }

    storeSubmission(data) {
        try {
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(data);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        } catch (error) {
            console.error('Error storing submission:', error);
        }
    }

    showMessage(text, type) {
        this.messageBox.textContent = text;
        this.messageBox.className = `form-message ${type}`;
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                this.messageBox.className = 'form-message';
            }, 5000);
        }
    }
}

// ===== Scroll to Top Button =====
class ScrollToTop {
    constructor() {
        this.button = $('#scrollTop');
        if (!this.button) return;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===== Intersection Observer for Animations =====
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and content sections
        const elements = $$('.service-card, .industry-card, .why-us-item, .process-step, .contact-content > *');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

// ===== Set Current Year in Footer =====
function setCurrentYear() {
    const yearSpan = $('#currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ===== Initialize Everything on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new CounterAnimation();
    new FAQAccordion();
    new ContactForm();
    new ScrollToTop();
    new ScrollAnimations();
    setCurrentYear();

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = $(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation fade-out
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Console message
    console.log('%c Cyberlogic IT ', 'background: linear-gradient(135deg, #E89523 0%, #F2A843 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    console.log('%c Professional IT Solutions & Custom Computer Systems ', 'color: #6b7280; font-size: 12px;');
});

// ===== Service Worker Registration (for PWA capabilities) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}

// ===== Export for admin panel =====
window.CyberlogicIT = {
    getContactSubmissions: () => {
        try {
            return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        } catch {
            return [];
        }
    },
    clearContactSubmissions: () => {
        localStorage.removeItem('contactSubmissions');
        return true;
    },
    exportSubmissions: () => {
        const submissions = window.CyberlogicIT.getContactSubmissions();
        const dataStr = JSON.stringify(submissions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cyberlogic-submissions-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};
