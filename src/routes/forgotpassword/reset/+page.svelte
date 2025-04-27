<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import PasswordField from '$lib/customComponents/userauthen/PasswordField.svelte';
	import { goto } from '$app/navigation';

	let password = '';
	let confirmPassword = '';

	// Reactive mismatch check
	$: passwordsMismatch = confirmPassword && password !== confirmPassword;

	function handleSubmit() {
		if (!passwordsMismatch) {
			goto('/forgotpassword/success');
		}
	}
</script>

<!-- Centered Layout -->
<div class="flex min-h-screen items-center justify-center bg-black px-8 py-12">
	<Card.Root
		class="relative min-h-[600px] w-[527px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] px-[39px] pb-[68px] pt-[68px]"
		style="outline-offset: -3px"
	>
		<Card.Content class="flex flex-col gap-[15px] p-0">
			<!-- Title -->
			<div class="mb-[15px] flex items-start gap-[8px]">
				<div class="h-[37px] w-[5px] rounded-[2px] bg-[#A508FF]"></div>
				<h1 class="text-[31.31px] font-[900] leading-none text-[#46344E]">Forgot Password</h1>
			</div>

			<!-- Instructional Message -->
			<div class="text-[14px] leading-[1.5] text-[#802BB1]">
				<p>Your password has been successfully reset.</p>
				<p>Now please set a new password.</p>
			</div>

			<!-- Password Fields -->
			<div class="w-[449.04px]">
				<PasswordField
					bind:value={password}
					showConfirm={true}
					bind:confirmValue={confirmPassword}
					confirmErrorMessage={passwordsMismatch
						? 'Your password is not matched, please try again.'
						: ''}
				/>
			</div>

			<!-- Confirm Button -->
			<div class="flex h-[115.15px] flex-col items-start justify-start gap-[30.62px]">
				<Button
					onclick={handleSubmit}
					class="h-[54.78px] w-[449.04px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-[17.61px] font-[400] text-white"
				>
					Confirm
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
