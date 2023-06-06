import { writable } from 'svelte/store';

export const alertMessage = writable('');
export const alertType = writable('');

let timeoutId;

export const displayAlert = (message, type) => {
	alertMessage.set(message);
	alertType.set(type);
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		alertMessage.set();
	}, 5000);
};

export const Reset = () => {
	alertMessage.set();
	alertType.set();
};
