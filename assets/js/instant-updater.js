/**
 * Instant Content Updater
 * Updates the live website HTML files immediately when "Update Now" is clicked
 * Version 2.4
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // UPDATE NOW FUNCTION - INSTANT WEBSITE UPDATES
    // ═══════════════════════════════════════════════════════════

    window.updateNow = async function(section) {
        // Show loading state
        showUpdateStatus('Updating website...', 'loading');
        
        let content = {};
        let sectionName = '';
        
        try {
            switch(section) {
                case 'hero':
                    content = {
                        title: document.getElementById('contentHeroHeading')?.value || '',
                        subtitle: document.getElementById('contentHeroSubheading')?.value || '',
                        primaryBtn: document.getElementById('contentHeroPrimaryBtn')?.value || '',
                        primaryLink: document.getElementById('contentHeroPrimaryLink')?.value || '',
                        secondaryBtn: document.getElementById('contentHeroSecondaryBtn')?.value || '',
                        secondaryLink: document.getElementById('contentHeroSecondaryLink')?.value || ''
                    };
                    sectionName = 'Hero Section';
                    break;
                    
                case 'about':
                    content = {
                        tag: document.getElementById('aboutTag')?.value || '',
                        title: document.getElementById('aboutTitle')?.value || '',
                        subtitle: document.getElementById('aboutSubtitle')?.value || '',
                        heading: document.getElementById('aboutHeading')?.value || '',
                        paragraph1: document.getElementById('aboutPara1')?.value || '',
                        paragraph2: document.getElementById('aboutPara2')?.value || ''
                    };
                    sectionName = 'About Us';
                    break;
                    
                case 'stats':
                    content = {
                        years: document.getElementById('statYears')?.value || '15',
                        systems: document.getElementById('statSystems')?.value || '1000',
                        clients: document.getElementById('statClients')?.value || '500'
                    };
                    sectionName = 'Statistics';
                    break;
                    
                case 'contact':
                    content = {
                        phone: document.getElementById('contentContactPhone')?.value || '',
                        email: document.getElementById('contentContactEmail')?.value || '',
                        address: document.getElementById('contentContactAddress')?.value || ''
                    };
                    sectionName = 'Contact Information';
                    break;
                    
                default:
                    throw new Error('Unknown section');
            }
            
            // Send update request to PHP backend
            const response = await fetch('../includes/update-content.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    section: section,
                    content: content
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showUpdateStatus(`✅ ${sectionName} updated successfully! Website is live!`, 'success');
            } else {
                throw new Error(result.error || 'Update failed');
            }
            
        } catch (error) {
            console.error('Update error:', error);
            showUpdateStatus(`❌ Update failed: ${error.message}`, 'error');
        }
    };

    // ═══════════════════════════════════════════════════════════
    // UPDATE STATUS NOTIFICATION
    // ═══════════════════════════════════════════════════════════

    function showUpdateStatus(message, type = 'loading') {
        // Remove existing notifications
        document.querySelectorAll('.update-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `update-notification ${type}`;
        
        let icon = '';
        if (type === 'loading') {
            icon = '<i class="fas fa-spinner fa-spin"></i>';
        } else if (type === 'success') {
            icon = '<i class="fas fa-check-circle"></i>';
        } else if (type === 'error') {
            icon = '<i class="fas fa-exclamation-circle"></i>';
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                ${icon}
                <div>
                    <div style="font-weight: 600; font-size: 16px;">${message}</div>
                    ${type === 'success' ? '<div style="font-size: 13px; margin-top: 5px; opacity: 0.9;">Your changes are now live on the website!</div>' : ''}
                </div>
            </div>
        `;
        
        // Add styles if not already present
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
                    border-radius: 10px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 10000;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                    max-width: 450px;
                    min-width: 350px;
                }
                .update-notification.show {
                    opacity: 1;
                    transform: translateY(0);
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
                .update-notification i {
                    font-size: 28px;
                    flex-shrink: 0;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        if (type !== 'loading') {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
    }

    console.log('Instant Content Updater v2.4 loaded');
})();
