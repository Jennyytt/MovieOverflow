<script>
	import { Crown } from '@lucide/svelte';
	import pb from '$lib/pb';
	import { onMount } from 'svelte';

	// State for movies, loading, and error
	let topPicks = [];
	let loading = true;
	let error = null;

	// Fetch movies on component mount
	onMount(async () => {
		try {
			// Calculate the date 5 years ago from today
			const fiveYearsAgo = new Date();
			fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
			const filterDate = fiveYearsAgo.toISOString().split('T')[0];

			// Fetch movies from PocketBase
			const result = await pb.collection('movies').getList(1, 6, {
				filter: `releaseDate >= "${filterDate}"`,
				sort: '-rating' // Sort by rating in descending order
			});

			// Map the results to the desired format
			topPicks = result.items.map((movie) => ({
				id: movie.id,
				title: movie.title
			}));
		} catch (err) {
			error = 'Failed to load top picks. Please try again later.';
			console.error('Error fetching movies:', err);
		} finally {
			loading = false;
		}
	});
</script>

<div class="w-[299px] rounded-lg bg-[#1d1d1d] p-4">
	<!-- Title -->
	<div class="mb-6 flex items-center gap-2">
		<Crown color="#A508FF" size={30} />
		<div class="text-[22px] font-bold text-white">Top Picks</div>
	</div>
	<!-- Loading State -->
	{#if loading}
		<div class="text-center text-[#d1d7e0]">Loading...</div>
	{:else if error}
		<div class="text-center text-red-500">{error}</div>
	{:else}
		<!-- List -->
		<div class="flex flex-col gap-6">
			{#each topPicks as movie, i (movie.id)}
				<div>
					<div class="flex items-center gap-3">
						<!-- Ranking and Purple Line -->
						<div class="text-[22px] font-bold text-[#d1d7e0]">
							{i + 1}
						</div>
						<div class="h-[32px] w-[3px] rounded-[12px] bg-[#802BB1]"></div>
						<!-- Movie Title -->
						<div class="text-[20px] font-bold text-[#d1d7e0]">
							{movie.title}
						</div>
					</div>
					<!-- Divider Line (not on the last item) -->
					{#if i < topPicks.length - 1}
						<div class="mt-4 h-[1px] w-full bg-gray-600"></div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
