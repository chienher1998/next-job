<script>
  export let data;
  import humanize from 'humanize-plus';
</script>

<div class="mx-10 my-3">
<h1 class="text-center text-xl font-bold">Find Your Next Job</h1>

<div class="overflow-x-auto w-full ">
  {#each data.jobs as job}
      <div class="flex flex-col mt-10">
          <div>
            <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
              <div class="text-sm mt-1">
                  {job.employer} . {job.location} .
                  <span class="text-s-m">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
              </div>
              <div class="italic text-xs opacity-50 mt-2"
                  >posted {new Date(job.created).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                  })}</div
              >
          </div>

          <div class="mt-4 ">
              {job.description.slice(0, 240)}...
          </div>
      </div>
  {/each}
</div>
</div>