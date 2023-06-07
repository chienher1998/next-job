<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import { getTokenFromLocalStorage } from '../../../utils/auth.js';
	import { getUserId } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import { displayAlert } from '../../../utils/alert.js';
	export let data;

	function postEdit() {
		goto(`/jobs/${data.job.id}/edit`);
	}

	async function deleteJob() {
		const resp = await fetch(
			PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
			{
				method: 'DELETE',
				mode: 'cors',
				headers: {
					Authorization: getTokenFromLocalStorage() // token given by backend server, to auth the user is logged in
				}
			}
		);
		if (resp.status == 204) {
			goto('/');
			displayAlert('Job has been deleted', 'alert-success');
		} else {
			displayAlert('Job has been deleted', 'alert-warning');
		}
	}
	function calDate() {
		const creationDate = new Date(data.job.created);
		console.log(creationDate);
		const currentDate = new Date();
		console.log(currentDate);
		const timeDiff = currentDate - creationDate; //returns miliseconds
		console.log(timeDiff);

		let timeElapsed;
		if (timeDiff >= 86400000) {
			//a day 24hrs in miliseconds
			// If more than 24 hours have passed, display the number of days
			const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); //24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 86400000 milliseconds
			timeElapsed = `${daysDiff} day ago`;
		} else if (timeDiff >= 3600000) {
			//convert 60mins to miliseconds
			// If more than 1 hour has passed, display the number of hours
			const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
			timeElapsed = `${hoursDiff} hours ago`;
		} else if (timeDiff >= 60000) {
			//convert 60sec to miliseconds
			// If more than 1 minute has passed, display the number of minutes
			const minutesDiff = Math.floor(timeDiff / (1000 * 60));
			timeElapsed = `${minutesDiff} miniutes ago`;
		} else {
			// Display the number of seconds
			const secondsDiff = Math.floor(timeDiff / 1000);
			timeElapsed = `${secondsDiff} seconds ago `;
		}

		return timeElapsed;
	}
</script>

<svelte:head>
	<title>Next-Jobs | {data.job.title}</title>
</svelte:head>

