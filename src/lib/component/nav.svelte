<script>
	import { warningMsg, showWarning, showAlert, successWarning } from '../../utils/alert.js';
	import { isLoggedInStore, logOut } from '../../utils/auth.js';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { goto } from '$app/navigation';
	import { statusSpinner } from '../component/spinner.js';

	onMount(() => {
		themeChange(false);
	});

	function goHome() {
		goto('/');
		showWarning.set(false);
	}
	function logIn() {
		goto('/users/login/');
		showWarning.set(false);
	}
	function logOutB() {
		goto('/');
		statusSpinner.set(false);
		successWarning.set(false);
		logOut();
	}
	function postJob() {
		goto('/jobs/new/');
	}
	function signUp() {
		showAlert();
		goto('/users/new/');
	}

	let isChecked = false;

	(toggleCheckboxes) => {
		isChecked = !isChecked;
	};

	
</script>

<header class="mx-10 mt-5">
	<nav class="navbar flex justify-between items-center items-center">
		<div class="prose btn btn-ghost">
			<label class="swap swap-flip text-2xl mr-2">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" class="hidden" bind:checked={isChecked} disabled/>
				<div class="swap-on">🐝</div>
				<div class="swap-off">😈</div>
			</label>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<h1 class=" normal-case text-xl prose text-primary" on:click={goHome}>NEXT-JOBS</h1>
		</div>
		<div class="prose">
			<label class="swap swap-rotate btn btn-ghost btn-md">
				<input type="checkbox" data-toggle-theme="bumblebee,dracula" data-act-class="ACTIVECLASS" class="w-full h-full hidden"bind:checked={isChecked} />
				<!-- sun icon -->
				<svg
					class="swap-on fill-current w-6 h-6 text-primary"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
					/></svg
				>
				<!-- moon icon -->
				<svg
					class="swap-off fill-current w-7 h-7 text-secondary"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
					/></svg
				>
			</label>
			{#if $isLoggedInStore}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<h1 on:click={postJob} class="btn btn-primary m-3 text-sm">Post Job</h1>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<h1 on:click={logOutB} class="btn btn-primary text-sm">Log Out</h1>
			{:else}
				<h1 class="btn btn-ghost m-3 text-primary text-sm" on:mousedown={signUp}>Post Job</h1>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<h1 class="btn btn-ghost text-primary text-sm" on:click={logIn}>Login</h1>
			{/if}
		</div>
	</nav>
	{#if $showWarning}
		<div
			class="container alert alert-warning shadow-lg max-w-sm mx-auto mb-2 rounded-box flex justify-center animate-bounce"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span class="text-center">{$warningMsg}</span>
		</div>
	{/if}
	{#if $successWarning}
		<div
			class="container alert alert-success shadow-lg max-w-xs mx-auto mb-2 rounded-box flex justify-center animate-bounce"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span class="text-center">{$warningMsg}</span>
		</div>
	{/if}
</header>
