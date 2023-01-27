export function checkIfString(x) {
    if (typeof x !== 'string') {
        throw TypeError("Not a string");
    }
};

export function checkIfNumber(x) {
    if (typeof x !== 'number') {
        throw TypeError("Not an integer or float");
    }
};

export function checkIfInstance(x, c) {
    if (c instanceof Object === false) {
        const DESCRIPTORS = Object.getOwnPropertyDescriptors(c);

        if (DESCRIPTORS.prototype === undefined || DESCRIPTORS.prototype.writable === undefined || DESCRIPTORS.prototype.writable === true) {
            throw ReferenceError("Not a class");
        }
    }

    if (x instanceof c === false) {
        throw TypeError("Not an instance of " + c.name);
    }
};