import { addComment, getComments, onComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

const chatForm = document.querySelector('.chat-form');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(chatForm);

    const response = await addComment({
        text: data.get('text')
    });
    console.log(response);

    return response.data;






});

const commentContainer = document.querySelector('.comment-container');

async function displayComments() {
    commentContainer.innerHTML = '';

    const response = await getComments();
    const comments = response.data;
    for (let item of comments) {
        const ul = renderComment(item);
        commentContainer.append(ul);
    }
}
displayComments();