/**
 * Admin Content Sync
 * This file reads localStorage data set by the admin panel and updates the website content in real-time
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdminSync);
    } else {
        initAdminSync();
    }

    function initAdminSync() {
        // Sync all content sections
        syncStatistics();
        syncServices();
        syncHeaderFooter();
        syncHeroContent();
        syncContactInfo();
        syncConversationSection();
        syncAboutSection();
        syncServicesHeader();
        syncFAQs();
        syncProcess();
        syncBenefits();
        syncIndustries();
        syncAboutPage();
        
        console.log('✓ Admin content synced to website');
    }

    // Sync Statistics
    function syncStatistics() {
        const stats = JSON.parse(localStorage.getItem('websiteStatistics') || '{}');
        
        if (stats.yearsExperience) {
            const elements = document.querySelectorAll('[data-stat="years"], .stat-years, #years-experience');
            elements.forEach(el => el.textContent = stats.yearsExperience);
        }
        
        if (stats.projectsCompleted) {
            const elements = document.querySelectorAll('[data-stat="projects"], .stat-projects, #projects-completed');
            elements.forEach(el => el.textContent = stats.projectsCompleted);
        }
        
        if (stats.happyClients) {
            const elements = document.querySelectorAll('[data-stat="clients"], .stat-clients, #happy-clients');
            elements.forEach(el => el.textContent = stats.happyClients);
        }
        
        if (stats.supportHours) {
            const elements = document.querySelectorAll('[data-stat="support"], .stat-support, #support-hours');
            elements.forEach(el => el.textContent = stats.supportHours);
        }
    }

    // Sync Services
    function syncServices() {
        const services = JSON.parse(localStorage.getItem('websiteServices') || '[]');
        if (services.length === 0) return;
        
        const servicesContainer = document.querySelector('.services-grid, #services-list, .services-container');
        if (!servicesContainer) return;
        
        servicesContainer.innerHTML = services.map(service => `
            <div class="service-card">
                <i class="fas fa-${service.icon}" style="font-size: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');
    }

    // Sync Header & Footer
    function syncHeaderFooter() {
        const data = JSON.parse(localStorage.getItem('websiteHeaderFooter') || '{}');
        
        // Company Name
        if (data.companyName) {
            const elements = document.querySelectorAll('.company-name, .brand-name, header .logo-text');
            elements.forEach(el => el.textContent = data.companyName);
        }
        
        // Tagline
        if (data.companyTagline) {
            const elements = document.querySelectorAll('.company-tagline, .tagline');
            elements.forEach(el => el.textContent = data.companyTagline);
        }
        
        // Contact Info
        if (data.contactEmail) {
            const elements = document.querySelectorAll('[data-contact="email"], .contact-email, a[href^="mailto:"]');
            elements.forEach(el => {
                el.textContent = data.contactEmail;
                if (el.tagName === 'A') el.href = `mailto:${data.contactEmail}`;
            });
        }
        
        if (data.contactPhone) {
            const elements = document.querySelectorAll('[data-contact="phone"], .contact-phone, a[href^="tel:"]');
            elements.forEach(el => {
                el.textContent = data.contactPhone;
                if (el.tagName === 'A') el.href = `tel:${data.contactPhone.replace(/\s/g, '')}`;
            });
        }
        
        if (data.contactAddress) {
            const elements = document.querySelectorAll('[data-contact="address"], .contact-address');
            elements.forEach(el => el.textContent = data.contactAddress);
        }
        
        // Social Media
        if (data.socialFacebook) {
            const elements = document.querySelectorAll('a.social-facebook, a[href*="facebook"]');
            elements.forEach(el => el.href = data.socialFacebook);
        }
        
        if (data.socialTwitter) {
            const elements = document.querySelectorAll('a.social-twitter, a[href*="twitter"]');
            elements.forEach(el => el.href = data.socialTwitter);
        }
        
        if (data.socialLinkedIn) {
            const elements = document.querySelectorAll('a.social-linkedin, a[href*="linkedin"]');
            elements.forEach(el => el.href = data.socialLinkedIn);
        }
    }

    // Sync Hero Content
    function syncHeroContent() {
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        if (content.heroHeading) {
            const elements = document.querySelectorAll('.hero-heading, #hero-heading, .hero h1');
            elements.forEach(el => el.textContent = content.heroHeading);
        }
        
        if (content.heroSubheading) {
            const elements = document.querySelectorAll('.hero-subheading, #hero-subheading, .hero p.lead');
            elements.forEach(el => el.textContent = content.heroSubheading);
        }
        
        if (content.heroPrimaryBtn) {
            const elements = document.querySelectorAll('.hero-btn-primary, .btn-primary.hero-cta');
            elements.forEach(el => el.textContent = content.heroPrimaryBtn);
        }
        
        if (content.heroPrimaryLink) {
            const elements = document.querySelectorAll('.hero-btn-primary, .btn-primary.hero-cta');
            elements.forEach(el => {
                if (el.tagName === 'A') el.href = content.heroPrimaryLink;
            });
        }
        
        if (content.heroSecondaryBtn) {
            const elements = document.querySelectorAll('.hero-btn-secondary, .btn-secondary.hero-cta');
            elements.forEach(el => el.textContent = content.heroSecondaryBtn);
        }
        
        if (content.heroSecondaryLink) {
            const elements = document.querySelectorAll('.hero-btn-secondary, .btn-secondary.hero-cta');
            elements.forEach(el => {
                if (el.tagName === 'A') el.href = content.heroSecondaryLink);
            });
        }
    }

    // Sync Contact Info (in content section)
    function syncContactInfo() {
        const headerFooter = JSON.parse(localStorage.getItem('websiteHeaderFooter') || '{}');
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        // Sync phone
        if (headerFooter.contactPhone) {
            const elements = document.querySelectorAll('.contact-section [data-contact="phone"]');
            elements.forEach(el => el.textContent = headerFooter.contactPhone);
        }
        
        // Sync email
        if (headerFooter.contactEmail) {
            const elements = document.querySelectorAll('.contact-section [data-contact="email"]');
            elements.forEach(el => el.textContent = headerFooter.contactEmail);
        }
        
        // Sync address
        if (headerFooter.contactAddress) {
            const elements = document.querySelectorAll('.contact-section [data-contact="address"]');
            elements.forEach(el => el.textContent = headerFooter.contactAddress);
        }
        
        // Sync hours
        if (content.contactHours) {
            const elements = document.querySelectorAll('[data-contact="hours"], .contact-hours');
            elements.forEach(el => el.textContent = content.contactHours);
        }
    }

    // Sync Conversation Section
    function syncConversationSection() {
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        if (content.conversationHeading) {
            const elements = document.querySelectorAll('.conversation-heading, #conversation-heading');
            elements.forEach(el => el.textContent = content.conversationHeading);
        }
        
        if (content.conversationDesc) {
            const elements = document.querySelectorAll('.conversation-description, #conversation-desc');
            elements.forEach(el => el.textContent = content.conversationDesc);
        }
    }

    // Sync About Section
    function syncAboutSection() {
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        if (content.aboutHeading) {
            const elements = document.querySelectorAll('.about-heading, #about-heading');
            elements.forEach(el => el.textContent = content.aboutHeading);
        }
        
        if (content.aboutPara1) {
            const elements = document.querySelectorAll('.about-para-1, #about-para-1');
            elements.forEach(el => el.textContent = content.aboutPara1);
        }
        
        if (content.aboutPara2) {
            const elements = document.querySelectorAll('.about-para-2, #about-para-2');
            elements.forEach(el => el.textContent = content.aboutPara2);
        }
    }

    // Sync Services Header
    function syncServicesHeader() {
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        if (content.servicesHeading) {
            const elements = document.querySelectorAll('.services-section-heading, #services-heading');
            elements.forEach(el => el.textContent = content.servicesHeading);
        }
        
        if (content.servicesDesc) {
            const elements = document.querySelectorAll('.services-section-description, #services-desc');
            elements.forEach(el => el.textContent = content.servicesDesc);
        }
    }

    // Sync FAQs
    function syncFAQs() {
        const faqs = JSON.parse(localStorage.getItem('websiteFAQs') || '[]');
        if (faqs.length === 0) return;
        
        const faqContainer = document.querySelector('.faq-list, #faq-list, .faq-container');
        if (!faqContainer) return;
        
        faqContainer.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item">
                <h4 class="faq-question">${faq.question}</h4>
                <p class="faq-answer">${faq.answer}</p>
            </div>
        `).join('');
    }

    // Sync Process Steps
    function syncProcess() {
        const steps = JSON.parse(localStorage.getItem('websiteProcess') || '[]');
        if (steps.length === 0) return;
        
        const processContainer = document.querySelector('.process-steps, #process-list, .process-container');
        if (!processContainer) return;
        
        processContainer.innerHTML = steps.map((step, index) => `
            <div class="process-step">
                <div class="step-number">${index + 1}</div>
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        `).join('');
    }

    // Sync Benefits (Why Choose Us)
    function syncBenefits() {
        const benefits = JSON.parse(localStorage.getItem('websiteBenefits') || '[]');
        if (benefits.length === 0) return;
        
        const benefitsContainer = document.querySelector('.benefits-grid, #benefits-list, .why-choose-us');
        if (!benefitsContainer) return;
        
        benefitsContainer.innerHTML = benefits.map(benefit => `
            <div class="benefit-card">
                <i class="fas fa-${benefit.icon}" style="font-size: 36px; color: var(--primary); margin-bottom: 15px;"></i>
                <h4>${benefit.title}</h4>
                <p>${benefit.description}</p>
            </div>
        `).join('');
    }

    // Sync Industries
    function syncIndustries() {
        const industries = JSON.parse(localStorage.getItem('websiteIndustries') || '[]');
        if (industries.length === 0) return;
        
        const industriesContainer = document.querySelector('.industries-grid, #industries-list, .industries-container');
        if (!industriesContainer) return;
        
        industriesContainer.innerHTML = industries.map(industry => `
            <div class="industry-card">
                <i class="fas fa-${industry.icon}" style="font-size: 36px; color: var(--primary); margin-bottom: 15px;"></i>
                <h4>${industry.name}</h4>
                <p>${industry.description}</p>
            </div>
        `).join('');
    }

    // Sync About Page
    function syncAboutPage() {
        const about = JSON.parse(localStorage.getItem('websiteAbout') || '{}');
        
        if (about.companyName) {
            const elements = document.querySelectorAll('.about-company-name');
            elements.forEach(el => el.textContent = about.companyName);
        }
        
        if (about.tagline) {
            const elements = document.querySelectorAll('.about-tagline');
            elements.forEach(el => el.textContent = about.tagline);
        }
        
        if (about.story) {
            const elements = document.querySelectorAll('.about-story, #company-story');
            elements.forEach(el => el.textContent = about.story);
        }
        
        if (about.mission) {
            const elements = document.querySelectorAll('.mission-statement, #mission');
            elements.forEach(el => el.textContent = about.mission);
        }
        
        if (about.vision) {
            const elements = document.querySelectorAll('.vision-statement, #vision');
            elements.forEach(el => el.textContent = about.vision);
        }
        
        if (about.values) {
            const elements = document.querySelectorAll('.core-values, #values');
            elements.forEach(el => {
                // Format values as list if it contains newlines
                if (about.values.includes('\n')) {
                    const valuesList = about.values.split('\n').filter(v => v.trim());
                    el.innerHTML = '<ul>' + valuesList.map(v => `<li>${v}</li>`).join('') + '</ul>';
                } else {
                    el.textContent = about.values;
                }
            });
        }
    }

    // Listen for storage changes from admin panel
    window.addEventListener('storage', function(e) {
        if (e.key && e.key.startsWith('website')) {
            console.log('✓ Content updated from admin panel');
            initAdminSync();
        }
    });

})();
