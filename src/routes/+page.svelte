<script>
	export let data;
	import humanize from 'humanize-plus';
</script>
<svelte:head>
	<title>Next Jobs | Home Page</title>
</svelte:head>

<div class="container mx-auto">
	<div class="prose text-center mx-auto">
		<h1 class="mb-5 text-xl">Find Your Next Job</h1>
	</div>
	<div class="mx-auto overflow-x-auto max-w-8xl">
		{#each data.jobs as job}
			<div class="flex flex-col mt-5 mx-10 bg-neutral rounded-box p-2 scale-95 hover:scale-100 ease-in duration-200">
				<a href="/jobs/{job.id}">
					<div class="m-5">
						<a class="font-bold text-2xl text-accent" href="/jobs/{job.id}">{job.title}</a>
						<div class="text-sm mt-1">
							{job.employer} . {job.location} .
							<span class="text-s-m"
								>USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
									job.maxAnnualCompensation
								)}</span
							>
						</div>
						<div class="italic text-xs opacity-50 mt-2">
							posted {new Date(job.created).toLocaleDateString(undefined, {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
					</div>

					<div class="mt-4 m-5">
						{job.description.slice(0, 240)}...
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
