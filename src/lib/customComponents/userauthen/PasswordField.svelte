<script>
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from '@lucide/svelte';

	export let label = 'Password';
	export let placeholder = 'Enter your password';
	export let value = '';
	export let errorMessage = '';

	export let showConfirm = false;
	export let confirmValue = '';
	export let confirmPlaceholder = 'Re-enter your password';
	export let confirmErrorMessage = '';

	let showPassword = false;
	let showConfirmPassword = false;

	const toggle = (field) =>
		field === 'main'
			? (showPassword = !showPassword)
			: (showConfirmPassword = !showConfirmPassword);

	$: confirmError =
		showConfirm && confirmValue && value !== confirmValue ? 'Passwords do not match' : '';
</script>

<!-- 🔐 Password Field -->
<div class="flex w-full flex-col">
	<span class="mb-[3.91px] text-[15.65px] font-[400] text-[#5F1F73]">{label}</span>

	<div class="relative w-full">
		<Input
			type={showPassword ? 'text' : 'password'}
			bind:value
			{placeholder}
			class="h-[54.78px] w-full rounded-[11.74px] border border-[rgba(102,102,102,0.35)]
			   px-[23.48px] pr-[48px] text-[15.65px] font-[400]
			   text-[#5F1F73] placeholder:text-[rgba(102,102,102,0.60)]"
		/>
		<button
			type="button"
			class="absolute right-[15px] top-[15.28px] h-[23.48px] w-[23.48px] cursor-pointer text-gray-500"
			onclick={() => toggle('main')}
			aria-label="Toggle password visibility"
		>
			{#if showPassword}
				<Eye class="h-full w-full" />
			{:else}
				<EyeOff class="h-full w-full" />
			{/if}
		</button>
	</div>

	{#if errorMessage}
		<p class="mt-1 text-[13.7px] font-[400] text-[#EE1D52]">{errorMessage}</p>
	{/if}
</div>

<!-- 🔁 Confirm Password Field -->
{#if showConfirm}
	<div class="mt-4 flex w-full flex-col">
		<span class="mb-[3.91px] text-[15.65px] font-[400] text-[#5F1F73]">Confirm Password</span>

		<div class="relative w-full">
			<Input
				type={showConfirmPassword ? 'text' : 'password'}
				bind:value={confirmValue}
				placeholder={confirmPlaceholder}
				class="h-[54.78px] w-full rounded-[11.74px] border border-[rgba(102,102,102,0.35)]
				 px-[23.48px] pr-[48px] text-[15.65px] font-[400]
				 text-[#5F1F73] placeholder:text-[rgba(102,102,102,0.60)]"
			/>
			<button
				type="button"
				class="absolute right-[15px] top-[15.28px] h-[23.48px] w-[23.48px] cursor-pointer text-gray-500"
				onclick={() => toggle('confirm')}
				aria-label="Toggle confirm password visibility"
			>
				{#if showConfirmPassword}
					<Eye class="h-full w-full" />
				{:else}
					<EyeOff class="h-full w-full" />
				{/if}
			</button>
		</div>

		{#if confirmErrorMessage || confirmError}
			<p class="mt-1 text-[13.7px] font-[400] text-[#EE1D52]">
				{confirmErrorMessage || confirmError}
			</p>
		{/if}
	</div>
{/if}
