<script>
	import logoBig from '../../../src/assets/MOicon-large.png';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import EmailField from '$lib/customComponents/userauthen/EmailField.svelte';
	import PasswordField from '$lib/customComponents/userauthen/PasswordField.svelte';
	import pb from '$lib/pb';
	import { goto } from '$app/navigation';


	let email = '';
	let password = '';
	let emailError = '';
	let passwordError = '';

	async function handleSubmit() {
    // Reset previous errors
    emailError = '';
    passwordError = '';

    try {
        // Attempt login via PocketBase
        const authData = await pb.collection('users').authWithPassword(email.trim(), password);

        // If login is successful
        alert('Login successful!');
        console.log('Logged in user:', authData.record);
		await goto('/');
    } catch (error) {
        console.error(error);

        // Check if error is about email not found
        if (error.response?.data?.email) {
            emailError = 'Your account is not found.';
        } else if (error.response?.data?.password) {
            passwordError = 'Incorrect password.';
        } else {
            // Generic error fallback
            emailError = 'Login failed. Please try again.';
        }
    }
}

</script>

<!-- Full page layout: horizontally align logo + login box -->
<div class="flex min-h-screen items-center justify-center gap-[34px] bg-black px-8 py-12">
	<!-- Logo Section -->
	<div class="flex flex-col items-start">
		<img src={logoBig} alt="MovieOverflow logo" class="h-[148px] w-[401px]" />
	</div>

	<!-- Login Section -->
	<Card.Root
		class="relative h-[600px] w-[527px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] pb-[68px] pl-[39px] pr-[38px] pt-[68px]"
		style="outline-offset: -3px"
	>
		<div class="mb-[15px] flex items-start gap-[8px]">
			<div class="h-[37px] w-[5px] rounded-[2px] bg-[#A508FF]"></div>
			<h1 class="text-[31.31px] font-[900] leading-none text-[#46344E]">Log in</h1>
		</div>

		<Card.Content class="flex flex-col gap-[15px] p-0">
			<!-- Reusable Email Field -->
			<div class="w-[449.04px]">
				<EmailField bind:value={email} errorMessage={emailError} />
			</div>

			<!--  Reusable Password Field (no confirm) -->
			<div class="w-[449.04px]">
				<PasswordField bind:value={password} showConfirm={false} errorMessage={passwordError} />
			</div>

			<!-- Forgot Password -->
			<div class="flex w-[449.56px] justify-end">
				<a href="/forgotpassword" class="text-[14.7px] text-[rgba(51,51,51,0.80)]"
					>Forgot Password</a
				>
			</div>

			<!-- Login Button -->
			<div class="flex h-[115.15px] flex-col items-start justify-start gap-[30.62px]">
				<Button
					onclick={handleSubmit}
					class="h-[54.78px] w-[449.04px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-[17.61px] font-[400] text-white"
				>
					Log in
				</Button>
			</div>

			<!-- Sign Up -->
			<div class="text-[15.65px] text-black">
				Don’t have an account?
				<a href="/signup" class="text-[#5F1F73] underline">Sign Up</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
