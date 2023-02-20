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
    if (c instanceof Object) {
        const DESCRIPTORS = Object.getOwnPropertyDescriptors(c);

        if (DESCRIPTORS.prototype === undefined || DESCRIPTORS.prototype.writable === undefined || DESCRIPTORS.prototype.writable === true) {
            throw TypeError("Not a class");
        }
    }
    else {
        throw TypeError("Not a class");
    }

    if (x instanceof c === false) {
        throw TypeError("Not an instance of " + c.name);
    }
};

export function checkIfObject(x) {
    if (x.constructor === undefined || x.constructor === null || x.constructor !== Object) {
        throw TypeError("Not an object");
    }
};

export function checkIfFunction(x) {
    if (typeof x !== 'function' || Object.prototype.toString.call(x) !== '[object Function]') {
        throw TypeError("Not a function");
    }
};

export function checkIfKeyExistsInObject(o, k) {
    checkIfObject(o);
    checkIfString(k);

    if (o[k] === undefined) {
        throw ReferenceError(`The key '${k}' doesn't exist in the object`);
    }
};

export function checkIfArray(x) {
    if (x.constructor !== Array) {
        throw TypeError("Not an array");
    }
};
