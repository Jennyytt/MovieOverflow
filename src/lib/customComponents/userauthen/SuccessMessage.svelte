<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	export let messages = [];
	export let title = 'Successful';

	function goToLogin() {
		window.location.href = '/login';
	}
</script>

<Card.Root
	class="relative min-h-[600px] w-[527px] rounded-[23.48px] border-[3px] border-[#ABBED1] bg-[#F8F8F8] px-[42px] pb-[68px] pt-[75px]"
	style="outline-offset: -3px"
>
	<Card.Content class="flex w-full flex-col gap-[25px] p-0">
		<!-- Title Section -->
		<div class="flex items-start gap-[8px]">
			<div class="h-[31.31px] w-[4.25px] rounded-[2px] bg-[#A508FF]"></div>
			<h1 class="text-[31.31px] font-black leading-none text-[#46344E]">
				{title}
			</h1>
		</div>

		<div class="h-[80px]"></div>

		<!-- Messages -->
		<div class="w-[444px] text-[15px] leading-[24px] tracking-[0.15px] text-[#5F1F73]">
			{#each messages as msg}
				<p>{msg}</p>
			{/each}
		</div>

		<!-- Spacer -->
		<div class="h-[80px]"></div>

		<!-- Button -->
		<div class="h-[55px]">
			<Button
				onclick={goToLogin}
				class="relative h-[54.78px] w-[449.04px] overflow-hidden rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-[17.61px] font-[400] text-white"
			>
				Log in
			</Button>
		</div>
	</Card.Content>
</Card.Root>
