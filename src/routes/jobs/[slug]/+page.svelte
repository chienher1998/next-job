<script>
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import { getUserId } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	export let data;
	// import { writable } from 'svelte/store';

	// export const username = writable('');

	// const jobData = {
    //   user: userId,
    //   title: evt.target['title'].value,
    //   minAnnualCompensation: evt.target['minAnnualCompensation'].value,
    //   maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
    //   description: evt.target['description'].value,
    //   requirements: evt.target['requirement'].value,
    //   applicationInstructions: evt.target['appinstruction'].value,
    //   location: evt.target['location'].value,
    //   employer: evt.target['employer'].value
    // };


	// function postEdit(){
	// 	goto(`../{data.job.id}/edit`)
	// }
	
</script>

<head>
	<link href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
</head>

<div class="m-10">	
	<div class="flex">
		<div class="flex-1">
			<div class="flex items-center">
				<h1 class="text-3xl font-extrabold">{data.job.title}</h1>
                {#if getUserId() === data.job.user}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<i class="fa-regular fa-pen-to-square fa-lg ml-5 mt-1 hover:text-black cursor-pointer" href="../{data.job.id}/edit" />
				{:else}
				<i class="" />
                {/if}
			</div>
			<p class="text-xl" for="employer">{data.job.employer}</p>
		</div>
	</div>

	<div class="flex flex-row w-full mt-8">
		<div class="basis-2/3 prose max-w-none w-full">
			<h2 class="text-xl font-thin">Description</h2>
			<SvelteMarkdown source={data.job.description} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Requirements</h2>
			<SvelteMarkdown source={data.job.requirements} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div class="basis-1/3 ml-10">
			<h2 class="text-xl font-thin">Location</h2>
			<p>{data.job.location}</p>
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Salary Range</h2>
			<p>
				USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
					data.job.maxAnnualCompensation
				)}
			</p>
		</div>
	</div>
</div>
