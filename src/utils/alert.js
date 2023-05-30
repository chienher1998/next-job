import { writable } from "svelte/store";

export const warningMsg = writable("");

export const showWarning = writable(false);

export function showAlert() {
    showWarning.set(true);
    warningMsg.set("Please sign up first!");

    return setTimeout(() => {
        showWarning.set(false);
    }, 3000);
};

export function showLoginAlert() {
    showWarning.set(true);
    warningMsg.set("Please check username / password!");
};