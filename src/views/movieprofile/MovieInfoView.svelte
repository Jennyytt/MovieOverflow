<!-- /views/movieprofile/MovieInfoView.svelte -->
<script>
	import MovieDetails from '$lib/customComponents/movieprofile/MovieDetailedInfo.svelte';
	import MovieTopInfo from '$lib/customComponents/movieprofile/MovieTopInfo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Check } from 'radix-icons-svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import pb from '$lib/pb';

	// Props for movie data
	export let movie;
	export let movieId;

	// State to track if movie is in watchlist
	let isInWatchlist = false;
	let isLoading = true;
	let watchlistId = null;

	// Check if movie is in user's watchlist
	async function checkWatchlistStatus() {
		isLoading = true;

		try {
			if (!$authStore.isAuthenticated) {
				isInWatchlist = false;
				isLoading = false;
				return;
			}

			const userId = $authStore.user.id;

			try {
				// Try to find the watchlist for this user
				const result = await pb.collection('watchlists').getList(1, 1, {
					filter: `userId = "${userId}"`
				});

				if (result.items.length > 0) {
					const watchlist = result.items[0];
					watchlistId = watchlist.id;

					// Check if movieId is an array
					if (Array.isArray(watchlist.movieId)) {
						isInWatchlist = watchlist.movieId.includes(movieId);
					} else if (watchlist.movieId) {
						// Handle case where it might not be an array
						isInWatchlist = watchlist.movieId === movieId;
					} else {
						isInWatchlist = false;
					}
				} else {
					// No watchlist found
					isInWatchlist = false;
					watchlistId = null;
				}
			} catch (err) {
				console.error('Error in getList:', err);
				isInWatchlist = false;
				watchlistId = null;
			}
		} catch (err) {
			isInWatchlist = false;
			console.error('Error checking watchlist status:', err);
		} finally {
			isLoading = false;
		}
	}

	async function toggleWatchlist() {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to add movies to your watchlist');
			return;
		}

		isLoading = true;

		try {
			const userId = $authStore.user.id;

			// If watchlist record already exist
			if (watchlistId) {
				// Get the current watchlist
				const currentWatchlist = await pb.collection('watchlists').getOne(watchlistId);
				let movieIds = Array.isArray(currentWatchlist.movieId)
					? [...currentWatchlist.movieId]
					: currentWatchlist.movieId
						? [currentWatchlist.movieId]
						: [];

				if (isInWatchlist) {
					// Remove movie from watchlist
					movieIds = movieIds.filter((id) => id !== movieId);

					// Check if this is the last movie
					if (movieIds.length === 0) {
						// If yes, delete the entire watchlist record
						await pb.collection('watchlists').delete(watchlistId);
						watchlistId = null;
					} else {
						// Only update the existing record
						await pb.collection('watchlists').update(watchlistId, {
							movieId: movieIds
						});
					}
					toast('Removed from Watchlist');
					isInWatchlist = false;
				} else {
					// Add movie to watchlist
					if (!movieIds.includes(movieId)) {
						movieIds.push(movieId);
						await pb.collection('watchlists').update(watchlistId, {
							movieId: movieIds
						});
					}
					toast.success('Added to Watchlist');
					isInWatchlist = true;
				}
			} else {
				// Watchlist record not yet created
				// Create a new watchlist record with this movie
				const newWatchlist = await pb.collection('watchlists').create({
					userId: userId,
					movieId: [movieId], // Start with an array containing this movie
					notification: true
				});

				watchlistId = newWatchlist.id;
				isInWatchlist = true;
				toast.success('Added to Watchlist');
			}
		} catch (err) {
			console.error('Error updating watchlist:', err);
			toast.error('Failed to update watchlist');
			if (err.response) {
				console.error('Response data:', err.response.data);
			}
		} finally {
			isLoading = false;
		}
	}

	// Check watchlist status on mount
	onMount(checkWatchlistStatus);
</script>

<div>
	<MovieTopInfo
		title={movie.title}
		year={movie.release_year?.toString() || ''}
		rating={movie.certification || ''}
		duration={movie.duration || ''}
		score={movie.rating?.toString() || '0'}
		posterURL={movie.posterURL}
		trailerVideoId={movie.trailerURL ? new URL(movie.trailerURL).searchParams.get('v') : ''}
	/>
	<br />
	<Toaster />
	<Button
		onclick={toggleWatchlist}
		class="flex h-[42px] w-[227px] items-center justify-center gap-3 rounded-[20px] px-8 py-[11px]"
		disabled={isLoading}
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
	<MovieDetails {movie} />
</div>
