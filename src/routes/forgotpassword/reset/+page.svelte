<script>
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import PasswordField from "$lib/customComponents/userauthen/PasswordField.svelte";
  
	let password = "";
	let confirmPassword = "";
  
	// Reactive mismatch check
	$: passwordsMismatch = confirmPassword && password !== confirmPassword;
  </script>
  
  <!-- Centered Layout -->
  <div class="flex min-h-screen items-center justify-center bg-black px-8 py-12">
	<Card.Root
	  class="relative w-[527px] min-h-[600px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] pt-[68px] pb-[68px] px-[39px]"
	  style="outline-offset: -3px"
	>
	  <Card.Content class="flex flex-col gap-[15px] p-0">
		<!-- Title -->
		<div class="mb-[15px] flex items-start gap-[8px]">
		  <div class="w-[5px] h-[37px] bg-[#A508FF] rounded-[2px]" />
		  <h1 class="text-[#46344E] text-[31.31px] font-[900] leading-none">Forgot Password</h1>
		</div>
  
		<!-- Instructional Message -->
		<div class="text-[14px] text-[#802BB1] leading-[1.5]">
		  <p>Your password has been successfully reset.</p>
		  <p>Now please set a new password.</p>
		</div>
  
		<!-- Password Fields -->
		<div class="w-[449.04px]">
		  <PasswordField
			bind:value={password}
			showConfirm={true}
			bind:confirmValue={confirmPassword}
			confirmErrorMessage={passwordsMismatch ? "Your password is not matched, please try again." : ""}
		  />
		</div>
  
		<!-- Confirm Button -->
		<div class="h-[115.15px] flex flex-col justify-start items-start gap-[30.62px]">
		  <Button
			class="w-[449.04px] h-[54.78px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-white text-[17.61px] font-[400]"
		  >
			Confirm
		  </Button>
		</div>
	  </Card.Content>
	</Card.Root>
  </div>
  