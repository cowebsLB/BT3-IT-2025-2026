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

