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