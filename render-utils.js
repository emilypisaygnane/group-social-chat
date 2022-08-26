export function renderComment(comment) {

    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add('chat-bubble');

    p.textContent = `${comment.profile.user_name} ${comment.text}`;
    
    div.append(p);

    return div;
}