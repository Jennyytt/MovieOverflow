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
	let ratingCommentId = $state(null);
	let userComment = $state('');

	// For handling request cancellation
	let abortControllers = {};

	// Check movie status for the current user
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
				ratingCommentId = null;
				userComment = '';
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
				if (!err.isAbort) {
					console.error('Error checking watchlist status:', err);
				}
				watchlistItemId = null;
				isInWatchlist = false;
				hasNotification = false;
			}

			// Check ratings_comments status
			try {
				const ratingResult = await pb.collection('ratings_comments').getList(1, 1, {
					filter: `userId = "${userId}" && movieId = "${movieId}"`,
					$autoCancel: false // Prevent auto-cancellation
				});

				if (ratingResult.items.length > 0) {
					const ratingItem = ratingResult.items[0];
					ratingCommentId = ratingItem.id;
					userRating = ratingItem.rating || 0;
					userComment = ratingItem.commentText || '';
					lastSubmittedRating = userRating;
				} else {
					ratingCommentId = null;
					userRating = 0;
					userComment = '';
					lastSubmittedRating = 0;
				}
			} catch (err) {
				if (!err.isAbort) {
					console.error('Error checking rating status:', err);
				}
				ratingCommentId = null;
				userRating = 0;
				userComment = '';
				lastSubmittedRating = 0;
			}
		} catch (err) {
			if (!err.isAbort) {
				console.error('Error checking movie status:', err);
			}
		} finally {
			isLoading = false;
		}
	}

	// Submit or update rating
	async function submitRating(rating) {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to rate this movie');
			return;
		}

		// Validate rating
		if (!rating || rating <= 0 || rating > 5) {
			toast.error('Please select a valid rating between 1 and 5 stars');
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

			if (ratingCommentId) {
				// Update existing rating
				await pb
					.collection('ratings_comments')
					.update(ratingCommentId, { rating: rating }, { $autoCancel: false });
				toast.success(`Rating updated to ${rating} ${rating === 1 ? 'star' : 'stars'}!`);
			} else {
				// Create new rating without comment
				const newRating = await pb.collection('ratings_comments').create(
					{
						userId: userId,
						movieId: movieId,
						rating: rating,
						commentText: '' // Empty comment initially
					},
					{ $autoCancel: false }
				);
				ratingCommentId = newRating.id;
				toast.success(`Thank you for rating ${rating} ${rating === 1 ? 'star' : 'stars'}!`);
			}

			userRating = rating;
			lastSubmittedRating = rating;
		} catch (err) {
			console.error('Error submitting rating:', err);
			toast.error('Failed to submit rating');
		} finally {
			isLoading = false;
		}
	}

	// Submit or update comment with rating
	async function submitComment(rating, comment) {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to comment');
			return;
		}

		// Validate rating
		if (!rating || rating <= 0 || rating > 5) {
			toast.error('Please select a valid rating between 1 and 5 stars');
			return;
		}

		isLoading = true;

		// Cancel any previous request
		if (abortControllers.submitComment) {
			abortControllers.submitComment.abort();
		}
		abortControllers.submitComment = new AbortController();

		try {
			const userId = $authStore.user.id;
			const movieId = data.movieId;
			const commentText = comment || ''; // Ensure empty string if null

			if (ratingCommentId) {
				// Update existing rating and comment
				await pb.collection('ratings_comments').update(
					ratingCommentId,
					{
						rating: rating,
						commentText: commentText
					},
					{ $autoCancel: false }
				);

				toast.success(
					comment ? 'Your rating and comment have been updated!' : 'Your rating has been updated!'
				);
			} else {
				// Create new rating with comment
				const newRecord = await pb.collection('ratings_comments').create(
					{
						userId: userId,
						movieId: movieId,
						rating: rating,
						commentText: commentText
					},
					{ $autoCancel: false }
				);

				ratingCommentId = newRecord.id;
				toast.success(
					comment ? 'Your rating and comment have been posted!' : 'Your rating has been posted!'
				);
			}

			userRating = rating;
			userComment = commentText;
			lastSubmittedRating = rating;

			// Refresh movie status
			await checkMovieStatus();
		} catch (err) {
			console.error('Error submitting comment:', err);
			toast.error('Failed to submit comment');
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
			{userComment}
			{isLoading}
			{submitRating}
			{submitComment}
		/>
		<br />
		<br />
		<WatchOtherMoviesView />
	</div>
{/if}
