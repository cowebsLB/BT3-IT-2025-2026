// Supabase Configuration
const SUPABASE_URL = 'https://qvhqgbgxakowluzqdlci.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2aHFnYmd4YWtvd2x1enFkbGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTIyNTcsImV4cCI6MjA3NzMyODI1N30.1VfIeOL2Kzb3UpweSf9oNKoUvT6Gi8EZ71FCevxgjuA';

// Initialize Supabase client
let supabaseClient = null;

// Load Supabase library and initialize
async function initSupabase() {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return supabaseClient;
    }
    
    // Dynamically load Supabase JS library if not already loaded
    if (!document.querySelector('script[src*="supabase"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
        script.onload = () => {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase client initialized');
        };
        document.head.appendChild(script);
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
} else {
    initSupabase();
}

// Export for use in other modules
window.SupabaseConfig = {
    getClient: () => supabaseClient,
    init: initSupabase,
    url: SUPABASE_URL,
    key: SUPABASE_ANON_KEY
};

