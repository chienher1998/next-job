<script>
  export let data;
  import humanize from 'humanize-plus';
</script>

<div class="mx-10 my-3">
<nav class="navbar flex justify-between items-center">
    <a href="/" class="btn btn-ghost normal-case text-xl">Next-Job</a>
    <div>
        <a href="/users/new" class="btn mx-10 ">Sign Up</a>
        <a href="/users/login" class="btn">Login</a>
    </div>
</nav>
<h1 class="text-center text-xl font-bold">Find Your Next Job</h1>

<div class="overflow-x-auto w-full ">
  {#each data.jobs as job}
      <div class="flex flex-col mt-10">
          <div>
            <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
              <div class="text-sm mt-1">
                  {job.employer} . {job.location} .
                  <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
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