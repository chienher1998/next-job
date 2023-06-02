<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import { getTokenFromLocalStorage } from '../../../utils/auth.js';
	import { getUserId } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import {deleteAlert} from '../../../utils/alert.js'
	export let data;

	function goSeeJob() {
		goto('/');
		deleteAlert()
	}
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
		if (resp.status == 200) {
			goSeeJob();
		} else {
			throw 'cant delete job';
		}
	}
</script>

<head>
	<link href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
</head>

<div class="container my-10 mx-auto max-w-7xl ">
	<div class="flex">
		<div class="flex-1 ml-3">
			<div class="flex items-center">
				<h1 class="text-3xl font-extrabold text-accent" for="title">{data.job.title}</h1>
				{#if getUserId() === data.job.user}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="btn btn-ghost hover:text-sky-400 ml-4">
						<i class="fa fa-solid fa-pen-to-square fa-lg cursor-pointer " on:click={postEdit} />
					</div>

					<a href="#my_modal_8" class="btn btn-ghost hover:text-rose-600">
						<i class="fa fa-solid fa-trash-can fa-lg cursor-pointer" /></a
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
									<a class="btn btn-primary" on:mousedown={deleteJob} on:mouseup={goSeeJob}>Confirm</a>
									<!-- svelte-ignore a11y-invalid-attribute -->
									<a href="#" class="btn btn-primary">Cancel</a>
								</div>
						</div>
					</div>
				{:else}
					<i class="" />
				{/if}
			</div>
			<p class="text-xl stat-value" for="employer">{data.job.employer}</p>
		</div>
	</div>

	<div class="flex flex-row w-full mt-8">
		<div class="basis-2/3 prose max-w-none w-full bg-neutral rounded-box p-8 ease-in duration-200">
			<h2 class="text-xl stat-value">Description</h2>
			<SvelteMarkdown source={data.job.description} />
			<div class="mt-6" />
			<h2 class="text-xl stat-value">Requirements</h2>
			<SvelteMarkdown source={data.job.requirements} />
			<div class="mt-6" />
			<h2 class="text-xl stat-value">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div class="basis-1/5 ml-5 bg-neutral p-5 rounded-box max-h-64 ease-in duration-200">
			<h2 class="text-lg font-thin">Location</h2>
			<p class="stat-value text-lg">{data.job.location}</p>
			<div class="mt-6 stat" />
			<h2 class="text-lg font-thin">Salary Range</h2>
			<p class="stat-value text-lg">
				 ${humanize.formatNumber(data.job.minAnnualCompensation)} - ${humanize.formatNumber(
					data.job.maxAnnualCompensation
				)}
			</p>
			<p class="stat-desc">USD per annum</p>
		</div>
	</div>
</div>
