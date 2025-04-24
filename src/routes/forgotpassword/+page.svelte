<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import EmailField from '$lib/customComponents/userauthen/EmailField.svelte';
  
	let email = "";
  </script>
  
  <Card.Root
	class="w-[527px] min-h-[650px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] px-[39px] pt-[68px] pb-[40px]"
	style="outline-offset: -3px"
  >
	<Card.Content class="inline-flex flex-col justify-start items-start gap-[27px] w-full h-full p-0">
	  <!-- Upper block (purple bar, title, email field, instructions, button) -->
	  <div class="flex flex-col justify-start items-start gap-[54px] h-[425px]">
		<!-- Title -->
		<div class="flex flex-row justify-start items-start gap-[15px]">
		  <div class="w-[4.25px] h-[37px] bg-[#A508FF] rounded-[2px]" ></div>
		  <div class="w-[287px] text-center text-[#46344E] text-[31.31px] font-[900] leading-none">
			Forgot Password
		  </div>
		</div>
  
		<!-- Email Field -->
		<div class="flex flex-col w-[449.04px] gap-[3.91px]">
		  <EmailField bind:value={email} />
		</div>
  
		<!-- Instructions -->
		<div class="text-[#5F1F73] text-[15.93px] font-[400] leading-[20px] tracking-[0.18px] w-full">
		  We will send a link to your email for password reset.
		  Please check your email for further action.
		</div>
  
		<!-- Button -->
		<div class="flex flex-col justify-start items-start gap-[30.62px] h-[115.15px]">
		  <Button
			class="w-[449.04px] h-[54.78px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] hover:bg-[rgba(128,43,177,1)] text-white text-[17.61px] font-[400] flex items-center justify-center transition-colors duration-200"
		  >
			Send Link
		  </Button>
		  <div class="w-[449px] h-[56px]" ></div>
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
  