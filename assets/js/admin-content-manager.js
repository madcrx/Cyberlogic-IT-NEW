/**
 * Admin Content Manager - Complete Implementation
 * Handles all content editing with live updates and save confirmations
 * Version 2.2
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // SAVE NOTIFICATION SYSTEM
    // ═══════════════════════════════════════════════════════════

    window.showSaveConfirmation = function(message, type = 'success') {
        // Remove existing notifications
        document.querySelectorAll('.save-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `save-notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <div>
                    <div style="font-weight: 600;">${message}</div>
                    ${type === 'success' ? '<div style="font-size: 0.85em; margin-top: 3px; opacity: 0.9;">💡 Refresh your website to see changes!</div>' : ''}
                </div>
            </div>
        `;
        
        // Add styles if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .save-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #28a745;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 10000;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                    max-width: 400px;
                }
                .save-notification.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                .save-notification.error {
                    background: #dc3545;
                }
                .save-notification i {
                    font-size: 24px;
                    flex-shrink: 0;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000); // Show for 4 seconds to give time to read the refresh reminder
    };

    // ═══════════════════════════════════════════════════════════
    // FAQ MANAGEMENT - COMPLETE
    // ═══════════════════════════════════════════════════════════

    window.getDefaultFAQ = function() {
        return {
            heading: 'Frequently Asked Questions',
            subtitle: 'Common questions about our services and processes',
            questions: [
                {
                    question: 'What types of computer systems do you build?',
                    answer: 'We build a wide range of custom computer systems including high-performance workstations, gaming PCs, enterprise servers, and specialised systems for specific industry needs. Every system is custom-designed to your exact specifications using premium, brand-name components.'
                },
                {
                    question: 'How long does it take to build a custom system?',
                    answer: 'Build times vary depending on complexity and component availability, but typically range from 3-7 business days. This includes assembly, comprehensive testing, software installation, and quality control inspection. We\'ll provide you with an estimated timeline during consultation.'
                },
                {
                    question: 'Do you offer support after purchase?',
                    answer: 'Absolutely! We provide comprehensive ongoing support including troubleshooting, maintenance, upgrades, and technical advice. All our systems come with full manufacturer warranties on components, and we\'re always here to help with any questions or issues.'
                },
                {
                    question: 'Can you upgrade my existing computer system?',
                    answer: 'Yes! We offer comprehensive upgrade services for existing systems. Whether you need more RAM, a faster processor, additional storage, or graphics card upgrades, our team can assess your current system and recommend the best upgrade path for your needs and budget.'
                },
                {
                    question: 'What brands do you work with?',
                    answer: 'We work exclusively with reputable, brand-name manufacturers to ensure quality and reliability. This includes leading brands like Intel, AMD, ASUS, MSI, Corsair, Samsung, Western Digital, and many others. We only use factory-new components backed by manufacturer warranties.'
                },
                {
                    question: 'Do you serve businesses of all sizes?',
                    answer: 'Yes! Cyberlogic IT proudly serves businesses of all sizes, from small startups to large enterprises. We tailor our solutions to match your specific needs, budget, and growth plans, ensuring you get the right technology at the right price point.'
                }
            ]
        };
    };

    window.loadFAQContent = function() {
        const faq = JSON.parse(localStorage.getItem('faqContent') || JSON.stringify(getDefaultFAQ()));
        
        if (document.getElementById('faqHeading')) {
            document.getElementById('faqHeading').value = faq.heading || '';
        }
        if (document.getElementById('faqSubtitle')) {
            document.getElementById('faqSubtitle').value = faq.subtitle || '';
        }
        
        renderFAQList(faq.questions);
    };

    function renderFAQList(questions) {
        const container = document.getElementById('faqList');
        if (!container) return;
        
        container.innerHTML = questions.map((faq, index) => `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: var(--primary);">
                        <i class="fas fa-question-circle"></i> FAQ ${index + 1}
                    </h4>
                    <button class="btn" onclick="deleteFAQ(${index})" style="background: var(--danger); padding: 8px 15px;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Question:</label>
                    <input type="text" id="faqQuestion${index}" value="${faq.question}" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Answer:</label>
                    <textarea id="faqAnswer${index}" rows="4" 
                              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">${faq.answer}</textarea>
                </div>
                
                <button class="btn btn-primary" onclick="saveFAQ(${index})" style="width: 100%;">
                    <i class="fas fa-save"></i> Save This FAQ
                </button>
            </div>
        `).join('');
    }

    window.saveFAQ = function(index) {
        const faq = JSON.parse(localStorage.getItem('faqContent') || JSON.stringify(getDefaultFAQ()));
        
        faq.questions[index] = {
            question: document.getElementById(`faqQuestion${index}`).value,
            answer: document.getElementById(`faqAnswer${index}`).value
        };
        
        localStorage.setItem('faqContent', JSON.stringify(faq));
        showSaveConfirmation('✓ FAQ item saved successfully!');
    };

    window.saveFAQHeader = function() {
        const faq = JSON.parse(localStorage.getItem('faqContent') || JSON.stringify(getDefaultFAQ()));
        
        faq.heading = document.getElementById('faqHeading').value;
        faq.subtitle = document.getElementById('faqSubtitle').value;
        
        localStorage.setItem('faqContent', JSON.stringify(faq));
        showSaveConfirmation('✓ FAQ header saved successfully!');
    };

    window.addNewFAQ = function() {
        const faq = JSON.parse(localStorage.getItem('faqContent') || JSON.stringify(getDefaultFAQ()));
        
        faq.questions.push({
            question: 'New Question',
            answer: 'Enter your answer here'
        });
        
        localStorage.setItem('faqContent', JSON.stringify(faq));
        loadFAQContent();
        showSaveConfirmation('✓ New FAQ added!');
    };

    window.deleteFAQ = function(index) {
        if (!confirm('Are you sure you want to delete this FAQ item?')) return;
        
        const faq = JSON.parse(localStorage.getItem('faqContent') || JSON.stringify(getDefaultFAQ()));
        faq.questions.splice(index, 1);
        localStorage.setItem('faqContent', JSON.stringify(faq));
        loadFAQContent();
        showSaveConfirmation('✓ FAQ deleted successfully!');
    };

    // ═══════════════════════════════════════════════════════════
    // PROCESS STEPS MANAGEMENT - COMPLETE
    // ═══════════════════════════════════════════════════════════

    window.getDefaultProcess = function() {
        return {
            heading: 'How We Work',
            subtitle: 'A proven approach to delivering exceptional results',
            steps: [
                {
                    title: 'Consultation',
                    description: 'We begin by understanding your needs, goals, and technical requirements through detailed consultation.'
                },
                {
                    title: 'Custom Design',
                    description: 'Our experts design a tailored solution using premium components that match your specifications perfectly.'
                },
                {
                    title: 'Assembly & Testing',
                    description: 'Systems are assembled with care and undergo comprehensive hardware functionality and compatibility testing.'
                },
                {
                    title: 'Software Installation',
                    description: 'We install your selected operating system and software applications, optimising performance.'
                },
                {
                    title: 'Quality Control',
                    description: 'Every system undergoes rigorous quality control inspection to ensure it meets our high standards.'
                },
                {
                    title: 'Delivery & Support',
                    description: 'We deliver your system, provide setup assistance, and offer ongoing support and training.'
                }
            ]
        };
    };

    window.loadProcessSteps = function() {
        const process = JSON.parse(localStorage.getItem('processSteps') || JSON.stringify(getDefaultProcess()));
        
        if (document.getElementById('processHeading')) {
            document.getElementById('processHeading').value = process.heading || '';
        }
        if (document.getElementById('processSubtitle')) {
            document.getElementById('processSubtitle').value = process.subtitle || '';
        }
        
        renderProcessSteps(process.steps);
    };

    function renderProcessSteps(steps) {
        const container = document.getElementById('processStepsList');
        if (!container) return;
        
        container.innerHTML = steps.map((step, index) => `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid var(--primary);">
                <h4 style="margin: 0 0 15px 0; color: var(--primary);">
                    <i class="fas fa-list-ol"></i> Step ${index + 1}
                </h4>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Step Title:</label>
                    <input type="text" id="processTitle${index}" value="${step.title}" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Description:</label>
                    <textarea id="processDesc${index}" rows="3" 
                              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">${step.description}</textarea>
                </div>
                
                <button class="btn btn-primary" onclick="saveProcessStep(${index})" style="width: 100%;">
                    <i class="fas fa-save"></i> Save This Step
                </button>
            </div>
        `).join('');
    }

    window.saveProcessStep = function(index) {
        const process = JSON.parse(localStorage.getItem('processSteps') || JSON.stringify(getDefaultProcess()));
        
        process.steps[index] = {
            title: document.getElementById(`processTitle${index}`).value,
            description: document.getElementById(`processDesc${index}`).value
        };
        
        localStorage.setItem('processSteps', JSON.stringify(process));
        showSaveConfirmation('✓ Process step saved successfully!');
    };

    window.saveProcessHeader = function() {
        const process = JSON.parse(localStorage.getItem('processSteps') || JSON.stringify(getDefaultProcess()));
        
        process.heading = document.getElementById('processHeading').value;
        process.subtitle = document.getElementById('processSubtitle').value;
        
        localStorage.setItem('processSteps', JSON.stringify(process));
        showSaveConfirmation('✓ Process header saved successfully!');
    };

    // ═══════════════════════════════════════════════════════════
    // WHY CHOOSE US MANAGEMENT - COMPLETE
    // ═══════════════════════════════════════════════════════════

    window.getDefaultWhyChoose = function() {
        return {
            heading: 'Why Melbourne Businesses Choose Cyberlogic IT',
            subtitle: 'Excellence in every aspect of IT service delivery',
            reasons: [
                {
                    icon: 'comments',
                    title: 'Expert Consultation',
                    description: 'Free consultation, transparent pricing, and no hidden costs for complete peace of mind.'
                },
                {
                    icon: 'award',
                    title: 'Premium Components',
                    description: 'Only brand-name parts with full manufacturer warranties for guaranteed quality.'
                },
                {
                    icon: 'cogs',
                    title: 'Custom Solutions',
                    description: 'Every system tailored to your exact specifications and requirements.'
                },
                {
                    icon: 'check-circle',
                    title: 'Quality Assurance',
                    description: 'Rigorous testing and quality control processes ensure every system meets our high standards before delivery.'
                },
                {
                    icon: 'headset',
                    title: 'Ongoing Support',
                    description: 'Comprehensive support including troubleshooting, maintenance, upgrades, and technical advice.'
                },
                {
                    icon: 'map-marker-alt',
                    title: 'Local Melbourne Service',
                    description: 'Based in Melbourne, proudly serving businesses across Victoria with local expertise.'
                }
            ]
        };
    };

    window.loadWhyChooseUs = function() {
        const why = JSON.parse(localStorage.getItem('whyChooseUs') || JSON.stringify(getDefaultWhyChoose()));
        
        if (document.getElementById('whyHeading')) {
            document.getElementById('whyHeading').value = why.heading || '';
        }
        if (document.getElementById('whySubtitle')) {
            document.getElementById('whySubtitle').value = why.subtitle || '';
        }
        
        renderWhyChooseReasons(why.reasons);
    };

    function renderWhyChooseReasons(reasons) {
        const container = document.getElementById('whyChooseList');
        if (!container) return;
        
        container.innerHTML = reasons.map((reason, index) => `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid var(--primary);">
                <h4 style="margin: 0 0 15px 0; color: var(--primary);">
                    <i class="fas fa-star"></i> Reason ${index + 1}
                </h4>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Icon (Font Awesome name):</label>
                    <input type="text" id="whyIcon${index}" value="${reason.icon}" 
                           placeholder="e.g., comments, award, cogs"
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Title:</label>
                    <input type="text" id="whyTitle${index}" value="${reason.title}" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Description:</label>
                    <textarea id="whyDesc${index}" rows="3" 
                              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">${reason.description}</textarea>
                </div>
                
                <button class="btn btn-primary" onclick="saveWhyChooseReason(${index})" style="width: 100%;">
                    <i class="fas fa-save"></i> Save This Reason
                </button>
            </div>
        `).join('');
    }

    window.saveWhyChooseReason = function(index) {
        const why = JSON.parse(localStorage.getItem('whyChooseUs') || JSON.stringify(getDefaultWhyChoose()));
        
        why.reasons[index] = {
            icon: document.getElementById(`whyIcon${index}`).value,
            title: document.getElementById(`whyTitle${index}`).value,
            description: document.getElementById(`whyDesc${index}`).value
        };
        
        localStorage.setItem('whyChooseUs', JSON.stringify(why));
        showSaveConfirmation('✓ Reason saved successfully!');
    };

    window.saveWhyChooseHeader = function() {
        const why = JSON.parse(localStorage.getItem('whyChooseUs') || JSON.stringify(getDefaultWhyChoose()));
        
        why.heading = document.getElementById('whyHeading').value;
        why.subtitle = document.getElementById('whySubtitle').value;
        
        localStorage.setItem('whyChooseUs', JSON.stringify(why));
        showSaveConfirmation('✓ Why Choose Us header saved successfully!');
    };

    window.addNewWhyChoose = function() {
        const why = JSON.parse(localStorage.getItem('whyChooseUs') || JSON.stringify(getDefaultWhyChoose()));
        
        why.reasons.push({
            icon: 'star',
            title: 'New Reason',
            description: 'Enter description here'
        });
        
        localStorage.setItem('whyChooseUs', JSON.stringify(why));
        loadWhyChooseUs();
        showSaveConfirmation('✓ New reason added!');
    };

    window.deleteWhyChoose = function(index) {
        if (!confirm('Are you sure you want to delete this reason?')) return;
        
        const why = JSON.parse(localStorage.getItem('whyChooseUs') || JSON.stringify(getDefaultWhyChoose()));
        why.reasons.splice(index, 1);
        localStorage.setItem('whyChooseUs', JSON.stringify(why));
        loadWhyChooseUs();
        showSaveConfirmation('✓ Reason deleted!');
    };

    // ═══════════════════════════════════════════════════════════
    // INDUSTRIES MANAGEMENT - COMPLETE
    // ═══════════════════════════════════════════════════════════

    window.getDefaultIndustries = function() {
        return {
            heading: 'Trusted Across Multiple Industries',
            subtitle: 'Tailored IT solutions for diverse business sectors',
            list: [
                { icon: 'heartbeat', name: 'Healthcare & Medical', description: 'HIPAA-compliant IT infrastructure and electronic health records systems' },
                { icon: 'chart-line', name: 'Financial Services', description: 'Secure banking systems, trading platforms, and financial software' },
                { icon: 'graduation-cap', name: 'Education', description: 'Learning management systems, student information systems, and campus IT' },
                { icon: 'industry', name: 'Manufacturing', description: 'ERP systems, supply chain management, and industrial automation' },
                { icon: 'shopping-cart', name: 'Retail & E-commerce', description: 'POS systems, inventory management, and online store platforms' },
                { icon: 'briefcase', name: 'Professional Services', description: 'Practice management, CRM systems, and client portals' },
                { icon: 'landmark', name: 'Government & Public Sector', description: 'Secure government systems, public service platforms, and citizen services' },
                { icon: 'paint-brush', name: 'Creative & Media', description: 'High-performance workstations for design, video editing, and content creation' }
            ]
        };
    };

    window.loadIndustries = function() {
        const industries = JSON.parse(localStorage.getItem('industries') || JSON.stringify(getDefaultIndustries()));
        
        if (document.getElementById('industriesHeading')) {
            document.getElementById('industriesHeading').value = industries.heading || '';
        }
        if (document.getElementById('industriesSubtitle')) {
            document.getElementById('industriesSubtitle').value = industries.subtitle || '';
        }
        
        renderIndustriesList(industries.list);
    };

    function renderIndustriesList(list) {
        const container = document.getElementById('industriesList');
        if (!container) return;
        
        container.innerHTML = list.map((industry, index) => `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: var(--primary);">
                        <i class="fas fa-industry"></i> Industry ${index + 1}
                    </h4>
                    <button class="btn" onclick="deleteIndustry(${index})" style="background: var(--danger); padding: 8px 15px;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Icon (Font Awesome):</label>
                    <input type="text" id="industryIcon${index}" value="${industry.icon}" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Industry Name:</label>
                    <input type="text" id="industryName${index}" value="${industry.name}" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Description:</label>
                    <textarea id="industryDesc${index}" rows="2" 
                              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">${industry.description}</textarea>
                </div>
                
                <button class="btn btn-primary" onclick="saveIndustry(${index})" style="width: 100%;">
                    <i class="fas fa-save"></i> Save This Industry
                </button>
            </div>
        `).join('');
    }

    window.saveIndustry = function(index) {
        const industries = JSON.parse(localStorage.getItem('industries') || JSON.stringify(getDefaultIndustries()));
        
        industries.list[index] = {
            icon: document.getElementById(`industryIcon${index}`).value,
            name: document.getElementById(`industryName${index}`).value,
            description: document.getElementById(`industryDesc${index}`).value
        };
        
        localStorage.setItem('industries', JSON.stringify(industries));
        showSaveConfirmation('✓ Industry saved successfully!');
    };

    window.saveIndustriesHeader = function() {
        const industries = JSON.parse(localStorage.getItem('industries') || JSON.stringify(getDefaultIndustries()));
        
        industries.heading = document.getElementById('industriesHeading').value;
        industries.subtitle = document.getElementById('industriesSubtitle').value;
        
        localStorage.setItem('industries', JSON.stringify(industries));
        showSaveConfirmation('✓ Industries header saved successfully!');
    };

    window.addNewIndustry = function() {
        const industries = JSON.parse(localStorage.getItem('industries') || JSON.stringify(getDefaultIndustries()));
        
        industries.list.push({
            icon: 'building',
            name: 'New Industry',
            description: 'Enter description here'
        });
        
        localStorage.setItem('industries', JSON.stringify(industries));
        loadIndustries();
        showSaveConfirmation('✓ New industry added!');
    };

    window.deleteIndustry = function(index) {
        if (!confirm('Are you sure you want to delete this industry?')) return;
        
        const industries = JSON.parse(localStorage.getItem('industries') || JSON.stringify(getDefaultIndustries()));
        industries.list.splice(index, 1);
        localStorage.setItem('industries', JSON.stringify(industries));
        loadIndustries();
        showSaveConfirmation('✓ Industry deleted!');
    };

    // ═══════════════════════════════════════════════════════════
    // ABOUT US MANAGEMENT - COMPLETE
    // ═══════════════════════════════════════════════════════════

    window.getDefaultAbout = function() {
        return {
            tag: 'About Us',
            title: 'Melbourne\'s Premier IT Consulting & Custom Computer Specialists',
            subtitle: 'Delivering expert IT solutions, managed services, and custom-built computer systems across Victoria since 2010',
            heading: 'Your Trusted IT Partner in Melbourne',
            paragraph1: 'Cyberlogic IT is Melbourne\'s leading provider of professional IT consulting services, custom-built computer systems, and managed IT support. We specialise in delivering enterprise-grade technology solutions for small to medium businesses across Victoria, from custom gaming PCs and workstations to complete network infrastructure and cybersecurity implementations.',
            paragraph2: 'Our team of certified IT professionals and system builders provides comprehensive IT services including cloud migration, data backup solutions, network security, server configuration, and 24/7 technical support. Every custom computer system is assembled using premium brand-name components with full manufacturer warranties, ensuring maximum reliability and performance for your business operations.'
        };
    };

    window.loadAboutUsContent = function() {
        const about = JSON.parse(localStorage.getItem('aboutContent') || JSON.stringify(getDefaultAbout()));
        
        if (document.getElementById('aboutTag')) document.getElementById('aboutTag').value = about.tag || '';
        if (document.getElementById('aboutTitle')) document.getElementById('aboutTitle').value = about.title || '';
        if (document.getElementById('aboutSubtitle')) document.getElementById('aboutSubtitle').value = about.subtitle || '';
        if (document.getElementById('aboutHeading')) document.getElementById('aboutHeading').value = about.heading || '';
        if (document.getElementById('aboutPara1')) document.getElementById('aboutPara1').value = about.paragraph1 || '';
        if (document.getElementById('aboutPara2')) document.getElementById('aboutPara2').value = about.paragraph2 || '';
    };

    window.saveAboutContent = function() {
        const about = {
            tag: document.getElementById('aboutTag').value,
            title: document.getElementById('aboutTitle').value,
            subtitle: document.getElementById('aboutSubtitle').value,
            heading: document.getElementById('aboutHeading').value,
            paragraph1: document.getElementById('aboutPara1').value,
            paragraph2: document.getElementById('aboutPara2').value
        };
        
        localStorage.setItem('aboutContent', JSON.stringify(about));
        showSaveConfirmation('✓ About Us content saved successfully!');
    };

    // Initialize when page loads
    console.log('Admin Content Manager v2.2 loaded successfully');
})();
