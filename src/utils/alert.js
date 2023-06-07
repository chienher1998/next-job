import { writable } from 'svelte/store';

export const warningMsg = writable('');

export const showWarning = writable(false);
export const successWarning = writable(false);


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

export function deleteAlert() {
	successWarning.set(true);
	warningMsg.set('Deleted Job Successfully !');
    resetTimeout()
}

export function loginSucAlert() {
	successWarning.set(true);
	warningMsg.set('Successfully Logged In !');
    resetTimeout()
}

export function createJobAlert() {
	successWarning.set(true);
	warningMsg.set('Successfully Created Job !');
    resetTimeout()
}


let timeoutId;

function resetTimeout() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const variable = [showWarning, successWarning]
    variable.forEach((index) => index.set(false));
  }, 5000);
}


