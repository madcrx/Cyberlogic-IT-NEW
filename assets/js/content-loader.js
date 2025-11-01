/**
 * Dynamic Content Loader
 * Loads content from localStorage and updates the website dynamically
 * This allows admin panel changes to appear on the website immediately
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContentLoader);
    } else {
        initContentLoader();
    }

    function initContentLoader() {
        loadAllContent();
    }

    function loadAllContent() {
        loadHeroContent();
        loadStatistics();
        loadServices();
        loadAboutContent();
        loadWhyChooseUs();
        loadProcessSteps();
        loadIndustries();
        loadFAQ();
        loadContactInfo();
        loadHeaderFooter();
    }

    // ═══════════════════════════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════════════════════════
    function loadHeroContent() {
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        if (content.heroHeading) {
            const heroHeading = document.querySelector('.hero h1, .hero-content h1');
            if (heroHeading) heroHeading.textContent = content.heroHeading;
        }
        
        if (content.heroSubheading) {
            const heroSubheading = document.querySelector('.hero p, .hero-content > p');
            if (heroSubheading) heroSubheading.textContent = content.heroSubheading;
        }
        
        if (content.heroPrimaryBtn) {
            const primaryBtn = document.querySelector('.hero .btn-primary, .hero-buttons .btn-primary');
            if (primaryBtn) {
                primaryBtn.textContent = content.heroPrimaryBtn;
                if (content.heroPrimaryLink) primaryBtn.href = content.heroPrimaryLink;
            }
        }
        
        if (content.heroSecondaryBtn) {
            const secondaryBtn = document.querySelector('.hero .btn-secondary, .hero-buttons .btn-secondary');
            if (secondaryBtn) {
                secondaryBtn.textContent = content.heroSecondaryBtn;
                if (content.heroSecondaryLink) secondaryBtn.href = content.heroSecondaryLink;
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // STATISTICS
    // ═══════════════════════════════════════════════════════════
    function loadStatistics() {
        const stats = JSON.parse(localStorage.getItem('websiteStatistics') || '{}');
        
        if (Object.keys(stats).length === 0) return;
        
        // Find all stat numbers
        const statElements = document.querySelectorAll('.stat-number, .stats-number, [data-stat]');
        
        statElements.forEach(el => {
            const statType = el.getAttribute('data-stat') || el.parentElement.querySelector('h4, h3, p')?.textContent.toLowerCase();
            
            if (statType && statType.includes('year') && stats.yearsExperience) {
                el.textContent = stats.yearsExperience + (stats.yearsExperience > 1 ? '+' : '');
            } else if (statType && statType.includes('project') && stats.projectsCompleted) {
                el.textContent = stats.projectsCompleted + '+';
            } else if (statType && statType.includes('client') && stats.happyClients) {
                el.textContent = stats.happyClients + '+';
            } else if (statType && statType.includes('support') && stats.supportHours) {
                el.textContent = stats.supportHours;
            }
        });
    }

    // ═══════════════════════════════════════════════════════════
    // SERVICES
    // ═══════════════════════════════════════════════════════════
    function loadServices() {
        const services = JSON.parse(localStorage.getItem('websiteServices') || '[]');
        
        if (services.length === 0) return;
        
        const servicesContainer = document.querySelector('.services-grid, .service-cards');
        if (!servicesContainer) return;
        
        servicesContainer.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');
    }

    // ═══════════════════════════════════════════════════════════
    // ABOUT SECTION
    // ═══════════════════════════════════════════════════════════
    function loadAboutContent() {
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        if (content.aboutHeading) {
            const aboutHeading = document.querySelector('#about h2.section-title, .about h2');
            if (aboutHeading) aboutHeading.textContent = content.aboutHeading;
        }
        
        if (content.aboutPara1 || content.aboutPara2) {
            const aboutText = document.querySelector('.about-text, #about .about-content p');
            if (aboutText) {
                let html = '';
                if (content.aboutPara1) html += `<p>${content.aboutPara1}</p>`;
                if (content.aboutPara2) html += `<p>${content.aboutPara2}</p>`;
                aboutText.innerHTML = html;
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // WHY CHOOSE US
    // ═══════════════════════════════════════════════════════════
    function loadWhyChooseUs() {
        const content = JSON.parse(localStorage.getItem('whyChooseUs') || '{}');
        
        if (content.heading) {
            const heading = document.querySelector('#why-us h2.section-title');
            if (heading) heading.textContent = content.heading;
        }
        
        if (content.subtitle) {
            const subtitle = document.querySelector('#why-us .section-subtitle');
            if (subtitle) subtitle.textContent = content.subtitle;
        }
        
        if (content.reasons && content.reasons.length > 0) {
            const reasonsContainer = document.querySelector('.why-us-grid, #why-us .features-grid');
            if (reasonsContainer) {
                reasonsContainer.innerHTML = content.reasons.map(reason => `
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-${reason.icon}"></i>
                        </div>
                        <h3>${reason.title}</h3>
                        <p>${reason.description}</p>
                    </div>
                `).join('');
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // PROCESS STEPS
    // ═══════════════════════════════════════════════════════════
    function loadProcessSteps() {
        const content = JSON.parse(localStorage.getItem('processSteps') || '{}');
        
        if (content.heading) {
            const heading = document.querySelector('.process h2.section-title');
            if (heading) heading.textContent = content.heading;
        }
        
        if (content.subtitle) {
            const subtitle = document.querySelector('.process .section-subtitle');
            if (subtitle) subtitle.textContent = content.subtitle;
        }
        
        if (content.steps && content.steps.length > 0) {
            const stepsContainer = document.querySelector('.process-timeline, .process-steps');
            if (stepsContainer) {
                stepsContainer.innerHTML = content.steps.map((step, index) => `
                    <div class="process-step">
                        <div class="step-number">${index + 1}</div>
                        <h4>${step.title}</h4>
                        <p>${step.description}</p>
                    </div>
                `).join('');
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // INDUSTRIES
    // ═══════════════════════════════════════════════════════════
    function loadIndustries() {
        const content = JSON.parse(localStorage.getItem('industries') || '{}');
        
        if (content.heading) {
            const heading = document.querySelector('#industries h2.section-title');
            if (heading) heading.textContent = content.heading;
        }
        
        if (content.subtitle) {
            const subtitle = document.querySelector('#industries .section-subtitle');
            if (subtitle) subtitle.textContent = content.subtitle;
        }
        
        if (content.list && content.list.length > 0) {
            const industriesContainer = document.querySelector('.industries-grid');
            if (industriesContainer) {
                industriesContainer.innerHTML = content.list.map(industry => `
                    <div class="industry-card">
                        <div class="industry-icon">
                            <i class="fas fa-${industry.icon}"></i>
                        </div>
                        <h3>${industry.name}</h3>
                        <p>${industry.description}</p>
                    </div>
                `).join('');
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // FAQ
    // ═══════════════════════════════════════════════════════════
    function loadFAQ() {
        const content = JSON.parse(localStorage.getItem('faqContent') || '{}');
        
        if (content.heading) {
            const heading = document.querySelector('.faq h2.section-title');
            if (heading) heading.textContent = content.heading;
        }
        
        if (content.subtitle) {
            const subtitle = document.querySelector('.faq .section-subtitle');
            if (subtitle) subtitle.textContent = content.subtitle;
        }
        
        if (content.questions && content.questions.length > 0) {
            const faqContainer = document.querySelector('.faq-container');
            if (faqContainer) {
                faqContainer.innerHTML = content.questions.map(faq => `
                    <div class="faq-item">
                        <div class="faq-question">
                            <h4>${faq.question}</h4>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                `).join('');
                
                // Re-attach click handlers for new FAQ items
                initFAQHandlers();
            }
        }
    }

    function initFAQHandlers() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const item = this.parentElement;
                const wasActive = item.classList.contains('active');
                
                // Close all items
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ═══════════════════════════════════════════════════════════
    // CONTACT INFO & "LET'S START A CONVERSATION"
    // ═══════════════════════════════════════════════════════════
    function loadContactInfo() {
        const headerFooter = JSON.parse(localStorage.getItem('websiteHeaderFooter') || '{}');
        const content = JSON.parse(localStorage.getItem('websiteContent') || '{}');
        
        // Update "Let's Start a Conversation" heading
        if (content.conversationHeading) {
            const conversationHeading = document.querySelector('.contact-info h3');
            if (conversationHeading) conversationHeading.textContent = content.conversationHeading;
        }
        
        // Update conversation description
        if (content.conversationDesc) {
            const conversationDesc = document.querySelector('.contact-info > p');
            if (conversationDesc) conversationDesc.textContent = content.conversationDesc;
        }
        
        // Update phone
        if (headerFooter.contactPhone) {
            document.querySelectorAll('.contact-item p, .footer-contact p').forEach(el => {
                if (el.textContent.includes('1300') || el.textContent.includes('(0')) {
                    el.textContent = headerFooter.contactPhone;
                }
            });
        }
        
        // Update email
        if (headerFooter.contactEmail) {
            document.querySelectorAll('.contact-item p, .footer-contact p, a[href^="mailto:"]').forEach(el => {
                if (el.textContent.includes('@') || el.href?.includes('mailto:')) {
                    el.textContent = headerFooter.contactEmail;
                    if (el.href) el.href = 'mailto:' + headerFooter.contactEmail;
                }
            });
        }
        
        // Update address
        if (headerFooter.contactAddress) {
            document.querySelectorAll('.contact-item p, .footer-contact p').forEach(el => {
                if (el.textContent.includes('Melbourne') || el.textContent.includes('Victoria')) {
                    el.textContent = headerFooter.contactAddress;
                }
            });
        }
        
        // Update business hours
        if (content.contactHours) {
            document.querySelectorAll('.contact-item p').forEach(el => {
                if (el.textContent.includes('Mon') || el.textContent.includes('24/7')) {
                    el.textContent = content.contactHours;
                }
            });
        }
    }

    // ═══════════════════════════════════════════════════════════
    // HEADER & FOOTER
    // ═══════════════════════════════════════════════════════════
    function loadHeaderFooter() {
        const data = JSON.parse(localStorage.getItem('websiteHeaderFooter') || '{}');
        
        if (data.companyName) {
            const companyNames = document.querySelectorAll('.logo-text, .footer-brand h3, .company-name');
            companyNames.forEach(el => el.textContent = data.companyName);
        }
        
        if (data.companyTagline) {
            const taglines = document.querySelectorAll('.tagline, .footer-brand p');
            taglines.forEach(el => el.textContent = data.companyTagline);
        }
        
        // Social media links
        if (data.socialFacebook) {
            const fbLinks = document.querySelectorAll('a[href*="facebook"]');
            fbLinks.forEach(el => el.href = data.socialFacebook);
        }
        
        if (data.socialTwitter) {
            const twLinks = document.querySelectorAll('a[href*="twitter"]');
            twLinks.forEach(el => el.href = data.socialTwitter);
        }
        
        if (data.socialLinkedIn) {
            const liLinks = document.querySelectorAll('a[href*="linkedin"]');
            liLinks.forEach(el => el.href = data.socialLinkedIn);
        }
    }
})();
