// Modular API Structure for Future Backend Integration
// This file contains placeholder functions that can be easily swapped with real API calls

/**
 * API Configuration
 * Replace these with your actual API endpoints when backend is ready
 */
const API_CONFIG = {
    baseUrl: '/api', // Update when backend is ready
    endpoints: {
        subjects: '/subjects',
        gallery: '/gallery',
        chat: '/chat',
        resources: '/resources'
    }
};

/**
 * Subject API Functions
 * Currently returns local data, but structured for easy backend integration
 */
export const SubjectAPI = {
    async getAll() {
        // TODO: Replace with: return fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.subjects}`).then(r => r.json());
        return new Promise((resolve) => {
            const subjects = [
                { id: 'assemblage', name: 'Assemblage', folder: 'Assemblage', description: '...', icon: '🔧' },
                { id: 'math', name: 'Math', folder: 'math', description: '...', icon: '📐' },
                // ... more subjects
            ];
            resolve(subjects);
        });
    },

    async getById(subjectId) {
        // TODO: Replace with: return fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.subjects}/${subjectId}`).then(r => r.json());
        return new Promise((resolve, reject) => {
            // Placeholder - would fetch from backend
            reject(new Error('Subject not found'));
        });
    }
};

/**
 * Gallery API Functions
 */
export const GalleryAPI = {
    async getImages() {
        // TODO: Replace with backend call
        try {
            const response = await fetch('assets/gallery-config.json');
            return response.json();
        } catch (error) {
            return { images: [] };
        }
    }
};

/**
 * Chat API Functions (for Supabase integration)
 */
export const ChatAPI = {
    async sendMessage(channelId, message, userId) {
        // TODO: Implement Supabase real-time chat
        // Example structure:
        // return supabase.from('messages').insert({ channel_id: channelId, content: message, user_id: userId });
        console.log('Chat message:', { channelId, message, userId });
    },

    async getMessages(channelId) {
        // TODO: Fetch from Supabase
        return [];
    }
};

/**
 * Utility function to handle API errors consistently
 */
export function handleAPIError(error) {
    console.error('API Error:', error);
    // Could show user-friendly error messages
    return {
        success: false,
        message: error.message || 'An error occurred',
        data: null
    };
}

/**
 * Example usage pattern for future integration:
 * 
 * import { SubjectAPI } from './js/modular-api.js';
 * 
 * async function loadSubjects() {
 *     try {
 *         const subjects = await SubjectAPI.getAll();
 *         renderSubjects(subjects);
 *     } catch (error) {
 *         handleAPIError(error);
 *     }
 * }
 */

