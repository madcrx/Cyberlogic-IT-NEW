/**
 * Cyberlogic IT - WebP Image Optimizer
 * Automatically serves WebP images with fallbacks
 */

(function() {
    'use strict';
    
    // Check WebP support
    function checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = function() {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    // Image optimization class
    class ImageOptimizer {
        constructor() {
            this.supportsWebP = false;
            this.init();
        }
        
        async init() {
            this.supportsWebP = await checkWebPSupport();
            console.log(`WebP Support: ${this.supportsWebP ? 'Yes' : 'No'}`);
            
            // Process all images on page
            this.processImages();
            
            // Watch for dynamically added images
            this.observeNewImages();
        }
        
        processImages() {
            const images = document.querySelectorAll('img[data-src], img[src]');
            images.forEach(img => this.optimizeImage(img));
        }
        
        optimizeImage(img) {
            // Skip if already processed
            if (img.dataset.optimized === 'true') return;
            
            const src = img.dataset.src || img.src;
            if (!src || src.startsWith('data:')) return;
            
            // Create source set with WebP
            if (this.supportsWebP) {
                const webpSrc = this.getWebPVersion(src);
                
                // Use picture element for better browser support
                if (!img.parentElement || img.parentElement.tagName !== 'PICTURE') {
                    this.wrapInPicture(img, webpSrc, src);
                }
            }
            
            // Implement lazy loading
            this.addLazyLoading(img);
            
            // Mark as optimized
            img.dataset.optimized = 'true';
        }
        
        getWebPVersion(src) {
            // Convert image path to WebP version
            const ext = src.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                return src.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
            }
            return src;
        }
        
        wrapInPicture(img, webpSrc, fallbackSrc) {
            const picture = document.createElement('picture');
            
            // WebP source
            const webpSource = document.createElement('source');
            webpSource.srcset = webpSrc;
            webpSource.type = 'image/webp';
            
            // Fallback source
            const fallbackSource = document.createElement('source');
            fallbackSource.srcset = fallbackSrc;
            
            // Clone img to preserve attributes
            const newImg = img.cloneNode(true);
            newImg.src = fallbackSrc;
            
            // Build picture element
            picture.appendChild(webpSource);
            picture.appendChild(fallbackSource);
            picture.appendChild(newImg);
            
            // Replace original img
            if (img.parentNode) {
                img.parentNode.replaceChild(picture, img);
            }
        }
        
        addLazyLoading(img) {
            // Native lazy loading
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            } else {
                // Fallback: Intersection Observer
                this.lazyLoadWithObserver(img);
            }
        }
        
        lazyLoadWithObserver(img) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImg = entry.target;
                        if (lazyImg.dataset.src) {
                            lazyImg.src = lazyImg.dataset.src;
                            lazyImg.removeAttribute('data-src');
                        }
                        observer.unobserve(lazyImg);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            observer.observe(img);
        }
        
        observeNewImages() {
            // Watch for dynamically added images
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.tagName === 'IMG') {
                            this.optimizeImage(node);
                        } else if (node.querySelectorAll) {
                            node.querySelectorAll('img').forEach(img => {
                                this.optimizeImage(img);
                            });
                        }
                    });
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ImageOptimizer();
        });
    } else {
        new ImageOptimizer();
    }
})();

// Image placeholder generator (for development)
function generateImagePlaceholder(width, height, text = '') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#E89523');
    gradient.addColorStop(1, '#F2A843');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Text
    if (text) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
    }
    
    return canvas.toDataURL();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateImagePlaceholder };
}
