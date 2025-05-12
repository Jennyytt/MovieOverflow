<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { authStore } from '$lib/stores/authStore';
	import { toast } from 'svelte-sonner';
	import pb from '$lib/pb';

	const {
		movieId,
		userRating = 0,
		lastSubmittedRating = 0,
		isLoading = false,
		submitRating = () => {}
	} = $props();

	// Local rating state with reactivity
	let currentRating = $state(0);
	let commentText = $state('');
	let showCommentDialog = $state(false);
	let commentLoading = $state(false);
	let existingCommentId = $state(null);

	// Initialize and update local rating when prop changes
	$effect(() => {
		currentRating = userRating;
	});

	function setRating(value) {
		// If clicking the same star, deselect it
		if (currentRating === value) {
			currentRating = 0;
		} else {
			currentRating = value;
		}
	}

	function handleSubmitRating() {
		// Validate rating value
		if (currentRating <= 0) {
			toast.error('Please select a rating before submitting');
			return;
		}

		// Pass to parent component to handle the API call
		submitRating(currentRating);
	}

	// Using $derived instead of reactive statements
	const isRatingSubmitted = $derived(
		currentRating === lastSubmittedRating && lastSubmittedRating > 0
	);

	// Open comment dialog and check for existing comments
	function openCommentDialog() {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to comment');
			return;
		}

		commentLoading = true;
		// Check for existing comment before showing dialog
		pb.collection('ratings_comments')
			.getList(1, 1, {
				filter: `userId = "${$authStore.user.id}" && movieId = "${movieId}"`,
				$autoCancel: false // Prevent auto-cancellation
			})
			.then((result) => {
				if (result.items.length > 0) {
					const item = result.items[0];
					existingCommentId = item.id;
					commentText = item.commentText || '';
					currentRating = item.rating || currentRating;
				} else {
					existingCommentId = null;
					commentText = '';
				}
				showCommentDialog = true;
				commentLoading = false;
			})
			.catch((err) => {
				console.error('Error checking for existing comment:', err);
				existingCommentId = null;
				commentText = '';
				showCommentDialog = true;
				commentLoading = false;
			});
	}

	function closeCommentDialog() {
		showCommentDialog = false;
	}

	// Submit comment with rating
	async function submitComment() {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to comment');
			return;
		}

		if (currentRating === 0) {
			toast.error('Please select a rating');
			return;
		}

		commentLoading = true;
		try {
			const userId = $authStore.user.id;

			// Data to submit
			const data = {
				userId: userId,
				movieId: movieId,
				rating: currentRating,
				commentText: commentText || '' // Ensure empty string if null
			};

			// Update or create comment
			if (existingCommentId) {
				await pb.collection('ratings_comments').update(existingCommentId, data, {
					$autoCancel: false // Prevent auto-cancellation
				});
				toast.success('Your comment has been updated');
			} else {
				const result = await pb.collection('ratings_comments').create(data, {
					$autoCancel: false // Prevent auto-cancellation
				});
				existingCommentId = result.id;
				toast.success('Your comment has been posted');
			}

			// Update main rating in parent (sets lastSubmittedRating)
			submitRating(currentRating);

			// Close dialog
			closeCommentDialog();
		} catch (err) {
			console.error('Error submitting comment:', err);
			toast.error('Failed to submit comment');
		} finally {
			commentLoading = false;
		}
	}
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-start gap-8 self-stretch">
	<!-- Section title with purple bar -->
	<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
		<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
		<div class="relative text-left text-[32px] font-semibold text-white">My Rating</div>
	</div>

	<!-- Rating container -->
	<div
		class="relative h-[248px] w-[1170px] flex-shrink-0 overflow-hidden rounded-[10px] border-[3px] border-solid border-[#222222] bg-transparent"
	>
		<div
			class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 px-0 py-[10px]"
		>
			<!-- Star rating -->
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[18px]">
				<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars  -->
				{#each Array(5) as _, i}
					<svg
						class="relative aspect-square h-[40px] w-[40px] flex-shrink-0 cursor-pointer overflow-visible transition-transform hover:scale-110"
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						onclick={() => setRating(i + 1)}
						onkeydown={(e) => e.key === 'Enter' && setRating(i + 1)}
						tabindex="0"
						role="button"
						aria-label={`Rate ${i + 1} ${i === 0 ? 'star' : 'stars'}`}
					>
						<!-- Filled star path when rating is selected -->
						{#if i < currentRating}
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.653L14.3579 13.0667L20.0007 0.833313L25.6433 13.0667L39.0217 14.653L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333Z"
								fill="#FBC02D"
							/>
							<!-- Outline star path when rating is not selected -->
						{:else}
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.653L14.3579 13.0667L20.0007 0.833313L25.6433 13.0667L39.0217 14.653L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333ZM20.0007 26.6133L27.0785 30.5751L25.4977 22.6195L31.4528 17.1123L23.398 16.1572L20.0007 8.79168L16.6032 16.1572L8.54836 17.1123L14.5035 22.6195L12.9227 30.5751L20.0007 26.6133Z"
								fill="#FBC02D"
							/>
						{/if}
					</svg>
				{/each}
			</div>

			<!-- Post rating button -->
			<Button
				class="relative flex h-12 flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-[10px] rounded-[20px] border-[1px] border-solid border-black px-6 py-5 text-[20px] font-bold text-[#eeeeee]"
				onclick={handleSubmitRating}
				disabled={isRatingSubmitted || isLoading || currentRating === 0}
			>
				{isRatingSubmitted ? 'RATING POSTED' : 'POST RATING'}
			</Button>

			<!-- Write a comment link -->
			<button
				class="cursor-pointer text-base font-medium text-[#b693dc] underline"
				onclick={openCommentDialog}
			>
				WRITE A COMMENT
			</button>
		</div>
	</div>
</div>

<!-- Comment Dialog -->
{#if showCommentDialog}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-[600px] max-w-[90vw] rounded-lg border-2 border-[#222222] bg-[#111111] p-6">
			<h2 class="mb-4 text-2xl font-bold text-white">Write a Comment</h2>

			<!-- Rating stars in dialog -->
			<div class="mb-4 flex items-center gap-2">
				<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars  -->
				{#each Array(5) as _, i}
					<svg
						class="aspect-square h-[30px] w-[30px] cursor-pointer overflow-visible transition-transform hover:scale-110"
						width="30"
						height="30"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						onclick={() => (currentRating = i + 1)}
						onkeydown={(e) => e.key === 'Enter' && (currentRating = i + 1)}
						tabindex="0"
						role="button"
						aria-label={`Rate ${i + 1} ${i === 0 ? 'star' : 'stars'}`}
					>
						{#if i < currentRating}
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.653L14.3579 13.0667L20.0007 0.833313L25.6433 13.0667L39.0217 14.653L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333Z"
								fill="#FBC02D"
							/>
						{:else}
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.653L14.3579 13.0667L20.0007 0.833313L25.6433 13.0667L39.0217 14.653L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333ZM20.0007 26.6133L27.0785 30.5751L25.4977 22.6195L31.4528 17.1123L23.398 16.1572L20.0007 8.79168L16.6032 16.1572L8.54836 17.1123L14.5035 22.6195L12.9227 30.5751L20.0007 26.6133Z"
								fill="#FBC02D"
							/>
						{/if}
					</svg>
				{/each}
			</div>

			<!-- Comment textarea -->
			<textarea
				bind:value={commentText}
				class="mb-4 min-h-[150px] w-full rounded border border-[#333333] bg-[#222222] p-3 text-white"
				placeholder="Share your thoughts about this movie..."
			></textarea>

			<div class="flex justify-end gap-3">
				<Button variant="outline" onclick={closeCommentDialog} disabled={commentLoading}>
					Cancel
				</Button>
				<Button onclick={submitComment} disabled={commentLoading || currentRating === 0}>
					Post
				</Button>
			</div>
		</div>
	</div>
{/if}
