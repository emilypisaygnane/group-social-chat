export function renderComments(comments) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add('chat-bubble');

    p.textContent = comments.text;
    
    div.append(p);

    return div;
}

