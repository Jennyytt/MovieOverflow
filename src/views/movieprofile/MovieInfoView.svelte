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

			// Try to find the watchlist for this user
			const watchlist = await pb.collection('watchlists').getFirstListItem(`userId = "${userId}"`);

			// Check if this movie is in the watchlist
			isInWatchlist = watchlist.movieId.includes(movieId);
		} catch (err) {
			// If error is "no items found", it means user has no watchlist yet
			isInWatchlist = false;
			console.error('Error checking watchlist status:', err);
		} finally {
			isLoading = false;
		}
	}

	// Toggle watchlist state
	async function toggleWatchlist() {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to add movies to your watchlist');
			return;
		}

		try {
			const userId = $authStore.user.id;

			// Get existing watchlist or create new one
			let watchlist;
			try {
				watchlist = await pb.collection('watchlists').getFirstListItem(`userId = "${userId}"`);
			} catch {
				// No watchlist exists, create one
				watchlist = await pb.collection('watchlists').create({
					userId: userId,
					movieId: [],
					notification: true
				});
			}

			if (isInWatchlist) {
				// Remove from watchlist
				const updatedMovieIds = watchlist.movieId.filter((id) => id !== movieId);
				await pb.collection('watchlists').update(watchlist.id, {
					movieId: updatedMovieIds
				});
				toast('Removed from Watchlist');
				isInWatchlist = false;
			} else {
				// Add to watchlist
				if (!watchlist.movieId.includes(movieId)) {
					const updatedMovieIds = [...watchlist.movieId, movieId];
					await pb.collection('watchlists').update(watchlist.id, {
						movieId: updatedMovieIds
					});
				}
				toast.success('Added to Watchlist');
				isInWatchlist = true;
			}
		} catch (err) {
			toast.error('Failed to update watchlist');
			console.error('Error updating watchlist:', err);
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
