<script>
	import { Card } from '$lib/components/ui/card';
	import { CircleUserRound } from '@lucide/svelte';
	export let username = 'User Name';
	export let reviewText = 'My review.';
	export let date = 'Feb 25, 2025';
	export let movieId = '0fk9578f58vl9s8'; // Default movie
	export let reviewId = 'ikz34445a9zk1r0'; // Default review
</script>

<Card
	class="relative box-border h-[285px] w-[346px] overflow-hidden rounded-[10px] border-[#222222] bg-[#222222]"
>
	<div class="absolute left-1/2 top-1/2 h-[256.13px] w-[297px] -translate-x-1/2 -translate-y-1/2">
		<!-- User icon and name -->
		<div class="absolute left-0 top-0 flex flex-row items-center justify-start gap-2">
			<div class="relative aspect-square h-[29px] w-[29px] flex-shrink-0">
				<CircleUserRound class="h-full w-full" color="#D1D7E0" />
			</div>
			<div class="text-left text-base font-bold leading-[44px] tracking-[-0.02em] text-white">
				{username}
			</div>
		</div>

		<!-- Review text -->
		<div class="absolute left-0 top-[53px] w-[297px] text-left text-base font-normal text-white">
			{reviewText}
		</div>

		<!-- Divider line -->
		<div
			class="absolute left-0 top-[226.13px] -mt-0.5 h-[2px] w-[297px] origin-top-left border-b-0 border-t-2 border-solid border-black"
		></div>

		<!-- Bottom section with date and "Full review" link -->
		<div
			class="absolute left-0 top-[237.13px] flex h-[19px] w-[297px] flex-row items-end justify-between"
		>
			<div class="text-left text-xs font-normal text-white">
				{date}
			</div>
			<div class="cursor-pointer text-left text-base font-semibold text-[#b693dc] underline">
				<a href={`/movieindividualreview/${movieId}/${reviewId}`}>Full review</a>
			</div>
		</div>
	</div>
</Card>
