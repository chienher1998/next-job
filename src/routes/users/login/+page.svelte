<script>
	import { authenticateUser } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import { showLoginAlert, showWarning, loginSucAlert } from '../../../utils/alert.js';
	import Spinner from '../../../lib/component/spinner.svelte';
	import { statusSpinner } from '../../../lib/component/spinner.js';

	let formErrors = {};
	let msg = "Login";

	function postLogIn() {
		goto('/');
		loginSucAlert()
	}
	async function logInUser(evt) {
		statusSpinner.set(true);
		msg = "Logging In";
		evt.preventDefault();
		const userData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};
		const res = await authenticateUser(userData.username, userData.password);

		if (res.success) {
			statusSpinner.set(false);
			showWarning.set(false);
			postLogIn();
		} else {
			msg = "Login";
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

<svelte:head>
	<title>Next Jobs | Login</title>
</svelte:head>

<div class="mx-auto my-3 bg-neutral rounded-box max-w-lg py-20 ease-in duration-200 shadow-2xl">
	<div class="prose mx-auto">
		<h1 class="text-center text-xl ">Login your account</h1>
	</div>
	{#if sayHello}
		<h2 class="text-center text-md">Hi {name}</h2>
	{/if}
	<div class="flex justify-center items-center mt-8">
		<form on:submit={logInUser} class="w-full mx-10">
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
			<div class="form-control w-full mt-10">
				<button class="btn btn-md btn-primary">
					<Spinner />
					{msg}</button
				>
			</div>
		</form>
	</div>
</div>
