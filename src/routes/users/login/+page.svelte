<script>
	import { authenticateUser } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import { showLoginAlert } from '../../../utils/alert.js'
	let formErrors = {};

	

	function postLogIn() {
		goto('/')
	}
	async function logInUser(evt) {
		evt.preventDefault();

		const userData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};
		const res = await authenticateUser(userData.username, userData.password);

		if (res.success) {
			postLogIn();
		} else {
			showLoginAlert();
		}
	}
</script>

<div class="mx-10 my-3">
	<h1 class="text-center text-xl">Login your account</h1>
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
				<button class="btn btn-md">Log In</button>
			</div>
		</form>
	</div>
</div>