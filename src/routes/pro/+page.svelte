<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { X } from '@lucide/svelte'; // Close icon, optional

	let licenseKey = '';
	let errorMessage = '';

	function handleConfirm() {
		if (licenseKey.trim() !== '123456789') {
			errorMessage = 'Your key is invalid, please re-enter.';
		} else {
			errorMessage = '';
			alert('License confirmed!');
		}
	}

	function handleClose() {
		history.back(); //go back to previous page
	}
</script>

<!-- License Box -->
<div
	class="relative mx-auto my-10 w-[527px] rounded-[23.48px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] px-[38px] pb-[68px] pt-[100px]"
	style="outline-offset: -3px"
>
	<!-- Close Button -->
	<button
		onclick={handleClose}
		class="absolute right-[26px] top-[29px] text-gray-600 hover:text-gray-800"
		aria-label="Close"
	>
		<X class="h-[23.48px] w-[23.48px]" />
	</button>

	<!-- Inner layout -->
	<div class="flex w-[449px] flex-col gap-[85px]">
		<div class="flex flex-col gap-[60px]">
			<!-- Heading -->
			<div class="flex items-start gap-[10px]">
				<div class="h-[37px] w-[5px] rounded-[2px]" style="background: #A508FF;"></div>
				<h1 class=" text-[31.31px] font-black text-[#46344E]">License</h1>
			</div>

			<!-- Input section -->
			<div class="flex flex-col gap-[3.91px]">
				<label for="license-input" class="text-[15.65px] text-[#5F1F73]">
					Please enter your license number
				</label>

				<Input
					id="license-input"
					type="text"
					bind:value={licenseKey}
					placeholder="Enter your 9-digit key."
					class="h-[54.78px] rounded-[11.74px] border border-gray-300 placeholder:text-gray-400"
				/>

				{#if errorMessage}
					<p class="text-[13.7px] text-[#EE1D52]">
						{errorMessage}
					</p>
				{/if}
			</div>

			<!-- Confirm Button -->
			<Button
				type="button"
				class="h-[54.78px] w-full rounded-[31.31px] bg-[#802BB1]/80 text-[17.61px]"
				onclick={handleConfirm}
			>
				Confirm
			</Button>
		</div>

		<!-- Help link -->
		<div class="text-[15.65px] text-[#5F1F73]">How to get your license key?</div>
	</div>
</div>
