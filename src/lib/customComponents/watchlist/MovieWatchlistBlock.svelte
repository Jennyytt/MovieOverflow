<!-- $lib/customComponents/watchlist/MovieWatchlistBlock.svelte -->
<script>
	import MovieCard from './MovieCard.svelte';
	import { Card } from '$lib/components/ui/card';
	import { createEventDispatcher } from 'svelte';

	// Receive movie details as props
	export let movies = [];

	// Create event dispatcher to bubble up events
	const dispatch = createEventDispatcher();

	// Handle item removal from MovieCard
	function handleItemRemoved(event) {
		dispatch('itemRemoved', event.detail);
	}
</script>

<Card
	class="relative box-border h-[419px] w-[1100px] overflow-hidden rounded-[10px] border-[#222222] bg-[#000000]"
>
	<div
		class="absolute left-[20px] top-1/2 flex -translate-y-1/2 flex-row items-baseline justify-start gap-2"
	>
		{#if movies.length === 0}
			<div class="p-4 text-white">Your watchlist is empty. Add some movies to get started!</div>
		{:else}
			{#each movies.slice(0, 5) as movie (movie.id)}
				<MovieCard
					title={movie.title || 'Unknown Title'}
					rating={movie.rating?.toString() || '0.0'}
					duration={movie.duration || 'N/A'}
					movieId={movie.id}
					watchlistId={null}
					posterURL={movie.posterURL}
					onremoved={handleItemRemoved}
				/>
			{/each}

			<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars -->
			{#each Array(Math.max(0, 5 - movies.length)) as _, i}
				<div class="h-[353px] w-[206px]"></div>
			{/each}
		{/if}
	</div>
</Card>
