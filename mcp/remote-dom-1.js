// Create the main container stack with centered alignment

const mainStack = document.createElement('ui-stack');
mainStack.setAttribute('direction', 'horizontal');
mainStack.setAttribute('spacing', '20');
mainStack.setAttribute('align', 'center');

const stack = document.createElement('ui-stack');
stack.setAttribute('direction', 'vertical');
stack.setAttribute('spacing', '20');
stack.setAttribute('align', 'center');

const stack1 = document.createElement('ui-stack');
stack.setAttribute('direction', 'vertical');
stack.setAttribute('spacing', '20');
stack.setAttribute('align', 'center');

const stack2 = document.createElement('ui-stack');
stack.setAttribute('direction', 'vertical');
stack.setAttribute('spacing', '20');
stack.setAttribute('align', 'center');

// Create the title text
const title = document.createElement('ui-text');
title.setAttribute('content', 'Logo Toggle Demo');

// Create a centered container for the logo
const logoContainer = document.createElement('ui-stack');
logoContainer.setAttribute('direction', 'vertical');
logoContainer.setAttribute('spacing', '0');
logoContainer.setAttribute('align', 'center');

// Create the logo image (starts with light theme)
const logo = document.createElement('ui-image');
logo.setAttribute('src', 'https://block.github.io/goose/img/logo_light.png');
logo.setAttribute('alt', 'Goose Logo');
logo.setAttribute('width', '200');

// Create a centered container for the logo
const logoContainer2 = document.createElement('ui-stack');
logoContainer2.setAttribute('direction', 'vertical');
logoContainer2.setAttribute('spacing', '0');
logoContainer2.setAttribute('align', 'center');

// Create the logo image (starts with light theme)
const logo2 = document.createElement('ui-image');
logo2.setAttribute('src', 'https://block.github.io/goose/img/logo_light.png');
logo2.setAttribute('alt', 'Goose Logo');
logo2.setAttribute('width', '200');

// Assemble the UI
logoContainer.appendChild(logo);
logoContainer.appendChild(logo);
logoContainer2.appendChild(logo2);
logoContainer2.appendChild(logo2);

stack.appendChild(logoContainer);

stack2.appendChild(logoContainer2);

mainStack.appendChild(stack);
mainStack.appendChild(stack1);
mainStack.appendChild(stack2);
root.appendChild(mainStack);