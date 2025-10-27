export const remoteButtonDefinition = {
  tagName: 'g-button',
  remoteAttributes: ['label'],
  remoteEvents: ['click', 'press'],
};

export const remoteTextDefinition = {
  tagName: 'g-text',
  remoteAttributes: ['content'],
};

export const remoteStackDefinition = {
  tagName: 'g-stack',
  remoteAttributes: ['direction', 'spacing', 'align', 'justify'],
};

export const remoteImageDefinition = {
  tagName: 'g-image',
  remoteAttributes: ['src', 'alt', 'width', 'height'],
};


export const gElements = [
  remoteButtonDefinition,
  remoteTextDefinition,
  remoteStackDefinition,
  remoteImageDefinition,
];