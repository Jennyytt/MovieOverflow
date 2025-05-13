<script>
	import { ChevronRight } from 'radix-icons-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import Card from '$lib/components/ui/card/card.svelte';
	import pb from '$lib/pb';
	import MovieWatchlistCarosel from '$lib/customComponents/watchlist/MovieWatchlistCarosel.svelte';

	let movieDetails = [];
	let isLoading = true;
	let error = null;
	let isEmpty = false; // New state to track empty watchlist
	pb.autoCancellation(false);

	async function fetchWatchlist() {
		isLoading = true;
		error = null;
		isEmpty = false;

		try {
			if (!$authStore.isAuthenticated) {
				error = 'Please log in to view your watchlist';
				isLoading = false;
				return;
			}

			const userId = $authStore.user.id;

			let watchlistResult;
			try {
				watchlistResult = await pb
					.collection('watchlists')
					.getFirstListItem(`userId = "${userId}"`);
			} catch (err) {
				if (err.message.includes("The requested resource wasn't found")) {
					movieDetails = [];
					isEmpty = true; // Set empty state
					isLoading = false;
					return;
				}
				throw err;
			}

			if (!watchlistResult.movieId || watchlistResult.movieId.length === 0) {
				movieDetails = [];
				isEmpty = true; // Set empty state
				isLoading = false;
				return;
			}

			const moviePromises = watchlistResult.movieId.map(async (movieId) => {
				try {
					return await pb.collection('movies').getOne(movieId);
				} catch (err) {
					console.error(`Error fetching movie ${movieId}:`, err);
					return null;
				}
			});

			const fetchedMovies = await Promise.all(moviePromises);
			movieDetails = fetchedMovies.filter((movie) => movie !== null);

			isLoading = false;
		} catch (err) {
			error = err.message;
			isLoading = false;
		}
	}

	onMount(fetchWatchlist);

	async function handleItemRemoved(event) {
		const { movieId } = event.detail;

		try {
			const userId = $authStore.user.id;
			const watchlist = await pb.collection('watchlists').getFirstListItem(undefined, {
				filter: `userId = "${userId}"`,
				requestKey: 'getWatchlist'
			});

			const updatedMovieIds = watchlist.movieId.filter((id) => id !== movieId);

			await pb.collection('watchlists').update(watchlist.id, {
				movieId: updatedMovieIds
			});

			fetchWatchlist();
		} catch (err) {
			error = `Failed to remove movie: ${err.message}`;
		}
	}
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Watchlist</div>
			<Button
				variant="ghost"
				size="icon"
				class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
			>
				<ChevronRight class="relative h-[23px] w-[23px] flex-shrink-0 font-bold text-white" />
			</Button>
		</div>
	</div>

	{#if isLoading}
		<div class="text-white">Loading your watchlist...</div>
	{:else if error}
		<div class="text-red-500">{error}</div>
	{:else if isEmpty}
		<Card
			class="margin-top-[20px] box- relative flex h-[300px] w-[1100px] items-center justify-center overflow-hidden rounded-[10px] border-[#222222] bg-[#000000]"
		>
			<div class="text-white">Not yet anything to watchlist</div>
		</Card>
	{:else}
		<MovieWatchlistCarosel movies={movieDetails} onitemRemoved={handleItemRemoved} />
	{/if}
</div>
