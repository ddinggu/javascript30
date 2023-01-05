// Tiny KeyboardEvent#key shim for IE and MS Edge.
// Reference from https://github.com/shvaikalesh/shim-keyboard-event-key
// shim !== polyfill(https://developer.mozilla.org/en-US/docs/Glossary/Shim)

(() => {
    'use strict';

    if (typeof self === undefined || !self.document) return;

    const event = KeyboardEvent.prototype;
    const desc = Object.getOwnPropertyDescriptor(event, 'key');

    if (!desc) return;

    const keys = {
        Win: 'Meta',
        Scroll: 'ScrollLock',
        Spacebar: ' ',

        Down: 'ArrowDown',
        Left: 'ArrowLeft',
        Right: 'ArrowRight',
        Up: 'ArrowUp',

        Del: 'Delete',
        Apps: 'ContextMenu',
        Esc: 'Escape',

        Multiply: '*',
        Add: '+',
        Subtract: '-',
        Decimal: '.',
        Divide: '/',
    };

    Object.defineProperty(event, 'key', {
        get: function () {
            const key = desc.get.call(this);

            return keys.hasOwnProperty(key) ? keys[key] : key;
        },
    });
})();
