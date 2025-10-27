const button = document.createElement('g-button');
button.setAttribute('label', 'Click Me');

button.addEventListener('press', () => {
    console.log("button pressed!")
});

const text = document.createElement('g-text');

text.setAttribute('content', 'This is response from one of the shops ');

root.appendChild(text);
root.appendChild(button);