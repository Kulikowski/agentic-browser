"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gLibrary = void 0;
var Button_1 = require("./Button");
var Text_1 = require("./Text");
exports.gLibrary = {
    name: 'g-library',
    elements: [
        {
            tagName: 'g-button',
            component: Button_1.Button,
            propMapping: {
                label: 'label',
            },
            eventMapping: {
                press: 'onPress',
            },
        },
        {
            tagName: 'g-text',
            component: Text_1.Text,
            propMapping: {
                content: 'content',
            },
            eventMapping: {},
        },
    ],
};
