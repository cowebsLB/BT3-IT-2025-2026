// Chat functionality using Supabase Realtime

class ChatManager {
    constructor() {
        this.supabaseClient = null;
        this.messages = [];
        this.currentChannel = null;
        this.init();
    }
    
    async init() {
        // Wait for Supabase to be initialized
        await window.SupabaseConfig?.init();
        this.supabaseClient = window.SupabaseConfig?.getClient();
        
        if (!this.supabaseClient) {
            console.warn('Supabase not available, chat will be disabled');
            this.showOfflineMessage();
            return;
        }
        
        this.setupChat();
    }
    
    async setupChat() {
        // Check if messages table exists and create subscription
        try {
            // Subscribe to new messages
            this.supabaseClient
                .channel('messages')
                .on('postgres_changes', 
                    { event: 'INSERT', schema: 'public', table: 'chat_messages' },
                    (payload) => {
                        this.addMessageToUI(payload.new);
                    }
                )
                .subscribe();
            
            // Load existing messages
            await this.loadMessages();
            
            // Setup message form
            this.setupMessageForm();
        } catch (error) {
            console.error('Error setting up chat:', error);
            this.showOfflineMessage();
        }
    }
    
    async loadMessages() {
        try {
            const { data, error } = await this.supabaseClient
                .from('chat_messages')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(50);
            
            if (error) throw error;
            
            if (data) {
                this.messages = data;
                this.renderMessages();
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }
    
    async sendMessage(messageText, authorName = 'Student') {
        if (!this.supabaseClient || !messageText.trim()) return;
        
        try {
            const { data, error } = await this.supabaseClient
                .from('chat_messages')
                .insert([
                    {
                        message: messageText.trim(),
                        author: authorName,
                        created_at: new Date().toISOString()
                    }
                ])
                .select()
                .single();
            
            if (error) throw error;
            
            // Message will be added via subscription, but we can add it immediately for better UX
            if (data) {
                this.addMessageToUI(data);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    }
    
    addMessageToUI(message) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'flex items-start gap-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm';
        
        const timestamp = new Date(message.created_at).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageElement.innerHTML = `
            <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                ${message.author ? message.author.charAt(0).toUpperCase() : 'S'}
            </div>
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                    <span class="font-semibold text-gray-800 dark:text-white">${message.author || 'Student'}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">${timestamp}</span>
                </div>
                <p class="text-gray-700 dark:text-gray-300">${this.escapeHtml(message.message)}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    renderMessages() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        this.messages.forEach(message => this.addMessageToUI(message));
    }
    
    setupMessageForm() {
        const messageForm = document.getElementById('chat-form');
        const messageInput = document.getElementById('chat-message-input');
        const sendButton = document.getElementById('chat-send-button');
        
        if (!messageForm || !messageInput) return;
        
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (message) {
                const authorName = document.getElementById('chat-author-name')?.value || 'Student';
                this.sendMessage(message, authorName);
                messageInput.value = '';
            }
        });
        
        if (sendButton) {
            sendButton.addEventListener('click', (e) => {
                e.preventDefault();
                messageForm.dispatchEvent(new Event('submit'));
            });
        }
        
        // Enable form if Supabase is available
        if (messageForm) messageForm.style.display = 'block';
        if (messageInput) messageInput.disabled = false;
        if (sendButton) sendButton.disabled = false;
        
        // Show chat container
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.classList.remove('hidden');
        }
        
        // Hide coming soon notice
        const comingSoon = document.querySelector('[data-i18n="chat.comingSoon"]');
        if (comingSoon) {
            const noticeSection = comingSoon.closest('.bg-gradient-to-r');
            if (noticeSection) {
                noticeSection.classList.add('hidden');
            }
        }
    }
    
    showOfflineMessage() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-wifi text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">Chat is currently unavailable</p>
                    <p class="text-sm text-gray-500 dark:text-gray-500">Supabase connection required for real-time chat</p>
                </div>
            `;
        }
        
        const messageForm = document.getElementById('chat-form');
        if (messageForm) {
            messageForm.style.display = 'none';
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat when page loads
let chatManager;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('chat-messages')) {
        chatManager = new ChatManager();
        window.chatManager = chatManager;
    }
});

