import * as checks from '../js/checks.js';

export function debouncer(func, delay) {
    checks.checkIfFunction(func);
    checks.checkIfNumber(delay);

    let timer = null;

    return () => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this);
        }, delay);
    };
};