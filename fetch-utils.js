const SUPABASE_URL = 'https://hvbgkvbafgvsatqlesna.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2YmdrdmJhZmd2c2F0cWxlc25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEyOTU3MTYsImV4cCI6MTk3Njg3MTcxNn0.N-IG55-eTO1A_uOwUe9xr9xbhi04MW_5BqWqln4SRI8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function updateProfile(profile) {
    const response = await client
        .from('profiles')
        .upsert(profile)
        .single();

    return checkError(response);
}

export async function uploadImage(bucketName, imageFile, imageName) {

    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imageName, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        console.log(response.error);
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

export async function addComment(comment) {
    return await client
        .from('chat')
        .insert(comment)
        .single();
}

export async function getComment(id) {
    return await client
        .from('chat')
        .select('*')
        .match({ id });
        // .single();
}
console.log(getComment(1));
export function onComment(postId, handleNewComment) {
    client
        .from(`comments:post_id=eq${postID}`)
        .on('INSERT', handleNewComment)
        .subscribe();
}

