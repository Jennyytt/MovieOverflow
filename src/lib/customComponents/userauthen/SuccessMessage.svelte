<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	
  
	export let messages = [];
	export let title = "Successful";
  
	
  
	function goToLogin() {
	  window.location.href = "/login";
	}
  </script>
  
  <Card.Root
	class="relative w-[527px] min-h-[600px] rounded-[23.48px] border-[3px] border-[#ABBED1] bg-[#F8F8F8] pt-[75px] px-[42px] pb-[68px]"
	style="outline-offset: -3px"
  >
	
  
	<Card.Content class="flex flex-col gap-[25px] p-0 w-full">
	  <!-- Title Section -->
	  <div class="flex items-start gap-[8px]">
		<div class="w-[4.25px] h-[31.31px] bg-[#A508FF] rounded-[2px]"></div>
		<h1 class="text-[#46344E] text-[31.31px] font-black leading-none">
		  {title}
		</h1>
	  </div>
  
	  <div class="h-[80px]" ></div>
	  
	  <!-- Messages -->
	  <div class="w-[444px] text-[#5F1F73] text-[15px] leading-[24px] tracking-[0.15px]">
		{#each messages as msg}
		  <p>{msg}</p>
		{/each}
	  </div>
  
	  <!-- Spacer -->
	  <div class="h-[80px]" ></div>
  
	  <!-- Button -->
	  <div class="h-[55px]">
		<Button
		  onclick={goToLogin}
		  class="w-[449.04px] h-[54.78px] bg-[rgba(128,43,177,0.80)] rounded-[31.31px] relative overflow-hidden text-white text-[17.61px] font-[400]">
		  Log in
		</Button>
  
	  </div>
	</Card.Content>
  </Card.Root>