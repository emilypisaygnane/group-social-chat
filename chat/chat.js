import { addComment, getComment, onComment } from '../fetch-utils.js';
import { renderComments } from '../render-utils.js';

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

const commentContainer = document.querySelector('.comment-container');

async function displayComments() {
    commentContainer.innerHTML = '';

    const response = await getComment('text');
    console.log("hello", response);
    const ul = renderComments(response);

    commentContainer.append(ul);

}
displayComments();

