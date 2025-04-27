<script>
	import MovieDetails from '$lib/customComponents/movieprofile/MovieDetailedInfo.svelte';
	import MovieTopInfo from '$lib/customComponents/movieprofile/MovieTopInfo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Check } from 'radix-icons-svelte';
	import { Toaster, toast } from 'svelte-sonner';

	// State to track if movie is in watchlist
	let isInWatchlist = false;

	// Function to toggle watchlist state
	function toggleWatchlist() {
		if (isInWatchlist) {
			// Remove from watchlist
			toast('Removed from Watchlist');
			isInWatchlist = false;
		} else {
			// Add to watchlist
			toast.success('Added to Watchlist');
			isInWatchlist = true;
		}
	}
</script>

<div>
	<MovieTopInfo />
	<br />
	<Toaster />
	<Button
		onclick={toggleWatchlist}
		class="flex h-[42px] w-[227px] items-center justify-center gap-3 rounded-[20px] px-8 py-[11px]"
	>
		{#if isInWatchlist}
			<Check class="h-5 w-5" />
			<span class="text-left text-base font-bold">In Watchlist</span>
		{:else}
			<Plus class="h-5 w-5" />
			<span class="text-left text-base font-bold">Add to Watchlist</span>
		{/if}
	</Button>
	<br />
	<MovieDetails />
</div>
