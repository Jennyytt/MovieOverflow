<script>
	import logoBig from '../../../src/assets/MOicon-large.png';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import PasswordField from '$lib/customComponents/userauthen/PasswordField.svelte';
	import EmailField from '$lib/customComponents/userauthen/EmailField.svelte';
	import pb from '$lib/pb'; 
	import { goto } from '$app/navigation';

	
	pb.collection('users') //check whether the database is connected successfully
  .getList(1, 1) // fetch the first user (or empty list)
  .then((res) => console.log('PocketBase connected:', res))
  .catch((err) => console.error(' PocketBase connection error:', err));


	let email = '';
	let username = '';
	let password = '';
	let confirmPassword = '';
	let usernameError = '';
	let emailError = '';     
    let passwordError = '';  
    

	async function handleSubmit() {
  emailError = '';
  usernameError = '';
  passwordError = '';

  if (!email || !username || !password || !confirmPassword) {
    if (!email) emailError = 'Email is required.';
    if (!username) usernameError = 'Username is required.';
    if (!password) passwordError = 'Password is required.';
    if (!confirmPassword) passwordError = 'Please confirm your password.';
    return;
  }

  if (passwordsMismatch()) {
    passwordError = 'Passwords do not match.';
    return;
  }

  try {
    //  1. Run both username and email checks at the same time (in parallel)
    const [usernameCheck, emailCheck] = await Promise.allSettled([
      pb.collection('users').getFirstListItem(`username="${username}"`),
      pb.collection('users').getFirstListItem(`email="${email}"`)
    ]);

    //  2. Handle username check result
    if (usernameCheck.status === 'fulfilled') {
      usernameError = 'This username is already taken.';
    } else if (usernameCheck.status === 'rejected' && usernameCheck.reason.status !== 404) {
      console.error('Unexpected error checking username:', usernameCheck.reason);
      usernameError = 'Error checking username.';
      return;
    }

    //  3. Handle email check result
    if (emailCheck.status === 'fulfilled') {
      emailError = 'This email is already registered.';
    } else if (emailCheck.status === 'rejected' && emailCheck.reason.status !== 404) {
      console.error('Unexpected error checking email:', emailCheck.reason);
      emailError = 'Error checking email.';
      return;
    }

    // If any errors, stop here
    if (usernameError || emailError) return;

    //  4. Create the user if all checks pass
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: confirmPassword,
      username,
      emailVisibility: true,
    });

    console.log('User created:', user);
	goto('/signup/success')
    // (Optional) Redirect to dashboard

  } catch (error) {
    console.error('Signup failed:', error);

    if (error.response?.data?.email) {
      emailError = error.response.data.email.message || 'Invalid email.';
    }
    if (error.response?.data?.username) {
      usernameError = error.response.data.username.message || 'Invalid username.';
    }
    if (error.response?.data?.password) {
      passwordError = error.response.data.password.message || 'Invalid password.';
    }
  }
}



	/* function handleSubmit() {
		usernameError = '';

		// Example validation logic
		if (username.trim().toLowerCase() === 'takenusername') {
			usernameError = 'Your username is already used.';
		}

		if (!usernameError && !passwordsMismatch()) {
			alert('Account created!');
		}
	} */

	function passwordsMismatch() {
		return confirmPassword && password !== confirmPassword;
	}
</script>

<!-- Full page layout -->
<div class="flex min-h-screen items-center justify-center gap-[34px] bg-black px-8 py-12">
	<!-- Logo Section -->
	<div class="flex flex-col items-start">
		<img src={logoBig} alt="MovieOverflow logo" class="h-[148px] w-[401px]" />
	</div>

	<!-- Sign-Up Box -->
	<Card.Root
		class="relative min-h-[763px] w-[619px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] px-[84.4px] pb-[64.8px] pt-[65px]"
		style="outline-offset: -3px"
	>
		<!-- Title Section -->
		<div class="mb-[15px] flex items-start gap-[10px]">
			<div class="h-[34.36px] w-[5px] rounded-[2px] bg-[#A508FF]"></div>
			<h1 class="text-[31.31px] font-[900] leading-none text-[#46344E]">
				Welcome to MovieOverflow
			</h1>
		</div>

		<Card.Content class="flex w-[451px] flex-col gap-[15px] p-0">
			<!-- Email Field -->
			<EmailField bind:value={email} />
			{#if emailError}
			<p class="text-[13.7px] font-[400] text-[#EE1D52]">{emailError}</p>
			{/if}


			<!-- Username -->
			<div class="flex w-full flex-col">
				<span class="mb-[3.91px] text-[15.65px] font-[400] text-[#5F1F73]">Username</span>
				<Input
					bind:value={username}
					type="text"
					placeholder="Enter your username"
					class="h-[54.78px] rounded-[11.74px] border border-[rgba(102,102,102,0.35)] px-[23.48px] text-[15.65px] font-[400] placeholder:text-[rgba(102,102,102,0.60)]"
				/>
				{#if usernameError}
					<p class="text-[13.7px] font-[400] text-[#EE1D52]">{usernameError}</p>
				{/if}
			</div>

			<!-- Password Field -->
			<PasswordField bind:value={password} showConfirm={true} bind:confirmValue={confirmPassword} />

			<!-- Create Account Button -->
			<div class="flex h-[115.15px] flex-col items-start justify-start gap-[30.62px]">
				<Button
					onclick={handleSubmit}
					class="flex h-[54.78px] w-full items-center justify-center rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-center text-[17.61px] font-[400] text-white"
				>
					Create Account
				</Button>
			</div>

			<!-- Footer -->
			<div class="text-[15.65px] font-[400] text-[#333333]">
				Already have an account?
				<a href="/login" class="font-[700] text-[#111111] underline"> Log in </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
