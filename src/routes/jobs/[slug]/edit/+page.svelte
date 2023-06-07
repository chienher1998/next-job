<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getUserId, getTokenFromLocalStorage } from './../../../../utils/auth.js';
	import {statusSpinner} from '../../../../lib/component/spinner.js'
	import Spinner from '../../../../lib/component/spinner.svelte'
	import {showEditAlert, showWarning} from '../../../../utils/alert.js'
	let formErrors = {};
	export let data;

	if(getUserId() != data.job.user){
		alert('Please Log In')
		goto('../../../users/login')
	}

	function goSeeJob() {
		goto(`/jobs/${data.job.id}`);
	}

	async function editJob(evt) {
		statusSpinner.set(true)
		evt.preventDefault();
		formErrors = {}; // reset the formErrors
		if (evt.target['minAnnualCompensation'].value < 1000) {
			formErrors['minAnnualCompensation'] = { message: 'Must be larger than 1000.00' };
		}
		if (evt.target['maxAnnualCompensation'].value < 1000) {
			formErrors['maxAnnualCompensation'] = { message: 'Must be larger than 1000.00' };
		}
		if (evt.target['appinstruction'].value.length < 10) {
			formErrors['appinstruction'] = { message: 'Must have at least 10 characters' };
		}


		const userId = getUserId();
		const jobData = {
			user: userId,
			title: evt.target['title'].value,
			minAnnualCompensation: evt.target['minAnnualCompensation'].value,
			maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
			description: evt.target['description'].value,
			requirements: evt.target['requirement'].value,
			applicationInstructions: evt.target['appinstruction'].value,
			location: evt.target['location'].value,
			employer: evt.target['employer'].value
		};
		const resp = await fetch(
			PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
			{
				method: 'PATCH',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getTokenFromLocalStorage() // token given by backend server, to auth the user is logged in
				},
				body: JSON.stringify(jobData)
			}
		);
		if (resp.status == 200) {
			showWarning.set(false)
			statusSpinner.set(false)
			goSeeJob();
		} else {
			statusSpinner.set(false)
			showEditAlert()
		}
	}
</script>
<svelte:head>
	<title>Next Jobs | Edit Job</title>
</svelte:head>
<div class="mx-10 my-3">
	<div class="flex justify-center items-center mt-8">
		<form on:submit={editJob} class="w-3/4">
			<div class="form-control w-full">
				<label class="label" for="title">
					<span class="label-text">Job Title</span>
				</label>
				<input
					type="text"
					name="title"
					class="input input-bordered w-full input-info"
					bind:value={data.job.title}
					required
				/>
				{#if 'title' in formErrors}
					<label class="label" for="title">
						<span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
					</label>
				{/if}

				<label class="label" for="minAnnualCompensation">
					<span class="label-text">Min Annual Compensation</span>
				</label>

				<input
					type="number"
					name="minAnnualCompensation"
					placeholder="$ 40000"
					class="input input-bordered w-full input-info"
					bind:value={data.job.minAnnualCompensation}
					required
				/>

				<label class="label" for="minAnnualCompensation">
					<span class="label-text">USD</span>
					<span class="label-text">per annum</span>
				</label>

				{#if 'minAnnualCompensation' in formErrors}
					<label class="label" for="minAnnualCompensation">
						<span class="label-text-alt text-red-500"
							>{formErrors['minAnnualCompensation'].message}</span
						>
					</label>
				{/if}

				<label class="label" for="maxAnnualCompensation">
					<span class="label-text">Max Annual Compensation</span>
				</label>
				<input
					type="number"
					name="maxAnnualCompensation"
					placeholder="$ 250000"
					class="input input-bordered w-full input-info"
					bind:value={data.job.maxAnnualCompensation}
					required
				/>
				<label class="label" for="maxAnnualCompensation">
					<span class="label-text">USD</span>
					<span class="label-text">per annum</span>
				</label>
				{#if 'maxAnnualCompensation' in formErrors}
					<label class="label" for="maxAnnualCompensation">
						<span class="label-text-alt text-red-500"
							>{formErrors['maxAnnualCompensation'].message}</span
						>
					</label>
				{/if}

				<label class="label" for="employer">
					<span class="label-text">Employer</span>
				</label>
				<input
					type="text"
					name="employer"
					placeholder="eg: Ligma"
					class="input input-bordered w-full input-info"
					bind:value={data.job.employer}
					required
				/>
				{#if 'employer' in formErrors}
					<label class="label" for="employer">
						<span class="label-text-alt text-red-500">{formErrors['employer'].message}</span>
					</label>
				{/if}

				<label class="label" for="Job Location">
					<span class="label-text">Job Location</span>
				</label>
				<input
					type="text"
					name="location"
					placeholder="eg: Serdang"
					class="input input-bordered w-full input-info"
					bind:value={data.job.location}
					required
				/>
				{#if 'location' in formErrors}
					<label class="label" for="location">
						<span class="label-text-alt text-red-500">{formErrors['location'].message}</span>
					</label>
				{/if}

				<label class="label" for="description">
					<span class="label-text">Description</span>
				</label>
				<textarea
					type="text"
					name="description"
					placeholder=""
					class="textarea textarea-bordered w-full textarea-info"
					rows="10"
					bind:value={data.job.description}
					required
				/>
				{#if 'description' in formErrors}
					<label class="label" for="description">
						<span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
					</label>
				{/if}

				<label class="label" for="requirement">
					<span class="label-text">Requirement</span>
				</label>
				<textarea
					type="text"
					name="requirement"
					placeholder=""
					rows="5"
					class="textarea textarea-bordered w-full textarea-info"
					bind:value={data.job.requirements}
					required
				/>
				{#if 'requirement' in formErrors}
					<label class="label" for="requirement">
						<span class="label-text-alt text-red-500">{formErrors['requirement'].message}</span>
					</label>
				{/if}

				<label class="label" for="appinstruction">
					<span class="label-text">Application Instructions</span>
				</label>
				<textarea
					type="text"
					name="appinstruction"
					placeholder=""
					class="textarea textarea-bordered w-full h-32 textarea-info "
					bind:value={data.job.applicationInstructions}
					required
				/>
				{#if 'appinstruction' in formErrors}
					<label class="label" for="appinstruction">
						<span class="label-text-alt text-red-500">{formErrors['appinstruction'].message}</span>
					</label>
				{/if}

				<div class="form-control w-full mt-8 mb-28">
					<button class="btn btn-md btn-primary"><Spinner/>Update</button>
				</div>
			</div>
		</form>
	</div>
</div>
