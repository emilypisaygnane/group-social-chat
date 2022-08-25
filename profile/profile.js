import { checkAuth, signOutUser, createProfile } from '../fetch-utils.js';

const form = document.querySelector('.profile-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const response = await createProfile({
        user_name: data.get('username'),
        avatar_url: data.get('avatar'),
        bio: data.get('bio')
    });
    console.log(response);
    form.reset();
});

