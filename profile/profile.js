import { checkAuth, updateProfile, uploadImage } from '../fetch-utils.js';

const user = checkAuth();
const form = document.querySelector('.profile-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const profileUpdate = await updateProfile({
        user_name: data.get('username'),
        // avatar_url: data.get('avatar'),
        bio: data.get('bio')
    });

    const imageFile = data.get('avatar');

    if (imageFile.size) {

        const imageName = `${user.id}/${imageFile.name}`;

        const url = await uploadImage (
            'avatars',
            imageFile,
            imageName
        );

        profileUpdate.avatar_url = url;
    }

    // console.log(response);
    form.reset();
});

