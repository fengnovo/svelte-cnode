
export default (text, timeout, options) => {
    timeout = timeout || 3000;

    let toast = document.createElement('div');
    toast.classList.add('toast-it');
    let content = document
        .createTextNode(text);
    toast.appendChild(content);
    toast.style.animationDuration = timeout / 1000 + 's';

    for (let prop in options) {
        toast.style[prop] = options[prop];
    }

    document.body.appendChild(toast);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, timeout);
}