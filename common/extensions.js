Object.defineProperty(Array.prototype, 'first', {
    get: function () {
        return this[0];
    }
});

Object.defineProperty(Array.prototype, 'last', {
    get: function () {
        return this[this.length - 1];
    }
});

Object.defineProperty(Array.prototype, 'isEmpty', {
    get: function () {
        return this.length <= 0;
    }
});