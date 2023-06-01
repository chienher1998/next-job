import { writable } from 'svelte/store';

export const warningMsg = writable('');

export const showWarning = writable(false);

export function showAlert() {
	showWarning.set(true);
	warningMsg.set('Please sign up first!');
    resetTimeout()
}

export function showLoginAlert() {
	showWarning.set(true);
	warningMsg.set('Please check username / password !');
    resetTimeout()
}

export function showEditAlert() {
	showWarning.set(true);
	warningMsg.set('Failed to edit job !');
    resetTimeout()
}

export function showJobAlert() {
	showWarning.set(true);
	warningMsg.set('Failed to create job !');
    resetTimeout()
}

let timeoutId;

function resetTimeout() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    showWarning.set(false);
  }, 5000);
}


