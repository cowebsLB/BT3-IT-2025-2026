// Account page logic: load/update profile and manage roles
(function(){
    const ADMIN_EMAILS = [
        'you@example.com' // Replace with your admin email
    ];

    function getClient(){
        return window.SupabaseConfig?.getClient?.() || null;
    }

    function isAdminEmail(email){
        return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
    }

    const nameInput = document.getElementById('acct-name');
    const emailInput = document.getElementById('acct-email');
    const saveBtn = document.getElementById('acct-save');
    const msgEl = document.getElementById('acct-msg');
    const roleBadge = document.getElementById('acct-role-badge');
    const roleAdminBox = document.getElementById('acct-role-admin');
    const roleSelect = document.getElementById('acct-role-select');
    const roleSave = document.getElementById('acct-role-save');
    const createdEl = document.getElementById('acct-created');
    const avatarImg = document.getElementById('acct-avatar');
    const avatarFallback = document.getElementById('acct-avatar-fallback');
    const avatarBtn = document.getElementById('acct-avatar-btn');
    const avatarInput = document.getElementById('acct-avatar-input');
    const uploadsList = document.getElementById('acct-uploads-list');
    const uploadsEmpty = document.getElementById('acct-uploads-empty');

    function showMsg(text, ok){
        if (!msgEl) return;
        msgEl.textContent = text;
        msgEl.className = 'ml-3 text-sm ' + (ok ? 'text-green-700' : 'text-red-600');
    }

    function roleToBadgeClass(role){
        switch(role){
            case 'admin': return 'bg-red-100 text-red-800';
            case 'teacher': return 'bg-purple-100 text-purple-800';
            case 'student': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    async function loadProfile(){
        const client = getClient();
        if (!client) return;
        const { data } = await client.auth.getUser();
        const user = data?.user;
        if (!user) return;
        const fullName = user.user_metadata?.full_name || '';
        const role = user.user_metadata?.role || 'student';
        const avatar = user.user_metadata?.avatar_url || '';
        if (nameInput) nameInput.value = fullName;
        if (emailInput) emailInput.value = user.email || '';
        if (createdEl) createdEl.textContent = new Date(user.created_at).toLocaleString();
        if (avatar && avatarImg && avatarFallback) {
            avatarImg.src = avatar;
            avatarImg.classList.remove('hidden');
            avatarFallback.classList.add('hidden');
        }
        if (roleBadge) {
            roleBadge.textContent = role;
            roleBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold ' + roleToBadgeClass(role);
        }
        if (roleSelect) roleSelect.value = role;
        if (roleAdminBox) {
            roleAdminBox.classList.toggle('hidden', !isAdminEmail(user.email));
        }
    }

    async function saveProfile(){
        const client = getClient();
        if (!client) return;
        const full_name = nameInput.value.trim();
        const { error } = await client.auth.updateUser({ data: { full_name } });
        if (error) { showMsg(error.message || 'Failed to save', false); return; }
        showMsg('Saved', true);
        loadProfile();
    }

    async function saveRole(){
        const client = getClient();
        if (!client) return;
        const { data } = await client.auth.getUser();
        const user = data?.user;
        if (!user || !isAdminEmail(user.email)) { showMsg('Not authorized', false); return; }
        const role = roleSelect.value;
        const { error } = await client.auth.updateUser({ data: { role } });
        if (error) { showMsg(error.message || 'Failed to update role', false); return; }
        showMsg('Role updated', true);
        loadProfile();
    }

    document.addEventListener('DOMContentLoaded', function(){
        if (window.SupabaseConfig?.init) window.SupabaseConfig.init();
        loadProfile();
        saveBtn?.addEventListener('click', saveProfile);
        roleSave?.addEventListener('click', saveRole);
        // tabs
        document.querySelectorAll('[data-tab]')?.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                document.querySelectorAll('[data-tab]')?.forEach(b => b.classList.remove('bg-blue-50','text-blue-700','font-semibold'));
                btn.classList.add('bg-blue-50','text-blue-700','font-semibold');
                document.querySelectorAll('[data-panel]')?.forEach(p => p.classList.add('hidden'));
                const panel = document.querySelector('[data-panel="' + tab + '"]');
                panel?.classList.remove('hidden');
                if (tab === 'uploads') loadMyUploads();
            });
        });
        // avatar upload
        avatarBtn?.addEventListener('click', () => avatarInput?.click());
        avatarInput?.addEventListener('change', (e) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            uploadAvatar(files[0]);
            e.target.value = '';
        });
    });

    async function uploadAvatar(file){
        const client = getClient();
        if (!client) return;
        if (!/^image\//.test(file.type) || file.size > 5 * 1024 * 1024) { showMsg('Invalid image (max 5MB)', false); return; }
        const { data } = await client.auth.getUser();
        const user = data?.user; if (!user) return;
        const path = `avatars/${user.id}_${Date.now()}.${file.name.split('.').pop()}`;
        const { error: upErr } = await client.storage.from('images').upload(path, file, { upsert: true, contentType: file.type });
        if (upErr) { showMsg('Failed to upload avatar', false); return; }
        const { data: urlData } = client.storage.from('images').getPublicUrl(path);
        const avatar_url = urlData?.publicUrl;
        const { error: updErr } = await client.auth.updateUser({ data: { avatar_url } });
        if (updErr) { showMsg('Failed to save avatar', false); return; }
        showMsg('Avatar updated', true);
        loadProfile();
    }

    async function loadMyUploads(){
        const client = getClient();
        if (!client || !uploadsList) return;
        uploadsList.innerHTML = '';
        uploadsEmpty?.classList.remove('hidden');
        const { data: userData } = await client.auth.getUser();
        const user = userData?.user; if (!user) return;
        let query = client.from('uploaded_files').select('*').order('upload_date', { ascending: false });
        // Prefer user_id, fallback to email
        query = query.or(`uploader_id.eq.${user.id},uploader_email.eq.${user.email}`);
        const { data: files, error } = await query;
        if (error) { console.warn('loadMyUploads error', error); return; }
        if (!files || files.length === 0) { return; }
        uploadsEmpty?.classList.add('hidden');
        files.forEach(file => addUploadCard(file));
    }

    function addUploadCard(file){
        const card = document.createElement('div');
        card.className = 'rounded-xl border bg-white overflow-hidden shadow';
        const isImage = /^image\//.test(file.type);
        const preview = isImage ? `<img src="${file.file_url}" alt="${file.name}" class="w-full h-40 object-cover">` : `<div class="w-full h-40 flex items-center justify-center bg-gray-100">📄</div>`;
        card.innerHTML = `
            ${preview}
            <div class="p-3 text-sm">
                <div class="font-semibold text-gray-800 truncate">${file.name}</div>
                <div class="text-gray-500 text-xs">${(file.size/1024).toFixed(1)} KB • ${new Date(file.uploadDate || file.upload_date).toLocaleDateString()}</div>
                <div class="mt-2 flex items-center gap-2">
                    <a href="${file.file_url}" target="_blank" class="text-blue-600 hover:underline">Open</a>
                    <button data-remove="${file.id}" class="text-red-600 hover:underline">Remove</button>
                </div>
            </div>
        `;
        card.querySelector('[data-remove]')?.addEventListener('click', () => removeUpload(file));
        uploadsList.appendChild(card);
    }

    async function removeUpload(file){
        const client = getClient(); if (!client) return;
        if (!confirm('Delete this file?')) return;
        // delete from storage
        await client.storage.from('student-uploads').remove([file.file_path]);
        // delete from DB
        await client.from('uploaded_files').delete().eq('id', file.id);
        showMsg('File removed', true);
        loadMyUploads();
    }
})();


