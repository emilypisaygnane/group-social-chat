export function renderComment(comment) {

    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add('chat-bubble');

    p.textContent = comment.text;
    
    div.append(p);

    return div;
}

