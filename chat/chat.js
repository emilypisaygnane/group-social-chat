import { addComment, getComment, onComment } from '../fetch-utils.js';

const chatForm = document.querySelector('.chat-form');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(chatForm)

    const response = await addComment({
        text: data.get('text')
    });
    console.log(response);

    return response.data;
});

