<script>
	import { Crown } from '@lucide/svelte';
	// Example movie titles (you can replace with real data later)
	let topPicks = [
		'Captain America 1',
		'Captain America 2',
		'Captain America 3',
		'Captain America 4',
		'Captain America 5'
	];
</script>

<div class="w-[299px] rounded-lg bg-[#2121214D] p-4">
	<!-- Title -->
	<div class="mb-6 flex items-center gap-2">
		<Crown color="#A508FF" size={30} />
		<div class="font-['Inter'] text-[22px] font-bold text-white">Top Picks</div>
	</div>
	<!-- List -->
	<div class="flex flex-col gap-6">
		{#each topPicks as movie, i (i)}
			<div>
				<div class="flex items-center gap-3">
					<!-- Ranking and Purple Line -->
					<div class="text-[22px] font-bold text-white">
						{i + 1}
					</div>
					<div class="h-[32px] w-[3px] rounded-[12px] bg-[#802BB1]"></div>
					<!-- Movie Title -->
					<div class="font-Inter text-[20px] font-bold text-white">
						{movie}
					</div>
				</div>
				<!-- Divider Line (not on the last item) -->
				{#if i < topPicks.length - 1}
					<div class="mt-4 h-[1px] w-full bg-gray-600"></div>
				{/if}
			</div>
		{/each}
	</div>
</div>
