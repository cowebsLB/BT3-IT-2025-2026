// Auth handlers for Supabase email/password
(function(){
    function getClient(){
        return window.SupabaseConfig && window.SupabaseConfig.getClient ? window.SupabaseConfig.getClient() : null;
    }

    const msg = document.getElementById('auth-message');
    const sessionBox = document.getElementById('auth-session');
    const userEmailEl = document.getElementById('auth-user-email');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const signoutBtn = document.getElementById('btn-signout');

    function showMessage(text, ok){
        if (!msg) return;
        msg.textContent = text;
        msg.className = 'mt-4 text-sm text-center ' + (ok ? 'text-green-700' : 'text-red-600');
    }

    async function refreshSessionUI(){
        const client = getClient();
        if (!client) return;
        const { data } = await client.auth.getUser();
        const user = data && data.user;
        if (user) {
            if (sessionBox) sessionBox.classList.remove('hidden');
            if (userEmailEl) {
                const nm = user.user_metadata?.full_name;
                userEmailEl.textContent = nm ? nm + ' • ' + (user.email || '') : (user.email || '');
            }
        } else {
            if (sessionBox) sessionBox.classList.add('hidden');
        }
    }

    async function onLogin(e){
        e.preventDefault();
        const client = getClient();
        if (!client) { showMessage('Auth not ready. Try again.', false); return; }
        const email = /** @type {HTMLInputElement} */(document.getElementById('login-email')).value.trim();
        const password = /** @type {HTMLInputElement} */(document.getElementById('login-password')).value;
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) { showMessage(error.message || 'Login failed', false); return; }
        showMessage('Logged in successfully', true);
        refreshSessionUI();
    }

    async function onSignup(e){
        e.preventDefault();
        const client = getClient();
        if (!client) { showMessage('Auth not ready. Try again.', false); return; }
        const name = /** @type {HTMLInputElement} */(document.getElementById('signup-name')).value.trim();
        const email = /** @type {HTMLInputElement} */(document.getElementById('signup-email')).value.trim();
        const password = /** @type {HTMLInputElement} */(document.getElementById('signup-password')).value;
        const passwordConfirm = /** @type {HTMLInputElement} */(document.getElementById('signup-password-confirm')).value;
        const tos = /** @type {HTMLInputElement} */(document.getElementById('signup-tos')).checked;

        if (!name) { showMessage('Please enter your name', false); return; }
        if (password !== passwordConfirm) { showMessage('Passwords do not match', false); return; }
        if (!tos) { showMessage('You must agree to the Terms', false); return; }

        const { error } = await client.auth.signUp({ 
            email, 
            password,
            options: { data: { full_name: name } }
        });
        if (error) { showMessage(error.message || 'Sign up failed', false); return; }
        showMessage('Check your email to confirm your account', true);
        refreshSessionUI();
    }

    async function onSignout(){
        const client = getClient();
        if (!client) return;
        await client.auth.signOut();
        showMessage('Signed out', true);
        refreshSessionUI();
    }

    document.addEventListener('DOMContentLoaded', function(){
        // init supabase in case not loaded yet
        if (window.SupabaseConfig && typeof window.SupabaseConfig.init === 'function') {
            window.SupabaseConfig.init();
        }
        if (loginForm) loginForm.addEventListener('submit', onLogin);
        if (signupForm) signupForm.addEventListener('submit', onSignup);
        if (signoutBtn) signoutBtn.addEventListener('click', onSignout);

        // react to auth state changes
        const client = getClient();
        if (client) {
            client.auth.onAuthStateChange(() => refreshSessionUI());
            refreshSessionUI();
        } else {
            setTimeout(refreshSessionUI, 600);
        }
    });
})();

// Optional: simple guard to redirect unauthenticated users
window.requireAuth = async function redirectIfNoAuth(redirectTo = 'auth.html'){
    const client = window.SupabaseConfig?.getClient?.();
    if (!client) return;
    const { data } = await client.auth.getUser();
    if (!data || !data.user) {
        window.location.href = redirectTo;
    }
};


