// Dynamic Gallery Loader
// This script automatically loads images from a JSON configuration file
// or can be extended to fetch from a folder structure

class GalleryLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.images = [];
        this.imagePath = 'assets/images/';
        this.configPath = 'assets/gallery-config.json';
    }

    async loadFromJSON() {
        try {
            const response = await fetch(this.configPath);
            if (!response.ok) throw new Error('Gallery config not found');
            const config = await response.json();
            this.images = config.images || [];
            this.render();
        } catch (error) {
            console.log('Gallery config missing or invalid; showing empty state');
            this.images = [];
            this.render();
        }
    }

    // Removed fallback to avoid showing placeholder or ghost images

    render() {
        if (!this.container) return;

        if (this.images.length === 0) {
            this.showEmptyState();
            return;
        }

        this.container.innerHTML = '';
        this.container.classList.remove('hidden');

        this.images.forEach((image, index) => {
            const galleryItem = this.createGalleryItem(image, index);
            this.container.appendChild(galleryItem);
        });

        // Add lightbox functionality
        this.initializeLightbox();
    }

    createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300';
        item.style.animationDelay = `${index * 0.05}s`;
        
        item.innerHTML = `
            <div class="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                <img 
                    src="${image.src}" 
                    alt="${image.alt || image.title}" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    data-image-src="${image.src}"
                    onerror="this.onerror=null; const errorDiv = document.createElement('div'); errorDiv.className='w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'; errorDiv.innerHTML=\\'<div class=\\\\'text-center p-4\\\\'><div class=\\\\'text-4xl mb-2\\\\'>⚠️</div><p class=\\\\'text-sm text-gray-600 dark:text-gray-400\\\\'>Image not found</p></div>\\'; this.parentElement.replaceChild(errorDiv, this);"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 class="font-bold text-lg mb-1">${image.title || image.alt}</h4>
                    ${image.category ? `<span class="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">${image.category}</span>` : ''}
                </div>
            </div>
        `;

        item.addEventListener('click', () => this.openLightbox(image, index));
        return item;
    }

    showEmptyState() {
        // Show minimal empty state without ghost placeholders
        this.container.innerHTML = `
            <div class="empty-state col-span-full text-center py-12">
                <div class="empty-state-icon mb-2">📸</div>
                <h3 class="empty-state-title">Gallery Coming Soon</h3>
                <p class="empty-state-text">We're working on adding photos from classes, workshops, and student projects.</p>
            </div>
        `;
    }

    initializeLightbox() {
        // Lightbox will be initialized when images are clicked
    }

    openLightbox(image, index) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-labelledby', 'lightbox-title');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.innerHTML = `
            <div class="relative max-w-4xl w-full">
                <button class="close-btn absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-white/10" id="closeLightbox" aria-label="Close image preview">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2">
                    <img 
                        src="${image.src}" 
                        alt="${image.alt}" 
                        id="lightbox-image"
                        class="max-h-[90vh] w-auto mx-auto rounded-lg shadow-2xl"
                        onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\'%3E%3Crect fill=\\'%23ef4444\\' width=\\'400\\' height=\\'400\\'/%3E%3Ctext fill=\\'white\\' x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\' font-size=\\'16\\'%3EImage not found%3C/text%3E%3C/svg%3E';"
                    >
                </div>
                <div class="text-white text-center mt-4">
                    <h3 class="text-2xl font-bold mb-2" id="lightbox-title">${image.title || image.alt}</h3>
                    ${image.description ? `<p class="text-gray-300">${image.description}</p>` : ''}
                </div>
            </div>
        `;
        
        // Show loading state
        const img = lightbox.querySelector('#lightbox-image');
        if (img) {
            img.style.opacity = '0';
            img.onload = () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            };
        }
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Focus close button for keyboard navigation
        const closeBtn = lightbox.querySelector('#closeLightbox');
        setTimeout(() => closeBtn.focus(), 100);
        
        const closeLightbox = () => {
            if (lightbox.parentNode) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        
        document.addEventListener('keydown', escapeHandler);
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const galleryLoader = new GalleryLoader('gallery-container');
    galleryLoader.loadFromJSON();
    // Expose for other scripts (e.g., upload UI) to add images dynamically
    window.galleryLoader = galleryLoader;
});

