<script>
	import { Card } from '$lib/components/ui/card';
	import { CircleUserRound } from '@lucide/svelte';
	export let username = 'ABC_User';
	export let usertype = 'Pro User';
</script>

<Card
	class="relative box-border h-[150px] w-[1100px] overflow-hidden rounded-[10px] border-[#222222] bg-[#000000]"
>
	<div
		class="absolute left-[20px] top-1/2 flex -translate-y-1/2 flex-row items-baseline justify-start gap-2"
	>
		<!-- User Icon -->
		<div class="relative aspect-square h-[100px] w-[100px] flex-shrink-0">
			<CircleUserRound class="h-full w-full" color="#D1D7E0" />
		</div>

		<!-- Username -->
		<div class="text-left text-[36px] font-bold leading-[44px] tracking-[-0.02em] text-white">
			{username}
		</div>

		<!-- User Type -->
		<div class="text-left text-[24px] font-bold leading-[29px] tracking-[-0.02em] text-white">
			{usertype}
		</div>
	</div>
</Card>
