// Document Preview Handler
// Provides preview functionality for PDFs and documents before download

class DocsPreview {
    constructor() {
        this.previewModal = null;
    }

    init() {
        // Add preview buttons to downloadable files
        this.addPreviewButtons();
    }

    addPreviewButtons() {
        const downloadLinks = document.querySelectorAll('[data-document-preview]');
        downloadLinks.forEach(link => {
            const previewBtn = this.createPreviewButton(link);
            link.parentElement.insertBefore(previewBtn, link);
        });
    }

    createPreviewButton(link) {
        const btn = document.createElement('button');
        btn.className = 'inline-flex items-center gap-2 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors mr-2';
        btn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Preview
        `;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const fileUrl = link.getAttribute('data-document-preview');
            const fileName = link.textContent.trim();
            this.showPreview(fileUrl, fileName);
        });
        return btn;
    }

    showPreview(fileUrl, fileName) {
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center';
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loadingOverlay);
        
        // Create preview modal
        this.previewModal = document.createElement('div');
        this.previewModal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
        this.previewModal.setAttribute('role', 'dialog');
        this.previewModal.setAttribute('aria-labelledby', 'preview-title');
        this.previewModal.setAttribute('aria-modal', 'true');
        this.previewModal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white" id="preview-title">Preview: ${fileName}</h3>
                    <button class="close-btn text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center" id="closePreview" aria-label="Close preview">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="flex-1 overflow-auto p-4">
                    <div id="preview-content" class="flex items-center justify-center min-h-[400px]">
                        <div class="text-center">
                            <div class="loading-spinner mx-auto mb-4"></div>
                            <p class="text-gray-600 dark:text-gray-400">Loading preview...</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between p-4 border-t dark:border-gray-700 gap-4">
                    <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors" id="closeBtn">
                        Close
                    </button>
                    <a href="${fileUrl}" download class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                        Download
                    </a>
                </div>
            </div>
        `;

        document.body.appendChild(this.previewModal);
        document.body.style.overflow = 'hidden';
        
        // Remove loading overlay after a brief delay
        setTimeout(() => {
            if (loadingOverlay.parentNode) {
                document.body.removeChild(loadingOverlay);
            }
        }, 300);

        // Load preview content
        this.loadPreviewContent(fileUrl);

        // Close handlers
        const closeBtn = this.previewModal.querySelector('#closeBtn');
        const closePreview = this.previewModal.querySelector('#closePreview');
        
        const closeModal = () => {
            document.body.removeChild(this.previewModal);
            document.body.style.overflow = '';
            this.previewModal = null;
        };

        closeBtn.addEventListener('click', closeModal);
        closePreview.addEventListener('click', closeModal);
        
        this.previewModal.addEventListener('click', (e) => {
            if (e.target === this.previewModal) closeModal();
        });

        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape' && this.previewModal) {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        }.bind(this));
    }

    loadPreviewContent(fileUrl) {
        const previewContent = this.previewModal.querySelector('#preview-content');
        const extension = fileUrl.split('.').pop().toLowerCase();

        if (extension === 'pdf') {
            const iframe = document.createElement('iframe');
            iframe.src = `${fileUrl}#toolbar=0`;
            iframe.className = 'w-full h-[600px] border-0 rounded-lg';
            iframe.frameBorder = '0';
            iframe.onerror = () => {
                previewContent.innerHTML = `
                    <div class="error-state max-w-md mx-auto">
                        <div class="text-4xl mb-3">⚠️</div>
                        <h4 class="font-bold text-lg mb-2">PDF Preview Unavailable</h4>
                        <p class="text-sm mb-4">The PDF couldn't be loaded. This might be due to CORS restrictions or the file being unavailable.</p>
                        <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Open PDF in New Tab
                        </a>
                    </div>
                `;
            };
            previewContent.innerHTML = '';
            previewContent.appendChild(iframe);
            previewContent.innerHTML += `
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    If the PDF doesn't load, <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">open in new tab</a>
                </p>
            `;
        } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
            previewContent.innerHTML = `
                <img src="${fileUrl}" alt="Preview" class="max-w-full max-h-[600px] rounded-lg shadow-lg">
            `;
        } else if (extension === 'txt' || extension === 'md') {
            fetch(fileUrl)
                .then(response => response.text())
                .then(text => {
                    previewContent.innerHTML = `
                        <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm font-mono whitespace-pre-wrap">${this.escapeHtml(text)}</pre>
                    `;
                })
                .catch(() => {
                    previewContent.innerHTML = `
                        <div class="text-center text-gray-500 dark:text-gray-400">
                            <p>Unable to preview this file type.</p>
                            <p class="text-sm mt-2">Please download to view.</p>
                        </div>
                    `;
                });
        } else {
            previewContent.innerHTML = `
                <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                    <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-lg font-semibold mb-2">Preview not available</p>
                    <p class="text-sm mb-4">This file type cannot be previewed in the browser.</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mb-4">Please download the file to view it.</p>
                    <a href="${fileUrl}" download class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        Download File
                    </a>
                </div>
            `;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const docsPreview = new DocsPreview();
    docsPreview.init();
});

