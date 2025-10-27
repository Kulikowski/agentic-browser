"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gElements = exports.remoteTextDefinition = exports.remoteButtonDefinition = void 0;
exports.remoteButtonDefinition = {
    tagName: 'g-button',
    remoteAttributes: ['label'],
    remoteEvents: ['click', 'press'],
};
exports.remoteTextDefinition = {
    tagName: 'g-text',
    remoteAttributes: ['content'],
};
exports.gElements = [
    exports.remoteButtonDefinition,
    exports.remoteTextDefinition
    // {
    //   tagName: 'g-button',
    //   properties: {
    //     label: { type: String },
    //   },
    //   events: {
    //     press: {},
    //   },
    // },
    // {
    //   tagName: 'g-text',
    //   properties: {
    //     content: { type: String },
    //   },
    // },
];
