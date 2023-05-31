<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getUserId } from '../../../utils/auth.js';
	let formErrors = {};

	function goSeeJob() {
		goto('/');
	}

	async function createJob(evt) {
		evt.preventDefault();

		if (evt.target['minAnnualCompensation'].value < 1000) {
			formErrors['minAnnualCompensation'] = { message: 'Must be larger than 1000.00' };
		}
		if (evt.target['maxAnnualCompensation'].value < 1000) {
			formErrors['maxAnnualCompensation'] = { message: 'Must be larger than 1000.00' };
		}
		if (evt.target['appinstruction'].value.length < 10) {
			formErrors['appinstruction'] = { message: 'Must have at least 10 characters' };
			return;
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

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jobData)
		});

		if (resp.status == 200) {
			goSeeJob();
		} else {
			throw 'Failed to create job';
		}
	}
</script>

<div class="mx-10 my-3">
	<div class="flex justify-center items-center mt-8">
		<form on:submit={createJob} class="w-3/4">
			<div class="form-control w-full">
				<label class="label" for="title">
					<span class="label-text">Job Title</span>
				</label>
				<input
					type="text"
					name="title"
					placeholder="Enter Job Title"
					class="input input-bordered w-full"
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
					class="input input-bordered w-full"
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
					class="input input-bordered w-full"
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
					class="input input-bordered w-full"
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
					class="input input-bordered w-full"
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
					rows= 10
					class="textarea textarea-bordered w-full "
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
					rows= 5
					class="textarea textarea-bordered w-full"
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
					class="textarea textarea-bordered w-full h-32"
					required
				/>
				{#if 'appinstruction' in formErrors}
					<label class="label" for="appinstruction">
						<span class="label-text-alt text-red-500">{formErrors['appinstruction'].message}</span>
					</label>
				{/if}

				<div class="form-control w-full mt-8 mb-28">
					<button class="btn btn-md btn-secondary">Post Job</button>
				</div>
			</div>
		</form>
	</div>
</div>
