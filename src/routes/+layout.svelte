<script>
	import '../app.css';
	import { isLoggedInStore, logOut } from '../utils/auth.js';
	import {warningMsg, showWarning, showAlert } from '../utils/alert.js'
	
</script>

<header class="mx-10 mt-5">
	<nav class="flex justify-between items-center">
		<a href="/" class="btn btn-ghost normal-case text-xl" on:mousedown={() => showWarning.set(false)}
			>NEXT-JOBS</a
		>
		<div>
			{#if $isLoggedInStore}
				<a href="/jobs/new/" class="btn mx-10" >Post Job</a>
				<a on:click={logOut} href="/" class="btn">Log Out</a>
			{:else}
				<a href="/users/new/" class="btn mx-10" on:mousedown={showAlert}>Post Job</a>
				<a href="/users/login/" class="btn" on:mousedown={() => showWarning.set(false)} >Login</a>
			{/if}
		</div> 
	</nav> 
	{#if $showWarning}
		<div class="alert alert-warning shadow-lg mt-5">
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
			<span class="absolute ml-8">{$warningMsg}</span>
		</div>
	{/if}
</header>
<slot />
