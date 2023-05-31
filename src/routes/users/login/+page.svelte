<script>
	import { authenticateUser } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import { showLoginAlert, showWarning } from '../../../utils/alert.js';
	import { writable } from 'svelte/store';

	let formErrors = {};
	let statusSpinner = writable(false);
	function postLogIn() {
		goto('/');
	}
	async function logInUser(evt) {
		statusSpinner.set(true);
		evt.preventDefault();
		const userData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};
		const res = await authenticateUser(userData.username, userData.password);

		if (res.success) {
			showWarning.set(false);
			postLogIn();
		} else {
			statusSpinner.set(false);
			showLoginAlert();
		}
	}

	let sayHello = false;
	let name = '';
	function updateSayHello() {
		if (name !== '') {
			sayHello = true;
		}
	}
</script>

<div class="mx-10 my-3">
	<h1 class="text-center text-xl">Login your account</h1>
	{#if sayHello}
		<h2 class="text-center text-md">Hi {name}</h2>
	{/if}
	<div class="flex justify-center items-center mt-8">
		<form on:submit={logInUser} class="w-1/3">
			<div class="form-control w-full">
				<label class="label" for="username">
					<span class="label-text">Username</span>
				</label>
				<input
					type="text"
					name="username"
					placeholder="Enter your username"
					class="input input-bordered w-full"
					bind:value={name}
					on:input={updateSayHello}
				/>
			</div>
			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					name="password"
					placeholder="Enter your password"
					class="input input-bordered w-full"
					required
				/>
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors.password.message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full mt-4">
				<button class="btn btn-md">
					{#if $statusSpinner}
						<div class="mx-5 visible">
							<svg
								width="24"
								height="24"
								fill="#C2CBF5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><style>
									.spinner_9y7u {
										animation: spinner_fUkk 2.4s linear infinite;
										animation-delay: -2.4s;
									}
									.spinner_DF2s {
										animation-delay: -1.6s;
									}
									.spinner_q27e {
										animation-delay: -0.8s;
									}
									@keyframes spinner_fUkk {
										8.33% {
											x: 13px;
											y: 1px;
										}
										25% {
											x: 13px;
											y: 1px;
										}
										33.3% {
											x: 13px;
											y: 13px;
										}
										50% {
											x: 13px;
											y: 13px;
										}
										58.33% {
											x: 1px;
											y: 13px;
										}
										75% {
											x: 1px;
											y: 13px;
										}
										83.33% {
											x: 1px;
											y: 1px;
										}
									}
								</style><rect class="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" /><rect
									class="spinner_9y7u spinner_DF2s"
									x="1"
									y="1"
									rx="1"
									width="10"
									height="10"
								/><rect
									class="spinner_9y7u spinner_q27e"
									x="1"
									y="1"
									rx="1"
									width="10"
									height="10"
								/></svg
							>
						</div>
					{:else}
						<div class="mx-5 hidden">
							<svg
								width="24"
								height="24"
								fill="#C2CBF5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><style>
									.spinner_9y7u {
										animation: spinner_fUkk 2.4s linear infinite;
										animation-delay: -2.4s;
									}
									.spinner_DF2s {
										animation-delay: -1.6s;
									}
									.spinner_q27e {
										animation-delay: -0.8s;
									}
									@keyframes spinner_fUkk {
										8.33% {
											x: 13px;
											y: 1px;
										}
										25% {
											x: 13px;
											y: 1px;
										}
										33.3% {
											x: 13px;
											y: 13px;
										}
										50% {
											x: 13px;
											y: 13px;
										}
										58.33% {
											x: 1px;
											y: 13px;
										}
										75% {
											x: 1px;
											y: 13px;
										}
										83.33% {
											x: 1px;
											y: 1px;
										}
									}
								</style><rect class="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" /><rect
									class="spinner_9y7u spinner_DF2s"
									x="1"
									y="1"
									rx="1"
									width="10"
									height="10"
								/><rect
									class="spinner_9y7u spinner_q27e"
									x="1"
									y="1"
									rx="1"
									width="10"
									height="10"
								/></svg
							>
						</div>
					{/if}
					Log In
				</button>
			</div>
		</form>
	</div>
</div>
