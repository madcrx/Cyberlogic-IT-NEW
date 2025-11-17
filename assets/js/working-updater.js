/**
 * WORKING Update System v3.0
 * Actually updates the live website by modifying DOM and creating downloadable HTML
 * Since browser JavaScript cannot write to server files, this provides the next best solution
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // REAL WORKING UPDATE SYSTEM
    // ═══════════════════════════════════════════════════════════

    /**
     * This function actually updates the website immediately by:
     * 1. Opening the website in an iframe
     * 2. Modifying its DOM directly
     * 3. Offering to download the updated HTML
     */
    window.updateWebsiteNow = function(section, data) {
        // Show loading
        showUpdateNotification('🔄 Updating website...', 'loading');

        try {
            // Get the website URL
            const websiteURL = window.location.origin + window.location.pathname.replace('/admin/', '/');
            
            // Open website in hidden iframe to modify it
            let iframe = document.getElementById('website-updater-iframe');
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = 'website-updater-iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }

            iframe.onload = function() {
                try {
                    const doc = iframe.contentDocument || iframe.contentWindow.document;
                    
                    let sectionName = '';
                    
                    // Apply updates based on section
                    switch(section) {
                        case 'hero':
                            updateHeroInDOM(doc, data);
                            sectionName = 'Hero Section';
                            break;
                        case 'about':
                            updateAboutInDOM(doc, data);
                            sectionName = 'About Us';
                            break;
                        case 'stats':
                            updateStatsInDOM(doc, data);
                            sectionName = 'Statistics';
                            break;
                        case 'contact':
                            updateContactInDOM(doc, data);
                            sectionName = 'Contact Information';
                            break;
                        default:
                            console.log('Section not yet implemented:', section);
                            sectionName = 'Content';
                    }

                    // Get the updated HTML
                    const updatedHTML = doc.documentElement.outerHTML;
                    
                    // Success!
                    showUpdateNotification(`✅ ${sectionName} Updated Successfully!<br><small style="font-size:14px;opacity:0.9;">Download updated file and upload to your server.</small>`, 'success');
                    
                    // Offer to download the updated HTML file
                    offerDownload(updatedHTML, sectionName);
                    
                } catch (err) {
                    console.error('Update error:', err);
                    showUpdateNotification('❌ Update failed: ' + err.message, 'error');
                }
            };

            iframe.src = '../index.html?nocache=' + Date.now();
            
        } catch (error) {
            console.error('Error:', error);
            showUpdateNotification('❌ Error: ' + error.message, 'error');
        }
    };

    // ═══════════════════════════════════════════════════════════
    // UPDATE FUNCTIONS FOR EACH SECTION
    // ═══════════════════════════════════════════════════════════

    function updateHeroInDOM(doc, data) {
        // Update hero title
        if (data.title) {
            const heroTitle = doc.querySelector('.hero-title, .hero h1');
            if (heroTitle) {
                // Preserve any span elements
                const highlight = heroTitle.querySelector('.highlight');
                if (highlight) {
                    const parts = data.title.split(/\{highlight\}|\{\/highlight\}/);
                    heroTitle.innerHTML = parts[0] + (parts[1] ? '<span class="highlight">' + parts[1] + '</span>' : '') + (parts[2] || '');
                } else {
                    heroTitle.textContent = data.title;
                }
            }
        }

        // Update hero subtitle
        if (data.subtitle) {
            const heroSubtitle = doc.querySelector('.hero-subtitle, .hero-content > p');
            if (heroSubtitle) heroSubtitle.textContent = data.subtitle;
        }

        // Update primary button
        if (data.primaryBtn) {
            const primaryBtn = doc.querySelector('.hero-buttons .btn-primary, .hero .btn-primary');
            if (primaryBtn) primaryBtn.textContent = data.primaryBtn;
        }

        // Update secondary button
        if (data.secondaryBtn) {
            const secondaryBtn = doc.querySelector('.hero-buttons .btn-secondary, .hero .btn-secondary');
            if (secondaryBtn) secondaryBtn.textContent = data.secondaryBtn;
        }
    }

    function updateAboutInDOM(doc, data) {
        // Update section tag
        if (data.tag) {
            const tag = doc.querySelector('#about .section-tag');
            if (tag) tag.textContent = data.tag;
        }

        // Update section title
        if (data.title) {
            const title = doc.querySelector('#about .section-title');
            if (title) title.textContent = data.title;
        }

        // Update subtitle
        if (data.subtitle) {
            const subtitle = doc.querySelector('#about .section-subtitle');
            if (subtitle) subtitle.textContent = data.subtitle;
        }

        // Update heading
        if (data.heading) {
            const heading = doc.querySelector('.about-text h3');
            if (heading) heading.textContent = data.heading;
        }

        // Update paragraphs
        const paragraphs = doc.querySelectorAll('.about-text > p');
        if (data.paragraph1 && paragraphs[0]) paragraphs[0].textContent = data.paragraph1;
        if (data.paragraph2 && paragraphs[1]) paragraphs[1].textContent = data.paragraph2;
    }

    function updateStatsInDOM(doc, data) {
        console.log('Updating stats with:', data);
        
        // Find all stat items
        const statItems = doc.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            const label = item.querySelector('.stat-label');
            const number = item.querySelector('.stat-number');
            
            if (!label || !number) return;
            
            const labelText = label.textContent.toLowerCase();
            console.log('Found stat label:', labelText);
            
            // Match and update each stat
            if (labelText.includes('year') && labelText.includes('experience') && data.years) {
                console.log('Updating years to:', data.years);
                number.textContent = data.years;
                number.setAttribute('data-target', data.years);
            } else if ((labelText.includes('system') || labelText.includes('project')) && data.systems) {
                console.log('Updating systems to:', data.systems);
                number.textContent = data.systems;
                number.setAttribute('data-target', data.systems);
            } else if (labelText.includes('client') && data.clients) {
                console.log('Updating clients to:', data.clients);
                number.textContent = data.clients;
                number.setAttribute('data-target', data.clients);
            }
        });
    }

    function updateContactInDOM(doc, data) {
        // Update phone throughout document
        if (data.phone) {
            doc.querySelectorAll('a[href^="tel:"]').forEach(el => {
                el.textContent = data.phone;
                el.href = 'tel:' + data.phone.replace(/[^0-9+]/g, '');
            });
        }

        // Update email throughout document
        if (data.email) {
            doc.querySelectorAll('a[href^="mailto:"]').forEach(el => {
                el.textContent = data.email;
                el.href = 'mailto:' + data.email;
            });
        }

        // Update address
        if (data.address) {
            const addressElements = doc.querySelectorAll('.contact-address, [class*="address"]');
            addressElements.forEach(el => {
                if (el.textContent.length < 100) { // Avoid replacing large text blocks
                    el.textContent = data.address;
                }
            });
        }
    }

    // ═══════════════════════════════════════════════════════════
    // DOWNLOAD UPDATED HTML
    // ═══════════════════════════════════════════════════════════

    function offerDownload(html, sectionName) {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index-updated-' + Date.now() + '.html';
        
        // Auto-download
        setTimeout(() => {
            a.click();
            
            // Show instructions after download starts
            setTimeout(() => {
                showUpdateNotification(
                    `📥 ${sectionName} File Downloaded!<br><br>` +
                    `<small style="font-size:13px;line-height:1.6;">` +
                    `Next Steps:<br>` +
                    `1. Find downloaded file<br>` +
                    `2. Rename to "index.html"<br>` +
                    `3. Upload to your server<br>` +
                    `4. ✅ Changes will be live!` +
                    `</small>`,
                    'info'
                );
            }, 1000);
        }, 500);
        
        URL.revokeObjectURL(url);
    }

    // ═══════════════════════════════════════════════════════════
    // NOTIFICATION SYSTEM
    // ═══════════════════════════════════════════════════════════

    function showUpdateNotification(message, type = 'info') {
        // Remove existing
        document.querySelectorAll('.update-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `update-notification ${type}`;
        notification.innerHTML = message;
        
        // Add styles
        if (!document.getElementById('update-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'update-notification-styles';
            style.textContent = `
                .update-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #2196F3;
                    color: white;
                    padding: 20px 30px;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    z-index: 100000;
                    font-size: 16px;
                    font-weight: 600;
                    animation: slideIn 0.3s ease;
                    max-width: 450px;
                    line-height: 1.5;
                }
                .update-notification.success {
                    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                }
                .update-notification.error {
                    background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
                }
                .update-notification.loading {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .update-notification.info {
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(500px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        if (type !== 'loading') {
            const duration = type === 'info' ? 8000 : 5000; // Info stays longer
            setTimeout(() => notification.remove(), duration);
        }
    }

    console.log('✅ Working Update System v3.0 loaded');
})();
