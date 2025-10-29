// File Upload Handler for Student Document/Image Uploads
// Uses Supabase Storage for file uploads and a table for metadata

class FileUploader {
    constructor(uploadAreaId, fileInputId, filesListId) {
        this.uploadArea = document.getElementById(uploadAreaId);
        this.fileInput = document.getElementById(fileInputId);
        this.filesList = document.getElementById(filesListId);
        this.uploadList = document.getElementById('upload-list');
        this.uploadProgress = document.getElementById('upload-progress');
        this.maxFileSize = 10 * 1024 * 1024; // 10MB
        this.allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'application/zip',
            'text/plain'
        ];
        
        this.init();
    }
    
    init() {
        if (!this.uploadArea || !this.fileInput) return;
        
        // Click to upload
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.querySelector('button')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.fileInput.click();
        });
        
        // File input change
        this.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
        
        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('border-blue-500', 'bg-blue-100', 'dark:bg-blue-900/30');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('border-blue-500', 'bg-blue-100', 'dark:bg-blue-900/30');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('border-blue-500', 'bg-blue-100', 'dark:bg-blue-900/30');
            this.handleFiles(e.dataTransfer.files);
        });
        
        // Load existing files
        this.loadUploadedFiles();
    }
    
    handleFiles(files) {
        Array.from(files).forEach(file => {
            if (this.validateFile(file)) {
                this.uploadFile(file);
            }
        });
    }
    
    validateFile(file) {
        if (file.size > this.maxFileSize) {
            this.showError(window.i18n ? window.i18n.t('resources.fileTooLarge') : 'File is too large (max 10MB)');
            return false;
        }
        
        // Check file extension
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        const validExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.zip', '.txt'];
        
        if (!validExtensions.includes(extension)) {
            this.showError('File type not supported. Please upload PDF, DOC, DOCX, JPG, PNG, GIF, ZIP, or TXT files.');
            return false;
        }
        
        return true;
    }
    
    async uploadFile(file) {
        const fileId = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        // Show upload progress
        this.showUploadProgress(file, fileId);
        
        try {
            // Try Supabase first
            const supabaseClient = window.SupabaseConfig?.getClient();
            
            if (supabaseClient) {
                // Upload to Supabase Storage
                const fileExt = file.name.split('.').pop();
                const fileName = `${fileId}.${fileExt}`;
                const filePath = `uploads/${fileName}`;
                
                const { data: uploadData, error: uploadError } = await supabaseClient
                    .storage
                    .from('student-uploads')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false
                    });
                
                if (uploadError) throw uploadError;
                
                // Get public URL
                const { data: urlData } = supabaseClient
                    .storage
                    .from('student-uploads')
                    .getPublicUrl(filePath);
                
                // Save metadata to database
                const fileData = {
                    id: fileId,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    upload_date: new Date().toISOString(),
                    file_path: filePath,
                    file_url: urlData.publicUrl,
                    subject: this.getCurrentSubject() || null
                };
                
                const { error: dbError } = await supabaseClient
                    .from('uploaded_files')
                    .insert([fileData]);
                
                if (dbError) throw dbError;
                
                // Update UI
                this.hideUploadProgress(fileId);
                this.displayFile(fileData);
                this.showSuccess(file.name);
                return;
            }
        } catch (error) {
            console.warn('Supabase upload failed, falling back to localStorage:', error);
        }
        
        // Fallback to localStorage if Supabase is not available
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const fileData = {
                id: fileId,
                name: file.name,
                type: file.type,
                size: file.size,
                uploadDate: new Date().toISOString(),
                data: e.target.result
            };
            
            const uploadedFiles = this.getUploadedFiles();
            uploadedFiles.push(fileData);
            localStorage.setItem('student_uploads', JSON.stringify(uploadedFiles));
            
            this.hideUploadProgress(fileId);
            this.displayFile(fileData);
            this.showSuccess(file.name);
        };
        
        reader.onerror = () => {
            this.hideUploadProgress(fileId);
            this.showError(window.i18n ? window.i18n.t('resources.uploadError') : 'Upload failed');
        };
        
        reader.readAsDataURL(file);
    }
    
    getCurrentSubject() {
        // Try to get subject from URL or context
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('subject') || null;
    }
    
    showUploadProgress(file, fileId) {
        if (!this.uploadList || !this.uploadProgress) return;
        
        this.uploadProgress.classList.remove('hidden');
        
        const progressItem = document.createElement('div');
        progressItem.id = `progress-${fileId}`;
        progressItem.className = 'flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg';
        progressItem.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="loading-spinner w-5 h-5"></div>
                <span class="text-sm text-gray-700 dark:text-gray-300">${file.name}</span>
            </div>
            <span class="text-xs text-blue-600 dark:text-blue-400">${window.i18n ? window.i18n.t('resources.uploading') : 'Uploading...'}</span>
        `;
        this.uploadList.appendChild(progressItem);
    }
    
    hideUploadProgress(fileId) {
        const progressItem = document.getElementById(`progress-${fileId}`);
        if (progressItem) {
            progressItem.remove();
        }
        
        if (this.uploadList && this.uploadList.children.length === 0) {
            this.uploadProgress.classList.add('hidden');
        }
    }
    
    async loadUploadedFiles() {
        try {
            const supabaseClient = window.SupabaseConfig?.getClient();
            const currentSubject = this.getCurrentSubject();
            
            if (supabaseClient) {
                // Load from Supabase
                let query = supabaseClient
                    .from('uploaded_files')
                    .select('*')
                    .order('upload_date', { ascending: false });
                
                // Filter by subject if on a subject page
                if (currentSubject) {
                    query = query.eq('subject', currentSubject);
                }
                
                const { data: files, error } = await query;
                
                if (error) throw error;
                
                if (files && files.length > 0) {
                    files.forEach(file => {
                        // Normalize data structure
                        const fileData = {
                            id: file.id,
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            uploadDate: file.upload_date,
                            data: file.file_url,
                            file_url: file.file_url,
                            file_path: file.file_path
                        };
                        this.displayFile(fileData);
                    });
                    return;
                }
            }
        } catch (error) {
            console.warn('Failed to load from Supabase, using localStorage:', error);
        }
        
        // Fallback to localStorage
        const stored = localStorage.getItem('student_uploads');
        const files = stored ? JSON.parse(stored) : [];
        
        if (files.length === 0) {
            if (this.filesList) {
                this.filesList.innerHTML = `<p class="text-sm text-gray-500 dark:text-gray-400 italic">${window.i18n ? window.i18n.t('resources.noFilesUploaded') : 'No files uploaded yet'}</p>`;
            }
            return;
        }
        
        files.forEach(file => this.displayFile(file));
    }
    
    getUploadedFiles() {
        const stored = localStorage.getItem('student_uploads');
        return stored ? JSON.parse(stored) : [];
    }
    
    displayFile(file) {
        if (!this.filesList) return;
        
        // Remove "no files" message if exists
        const noFilesMsg = this.filesList.querySelector('p.italic');
        if (noFilesMsg) noFilesMsg.remove();
        
        const fileItem = document.createElement('div');
        fileItem.className = 'flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow';
        fileItem.id = `file-${file.id}`;
        
        const fileIcon = this.getFileIcon(file.name);
        const fileSize = this.formatFileSize(file.size);
        const uploadDate = new Date(file.uploadDate).toLocaleDateString();
        
        fileItem.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-xl">${fileIcon}</span>
                <div>
                    <p class="font-semibold text-gray-800 dark:text-white text-sm">${file.name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${fileSize} • ${uploadDate}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <a href="${file.file_url || file.data}" download="${file.name}" target="_blank" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    <i class="fas fa-download mr-1"></i>${window.i18n ? window.i18n.t('common.download') : 'Download'}
                </a>
                <button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium" onclick="fileUploader.removeFile('${file.id}')">
                    <i class="fas fa-trash mr-1"></i>${window.i18n ? window.i18n.t('resources.removeFile') : 'Remove'}
                </button>
            </div>
        `;
        
        this.filesList.appendChild(fileItem);
    }
    
    async removeFile(fileId) {
        try {
            const supabaseClient = window.SupabaseConfig?.getClient();
            
            if (supabaseClient) {
                // Get file info first
                const { data: fileData, error: fetchError } = await supabaseClient
                    .from('uploaded_files')
                    .select('file_path')
                    .eq('id', fileId)
                    .single();
                
                if (!fetchError && fileData) {
                    // Delete from storage
                    const { error: storageError } = await supabaseClient
                        .storage
                        .from('student-uploads')
                        .remove([fileData.file_path]);
                    
                    if (storageError) throw storageError;
                    
                    // Delete from database
                    const { error: dbError } = await supabaseClient
                        .from('uploaded_files')
                        .delete()
                        .eq('id', fileId);
                    
                    if (dbError) throw dbError;
                }
            }
        } catch (error) {
            console.warn('Failed to delete from Supabase, removing from localStorage:', error);
        }
        
        // Fallback to localStorage
        const uploadedFiles = this.getUploadedFiles().filter(f => f.id !== fileId);
        localStorage.setItem('student_uploads', JSON.stringify(uploadedFiles));
        
        const fileElement = document.getElementById(`file-${fileId}`);
        if (fileElement) {
            fileElement.remove();
        }
        
        if (uploadedFiles.length === 0 && this.filesList) {
            this.filesList.innerHTML = `<p class="text-sm text-gray-500 dark:text-gray-400 italic">${window.i18n ? window.i18n.t('resources.noFilesUploaded') : 'No files uploaded yet'}</p>`;
        }
    }
    
    getFileIcon(fileName) {
        const ext = '.' + fileName.split('.').pop().toLowerCase();
        const icons = {
            '.pdf': '<i class="fas fa-file-pdf text-red-600"></i>',
            '.doc': '<i class="fas fa-file-word text-blue-600"></i>',
            '.docx': '<i class="fas fa-file-word text-blue-600"></i>',
            '.jpg': '<i class="fas fa-file-image text-green-600"></i>',
            '.jpeg': '<i class="fas fa-file-image text-green-600"></i>',
            '.png': '<i class="fas fa-file-image text-green-600"></i>',
            '.gif': '<i class="fas fa-file-image text-green-600"></i>',
            '.zip': '<i class="fas fa-file-archive text-yellow-600"></i>',
            '.txt': '<i class="fas fa-file-alt text-gray-600"></i>'
        };
        return icons[ext] || '<i class="fas fa-paperclip text-gray-600"></i>';
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    showSuccess(fileName) {
        // Could show a toast notification here
        console.log('File uploaded:', fileName);
    }
    
    showError(message) {
        // Could show a toast notification here
        alert(message);
    }
}

// Initialize on page load
let fileUploader;
document.addEventListener('DOMContentLoaded', () => {
    fileUploader = new FileUploader('upload-area', 'file-input', 'files-list');
    window.fileUploader = fileUploader; // Make available globally
});

