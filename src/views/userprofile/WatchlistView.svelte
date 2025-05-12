<script>
	import MovieWatchlistBlock from '$lib/customComponents/watchlist/MovieWatchlistBlock.svelte';
	import { ChevronRight } from 'radix-icons-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import pb from '$lib/pb';

	// let watchlistItems = [];
	let movieDetails = [];
	let isLoading = true;
	let error = null;

	// Function to fetch user's watchlist and associated movie details
	async function fetchWatchlist() {
		isLoading = true;
		error = null;

		try {
			// Check if the user is authenticated
			if (!$authStore.isAuthenticated) {
				error = 'Please log in to view your watchlist';
				isLoading = false;
				console.error('User is not authenticated.');
				return;
			}

			// Get user ID from auth store
			const userId = $authStore.user.id;

			// Fetch watchlist record for this user
			const watchlistResult = await pb
				.collection('watchlists')
				.getFirstListItem(`userId = "${userId}"`);

			// Store the watchlist record
			// watchlistItems = watchlistResult;

			// Check if the watchlist has movie IDs
			if (!watchlistResult.movieId || watchlistResult.movieId.length === 0) {
				movieDetails = [];
				isLoading = false;
				return;
			}

			// Fetch details for each movie in the watchlist
			const moviePromises = watchlistResult.movieId.map(async (movieId) => {
				try {
					const movie = await pb.collection('movies').getOne(movieId);
					return movie;
				} catch (err) {
					console.error(`Error fetching movie ${movieId}:`, err);
					return null;
				}
			});

			// Wait for all movie details to be fetched
			const fetchedMovies = await Promise.all(moviePromises);

			// Filter out any failed fetches
			movieDetails = fetchedMovies.filter((movie) => movie !== null);

			isLoading = false;
		} catch (err) {
			error = err.message;
			console.error('Error fetching watchlist:', err);
			isLoading = false;
		}
	}

	// Fetch watchlist on component mount
	onMount(fetchWatchlist);

	// Handle watchlist item removal
	async function handleItemRemoved(event) {
		const { movieId } = event.detail;

		try {
			// Get the current watchlist
			const userId = $authStore.user.id;
			const watchlist = await pb.collection('watchlists').getFirstListItem(`userId = "${userId}"`);

			// Remove the movie ID from the array
			const updatedMovieIds = watchlist.movieId.filter((id) => id !== movieId);

			// Update the watchlist record
			await pb.collection('watchlists').update(watchlist.id, {
				movieId: updatedMovieIds
			});

			// Refresh the watchlist
			fetchWatchlist();
		} catch (err) {
			error = `Failed to remove movie: ${err.message}`;
			console.error(error);
		}
	}

	// Navigate to full watchlist
	function viewAllWatchlist() {
		window.location.href = '/watchlist';
	}
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Watchlist</div>
			<Button
				variant="ghost"
				size="icon"
				class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
				onclick={viewAllWatchlist}
			>
				<ChevronRight class="relative h-[23px] w-[23px] flex-shrink-0 font-bold text-white" />
			</Button>
		</div>
	</div>

	{#if isLoading}
		<div class="text-white">Loading your watchlist...</div>
	{:else if error}
		<div class="text-red-500">{error}</div>
	{:else}
		<MovieWatchlistBlock movies={movieDetails} onitemRemoved={handleItemRemoved} />
	{/if}
</div>
