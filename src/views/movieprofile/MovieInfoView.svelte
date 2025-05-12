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
	let watchlistItemId = null;

	// Check if this specific movie is in the user's watchlist
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
				// Look for a single record matching this user and movie
				const result = await pb.collection('watchlists').getList(1, 1, {
					filter: `userId = "${userId}" && movieId = "${movieId}"`
				});

				if (result.items.length > 0) {
					// In user's watchlist
					watchlistItemId = result.items[0].id;
					isInWatchlist = true;
				} else {
					// Not in watchlist
					watchlistItemId = null;
					isInWatchlist = false;
				}
			} catch (err) {
				console.error('Error checking watchlist status:', err);
				watchlistItemId = null;
				isInWatchlist = false;
			}
		} catch (err) {
			console.error('Error in watchlist check:', err);
			isInWatchlist = false;
		} finally {
			isLoading = false;
		}
	}

	// Toggle this movie in/out of the watchlist
	async function toggleWatchlist() {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to add movies to your watchlist');
			return;
		}

		isLoading = true;

		try {
			const userId = $authStore.user.id;

			if (isInWatchlist && watchlistItemId) {
				// Remove from watchlist by deleting the record
				await pb.collection('watchlists').delete(watchlistItemId);
				watchlistItemId = null;
				isInWatchlist = false;
				toast('Removed from Watchlist');
			} else {
				// Add to watchlist by creating a new record
				const newItem = await pb.collection('watchlists').create({
					userId: userId,
					movieId: movieId,
					notification: false // Default notification setting
				});

				watchlistItemId = newItem.id;
				isInWatchlist = true;
				toast.success('Added to Watchlist');
			}
		} catch (err) {
			console.error('Error updating watchlist:', err);
			toast.error('Failed to update watchlist');
		} finally {
			isLoading = false;
		}
	}

	// Update watchlist check when component mounts or when user/movie changes
	onMount(checkWatchlistStatus);

	// Re-check when movieId changes
	$: if (movieId) {
		checkWatchlistStatus();
	}

	// Re-check when auth state changes
	$: if ($authStore.isAuthenticated !== undefined) {
		checkWatchlistStatus();
	}
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
