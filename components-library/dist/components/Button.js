"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var react_1 = __importDefault(require("react"));
exports.Button = react_1.default.forwardRef(function (_a, ref) {
    var label = _a.label, onPress = _a.onPress, onClick = _a.onClick, children = _a.children, props = __rest(_a, ["label", "onPress", "onClick", "children"]);
    // Handle both onPress (from remote press event) and onClick (standard React)
    var handleClick = function (event) {
        // Call onPress if it exists (from remote press event)
        if (onPress) {
            onPress();
        }
        // Call onClick if it exists (standard React handler)
        if (onClick) {
            onClick(event);
        }
    };
    return (react_1.default.createElement("button", __assign({ ref: ref, onClick: handleClick, style: {
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        } }, props), label || children));
});
exports.Button.displayName = 'g-button';
