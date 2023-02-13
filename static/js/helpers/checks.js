export function checkIfString(x) {
    if (typeof x !== 'string') {
        throw TypeError("Not a string");
    }
};