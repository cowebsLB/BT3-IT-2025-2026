// Shared JavaScript utilities for BT3 IT Course

// Initialize footer year (if not already set)
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement && !yearElement.textContent) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize dark mode from localStorage
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.setAttribute('data-theme', 'dark');
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            themeToggle.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Auth-aware header button (Login/Account)
    // Requires js/supabase-config.js loaded on the page
    const authCta = document.querySelector('[data-auth-cta]');
    async function updateAuthCta() {
        try {
            const client = window.SupabaseConfig?.getClient?.();
            if (!authCta || !client) return;
            const { data } = await client.auth.getUser();
            const user = data && data.user;
            if (user) {
                const nm = user.user_metadata && user.user_metadata.full_name;
                authCta.textContent = nm || user.email || 'Account';
                authCta.setAttribute('href', 'account.html');
                authCta.setAttribute('title', 'View account');
                authCta.classList.add('font-semibold');
            } else {
                authCta.textContent = 'Login';
                authCta.setAttribute('href', 'auth.html');
                authCta.setAttribute('title', 'Sign in or create account');
                authCta.classList.remove('font-semibold');
            }
        } catch (_) {
            // no-op
        }
    }
    if (authCta) {
        // ensure supabase init kicks in
        if (window.SupabaseConfig?.init) window.SupabaseConfig.init();
        // initial update and subscribe to auth changes if available
        updateAuthCta();
        const client = window.SupabaseConfig?.getClient?.();
        if (client && client.auth) {
            client.auth.onAuthStateChange(updateAuthCta);
        } else {
            // retry once after a short delay if client not ready
            setTimeout(updateAuthCta, 800);
        }
    }
});

// Utility function to get URL query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Utility function to format subject names for display
function formatSubjectName(folderName) {
    // Convert folder names to display names
    const nameMap = {
        'Assemblage': 'Assemblage',
        'math': 'Math',
        'methodology': 'Methodology',
        'PAS (OS)': 'Operating Systems (PAS)',
        'resaux (network)': 'Networks (Resaux)'
    };
    return nameMap[folderName] || folderName;
}

