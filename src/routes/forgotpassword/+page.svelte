<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import EmailField from '$lib/customComponents/userauthen/EmailField.svelte';

	let email = '';
</script>

<Card.Root
	class="min-h-[650px] w-[527px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] px-[39px] pb-[40px] pt-[68px]"
	style="outline-offset: -3px"
>
	<Card.Content class="inline-flex h-full w-full flex-col items-start justify-start gap-[27px] p-0">
		<!-- Upper block (purple bar, title, email field, instructions, button) -->
		<div class="flex h-[425px] flex-col items-start justify-start gap-[54px]">
			<!-- Title -->
			<div class="flex flex-row items-start justify-start gap-[15px]">
				<div class="h-[37px] w-[4.25px] rounded-[2px] bg-[#A508FF]"></div>
				<div class="w-[287px] text-center text-[31.31px] font-[900] leading-none text-[#46344E]">
					Forgot Password
				</div>
			</div>

			<!-- Email Field -->
			<div class="flex w-[449.04px] flex-col gap-[3.91px]">
				<EmailField bind:value={email} />
			</div>

			<!-- Instructions -->
			<div class="w-full text-[15.93px] font-[400] leading-[20px] tracking-[0.18px] text-[#5F1F73]">
				We will send a link to your email for password reset. Please check your email for further
				action.
			</div>

			<!-- Button -->
			<div class="flex h-[115.15px] flex-col items-start justify-start gap-[30.62px]">
				<Button
					class="flex h-[54.78px] w-[449.04px] items-center justify-center rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-[17.61px] font-[400] text-white transition-colors duration-200 hover:bg-[rgba(128,43,177,1)]"
				>
					Send Link
				</Button>
				<div class="h-[56px] w-[449px]"></div>
			</div>
		</div>

		<!-- Footer Text -->
		<div class="h-[26px] text-[15.65px] font-[400]">
			<span class="text-[#5F1F73]">Already have an account?</span>
			<span> </span>
			<a href="/login" class="text-[rgba(128,43,177,0.80)] underline">Log in</a>
		</div>
	</Card.Content>
</Card.Root>
