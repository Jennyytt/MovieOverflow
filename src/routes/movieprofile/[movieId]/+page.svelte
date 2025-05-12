<!-- /routes/movieprofile/[movieId]/+page.svelte -->
<script>
	import MovieInfoView from '../../../views/movieprofile/MovieInfoView.svelte';
	import ReviewCarouselView from '../../../views/movieprofile/ReviewCarouselView.svelte';
	import CommentCarouselView from '../../../views/movieprofile/CommentCarouselView.svelte';
	import MyRatingView from '../../../views/movieprofile/MyRatingView.svelte';
	import WatchOtherMoviesView from '../../../views/movieprofile/WatchOtherMoviesView.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { onMount, onDestroy } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import pb from '$lib/pb';

	// Get data from the load function using Svelte 5 syntax
	const { data } = $props();

	// States for movie interactions
	let isInWatchlist = $state(false);
	let hasNotification = $state(false);
	let userRating = $state(0);
	let lastSubmittedRating = $state(0);
	let isLoading = $state(true);
	let watchlistItemId = $state(null);
	let ratingId = $state(null);
	let ratingCommentId = $state(null);

	// For handling request cancellation
	let abortControllers = {};

	// Update checkMovieStatus function
	async function checkMovieStatus() {
		isLoading = true;

		// Cancel any previous request
		if (abortControllers.checkStatus) {
			abortControllers.checkStatus.abort();
		}
		abortControllers.checkStatus = new AbortController();

		try {
			if (!$authStore.isAuthenticated) {
				// Reset all user-specific states when not authenticated
				isInWatchlist = false;
				hasNotification = false;
				userRating = 0;
				lastSubmittedRating = 0;
				watchlistItemId = null;
				ratingId = null;
				ratingCommentId = null;
				isLoading = false;
				return;
			}

			const userId = $authStore.user.id;
			const movieId = data.movieId;

			// Check watchlist status
			try {
				const watchlistResult = await pb.collection('watchlists').getList(1, 1, {
					filter: `userId = "${userId}" && movieId = "${movieId}"`,
					$autoCancel: false // Prevent auto-cancellation
				});

				if (watchlistResult.items.length > 0) {
					const watchlistItem = watchlistResult.items[0];
					watchlistItemId = watchlistItem.id;
					isInWatchlist = true;
					hasNotification = watchlistItem.notification || false;
				} else {
					watchlistItemId = null;
					isInWatchlist = false;
					hasNotification = false;
				}
			} catch (err) {
				console.error('Error checking watchlist status:', err);
				watchlistItemId = null;
				isInWatchlist = false;
				hasNotification = false;
			}

			// First check for ratings with comments
			try {
				const commentRatingResult = await pb.collection('ratings_comments').getList(1, 1, {
					filter: `userId = "${userId}" && movieId = "${movieId}"`,
					$autoCancel: false // Prevent auto-cancellation
				});

				if (commentRatingResult.items.length > 0) {
					const commentRatingItem = commentRatingResult.items[0];
					ratingCommentId = commentRatingItem.id;
					userRating = commentRatingItem.rating || 0;
					lastSubmittedRating = userRating;

					// Found a rating with comment, don't need to check regular ratings
					ratingId = null;
				} else {
					// No comment rating, check for regular rating
					ratingCommentId = null;

					const ratingResult = await pb.collection('ratings').getList(1, 1, {
						filter: `userId = "${userId}" && movieId = "${movieId}"`,
						$autoCancel: false // Prevent auto-cancellation
					});

					if (ratingResult.items.length > 0) {
						const ratingItem = ratingResult.items[0];
						ratingId = ratingItem.id;
						userRating = ratingItem.rating || 0;
						lastSubmittedRating = userRating;
					} else {
						ratingId = null;
						userRating = 0;
						lastSubmittedRating = 0;
					}
				}
			} catch (err) {
				console.error('Error checking rating status:', err);
				ratingId = null;
				ratingCommentId = null;
				userRating = 0;
				lastSubmittedRating = 0;
			}
		} catch (err) {
			console.error('Error checking movie status:', err);
		} finally {
			isLoading = false;
		}
	}

	// Submit rating function
	async function submitRating(rating) {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to rate this movie');
			return;
		}

		isLoading = true;

		// Cancel any previous request
		if (abortControllers.submitRating) {
			abortControllers.submitRating.abort();
		}
		abortControllers.submitRating = new AbortController();

		try {
			const userId = $authStore.user.id;
			const movieId = data.movieId;

			// Check if there's an existing rating with comment first
			if (ratingCommentId) {
				// Update the rating in ratings_comments
				await pb.collection('ratings_comments').update(
					ratingCommentId,
					{ rating: rating },
					{ $autoCancel: false } // Prevent auto-cancellation
				);
			}
			// If no comment rating but there is a regular rating
			else if (ratingId) {
				// Update existing rating
				await pb.collection('ratings').update(
					ratingId,
					{ rating: rating },
					{ $autoCancel: false } // Prevent auto-cancellation
				);
			}
			// No existing ratings, create a new one
			else {
				// Create new rating
				const newRating = await pb.collection('ratings').create(
					{
						userId: userId,
						movieId: movieId,
						rating: rating
					},
					{ $autoCancel: false } // Prevent auto-cancellation
				);
				ratingId = newRating.id;
			}

			userRating = rating;
			lastSubmittedRating = rating;
			toast.success(`Thank you for rating ${rating} ${rating === 1 ? 'star' : 'stars'}!`);
		} catch (err) {
			console.error('Error submitting rating:', err);
			toast.error('Failed to submit rating');
		} finally {
			isLoading = false;
		}
	}

	// Toggle watchlist status
	async function toggleWatchlist() {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to add movies to your watchlist');
			return;
		}

		isLoading = true;

		try {
			const userId = $authStore.user.id;
			const movieId = data.movieId;

			if (isInWatchlist && watchlistItemId) {
				// Remove from watchlist
				await pb.collection('watchlists').delete(watchlistItemId, {
					$autoCancel: false
				});
				watchlistItemId = null;
				isInWatchlist = false;
				hasNotification = false;
				toast('Removed from Watchlist');
			} else {
				// Add to watchlist
				const newItem = await pb.collection('watchlists').create(
					{
						userId: userId,
						movieId: movieId,
						notification: true // Default notification setting
					},
					{
						$autoCancel: false
					}
				);

				watchlistItemId = newItem.id;
				isInWatchlist = true;
				hasNotification = true;
				toast.success('Added to Watchlist');
			}
		} catch (err) {
			console.error('Error updating watchlist:', err);
			toast.error('Failed to update watchlist');
		} finally {
			isLoading = false;
		}
	}

	// Toggle reminder setting
	async function toggleReminder() {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to set reminders');
			return;
		}

		isLoading = true;

		try {
			const userId = $authStore.user.id;
			const movieId = data.movieId;

			if (isInWatchlist && watchlistItemId) {
				// Movie already in watchlist, just toggle notification
				const newNotificationValue = !hasNotification;
				await pb.collection('watchlists').update(
					watchlistItemId,
					{
						notification: newNotificationValue
					},
					{
						$autoCancel: false
					}
				);

				hasNotification = newNotificationValue;

				if (newNotificationValue) {
					toast.success('Reminder has been created', {
						description: `${data.movie.releaseDate} at 6:00pm`
					});
				} else {
					toast('Reminder has been removed');
				}
			} else {
				// Add to watchlist with reminder
				const newItem = await pb.collection('watchlists').create(
					{
						userId: userId,
						movieId: movieId,
						notification: true
					},
					{
						$autoCancel: false
					}
				);

				watchlistItemId = newItem.id;
				isInWatchlist = true;
				hasNotification = true;
				toast.success('Added to watchlist with reminder');
			}
		} catch (err) {
			console.error('Error updating reminder:', err);
			toast.error('Failed to update reminder');
		} finally {
			isLoading = false;
		}
	}

	// Clean up on component unmount
	onDestroy(() => {
		// Cancel any ongoing requests
		Object.values(abortControllers).forEach((controller) => {
			if (controller) controller.abort();
		});
	});

	// Update status check when component mounts
	onMount(() => {
		checkMovieStatus();
	});

	// Re-check when auth state changes
	$effect(() => {
		if ($authStore) {
			checkMovieStatus();
		}
	});
</script>

{#if data.error}
	<div class="flex h-screen items-center justify-center">
		<div class="rounded bg-red-500 p-6 text-white">
			<h2 class="text-2xl font-bold">Error Loading Movie</h2>
			<p>{data.error}</p>
		</div>
	</div>
{:else}
	<div>
		<Toaster />
		<MovieInfoView
			movie={data.movie}
			movieId={data.movieId}
			{isInWatchlist}
			{hasNotification}
			{isLoading}
			{toggleWatchlist}
			{toggleReminder}
		/>
		<br />
		<br />
		<ReviewCarouselView movieId={data.movieId} />
		<br />
		<br />
		<CommentCarouselView movieId={data.movieId} />
		<br />
		<br />
		<MyRatingView
			movieId={data.movieId}
			{userRating}
			{lastSubmittedRating}
			{isLoading}
			{submitRating}
		/>
		<br />
		<br />
		<WatchOtherMoviesView />
	</div>
{/if}