<div class="container my-10 mx-auto max-w-7xl">
	<div
		class="flex flex-col items-center sm:flex-row rounded-box bg-gradient-to-r from-secondary to-primary w-full p-5"
	>
		<div class="sm:flex-1 sm:ml-2 text-center sm:text-start">
			<h1 class=" sm:mt-0 text-3xl font-extrabold" for="title">{data.job.title}</h1>
			<p class="text-xl stat-value" for="employer">{data.job.employer}</p>
		</div>
		<div class="flex mt-5 sm:m-10">
			{#if getUserId() === data.job.user}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="btn btn-ghost hover:text-sky-400" on:click={postEdit}>
					<svg
						viewBox="0 3 30 30"
						style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
						class="h-8 w-5 fill-current"
						version="1.1"
						xml:space="preserve"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:serif="http://www.serif.com/"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						><path
							d="M12.965,5.462c0,-0 -2.584,0.004 -4.979,0.008c-3.034,0.006 -5.49,2.467 -5.49,5.5l0,13.03c0,1.459 0.579,2.858 1.611,3.889c1.031,1.032 2.43,1.611 3.889,1.611l13.003,0c3.038,-0 5.5,-2.462 5.5,-5.5c0,-2.405 0,-5.004 0,-5.004c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.827,-0 -1.5,0.672 -1.5,1.5l0,5.004c0,1.381 -1.119,2.5 -2.5,2.5l-13.003,0c-0.663,-0 -1.299,-0.263 -1.768,-0.732c-0.469,-0.469 -0.732,-1.105 -0.732,-1.768l0,-13.03c0,-1.379 1.117,-2.497 2.496,-2.5c2.394,-0.004 4.979,-0.008 4.979,-0.008c0.828,-0.002 1.498,-0.675 1.497,-1.503c-0.001,-0.828 -0.675,-1.499 -1.503,-1.497Z"
						/><path
							d="M20.046,6.411l-6.845,6.846c-0.137,0.137 -0.232,0.311 -0.271,0.501l-1.081,5.152c-0.069,0.329 0.032,0.671 0.268,0.909c0.237,0.239 0.577,0.343 0.907,0.277l5.194,-1.038c0.193,-0.039 0.371,-0.134 0.511,-0.274l6.845,-6.845l-5.528,-5.528Zm1.415,-1.414l5.527,5.528l1.112,-1.111c1.526,-1.527 1.526,-4.001 -0,-5.527c-0.001,-0 -0.001,-0.001 -0.001,-0.001c-1.527,-1.526 -4.001,-1.526 -5.527,-0l-1.111,1.111Z"
						/><g id="Icon" /></svg
					>
				</div>

				<a href="#my_modal_8" class="btn btn-ghost hover:text-rose-600">
					<svg
						viewBox="0 0 16 19"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						class="si-glyph si-glyph-trash w-5 h-8"
					>
						<defs />
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g transform="translate(1.000000, 0.000000)" class="fill-current">
								<path
									d="M0.982,5.073 L2.007,15.339 C2.007,15.705 2.314,16 2.691,16 L10.271,16 C10.648,16 10.955,15.705 10.955,15.339 L11.98,5.073 L0.982,5.073 L0.982,5.073 Z M7.033,14.068 L5.961,14.068 L5.961,6.989 L7.033,6.989 L7.033,14.068 L7.033,14.068 Z M9.033,14.068 L7.961,14.068 L8.961,6.989 L10.033,6.989 L9.033,14.068 L9.033,14.068 Z M5.033,14.068 L3.961,14.068 L2.961,6.989 L4.033,6.989 L5.033,14.068 L5.033,14.068 Z"
									class="si-glyph-fill"
								/>
								<path
									d="M12.075,2.105 L8.937,2.105 L8.937,0.709 C8.937,0.317 8.481,0 8.081,0 L4.986,0 C4.586,0 4.031,0.225 4.031,0.615 L4.031,2.011 L0.886,2.105 C0.485,2.105 0.159,2.421 0.159,2.813 L0.159,3.968 L12.8,3.968 L12.8,2.813 C12.801,2.422 12.477,2.105 12.075,2.105 L12.075,2.105 Z M4.947,1.44 C4.947,1.128 5.298,0.875 5.73,0.875 L7.294,0.875 C7.726,0.875 8.076,1.129 8.076,1.44 L8.076,2.105 L4.946,2.105 L4.946,1.44 L4.947,1.44 Z"
									class="si-glyph-fill"
								/>
							</g>
						</g>
					</svg></a
				>
				<!-- Put this part before </body> tag -->
				<div class="modal" id="my_modal_8">
					<div class="modal-box">
						<h3 class="font-bold text-lg text-secondary">Alert !</h3>
						<p class="py-4">Are you sure you want to delete this post?</p>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div class="modal-action">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-missing-attribute -->
							<button class="btn btn-primary" on:click={deleteJob}>Confirm</button>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="btn btn-primary">Cancel</a>
						</div>
					</div>
				</div>
			{:else}
				<i class="" />
			{/if}
		</div>
	</div>

	<div class="flex flex-col sm:flex-row w-full mt-8">
		<div
			class="mb-5 basis-4/5 prose max-w-none w-full bg-neutral rounded-box p-8 ease-in duration-200"
		>
			<h2 class="text-xl stat-value">Description</h2>
			<SvelteMarkdown source={data.job.description} />
			<div class="mt-6" />
			<h2 class="text-xl stat-value">Requirements</h2>
			<SvelteMarkdown source={data.job.requirements} />
			<div class="mt-6" />
			<h2 class="text-xl stat-value">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div
			class="sm:sticky top-28 basis-1/5 sm:ml-10 bg-neutral p-5 rounded-box max-h-72 ease-in duration-200"
		>
			<h2 class="text-lg stat-value">Location</h2>
			<p class="stat-title">{data.job.location}</p>
			<h2 class="mt-6 text-lg stat-value">Salary Range</h2>
			<p class="stat-title text-lg">
				${humanize.formatNumber(data.job.minAnnualCompensation)} - ${humanize.formatNumber(
					data.job.maxAnnualCompensation
				)}
			</p>
			<p class="stat-desc">USD per annum</p>
			<h2 class="mt-6 text-lg stat-title">Posted</h2>
			<p class="stat-desc">{calDate()}</p>
		</div>
	</div>
</div>
