import { checkAuth, updateProfile, uploadImage } from '../fetch-utils.js';

const user = checkAuth();
const form = document.querySelector('.profile-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    
    const imageFile = data.get('avatar');
    
    const userProfile = {
        user_name: data.get('username'),
        bio: data.get('bio')
    };

    if (imageFile.size) {
        
        const imageName = `${user.id}/${imageFile.name}`;
        console.log(imageFile, imageName);
        const url = await uploadImage (
            'avatars',
            imageFile,
            imageName
        );
        console.log(url);
        userProfile.avatar_url = url;
    }
    // const profileUpdate = 
    await updateProfile(userProfile);
    
    form.reset();
});

