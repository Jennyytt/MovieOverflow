<script>
	import { Card } from '$lib/components/ui/card';
	import { CircleUserRound } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	// Props to receive real data
	export let username = 'User';
	export let commentText = 'No comment provided.';
	export let date = 'Unknown date';
	export let commentId = '';
	// export let movieId = '';

	// Track the like/dislike state
	// null = neither, "like" = thumbs up, "dislike" = thumbs down
	let feedbackState = null;
	let isSubmittingFeedback = false;

	function handleLike() {
		// If already liked, cancel the like
		if (feedbackState === 'like') {
			feedbackState = null;
		} else {
			// Otherwise, set to liked
			feedbackState = 'like';
		}

		// In a real implementation, you would send this feedback to the server
		saveFeedback(feedbackState);
	}

	function handleDislike() {
		// If already disliked, cancel the dislike
		if (feedbackState === 'dislike') {
			feedbackState = null;
		} else {
			// Otherwise, set to disliked
			feedbackState = 'dislike';
		}

		// In a real implementation, you would send this feedback to the server
		saveFeedback(feedbackState);
	}

	// Function to save feedback to server (placeholder for now)
	async function saveFeedback(feedback) {
		if (isSubmittingFeedback || !commentId) return;

		try {
			isSubmittingFeedback = true;

			// This is a placeholder for actual API call
			console.log(`Saving feedback "${feedback}" for comment ${commentId}`);

			// Here you would typically make an API call to save the feedback
			// For example:
			// await pb.collection('comment_feedback').create({
			//   commentId,
			//   userId: currentUserId,
			//   feedbackType: feedback
			// });

			isSubmittingFeedback = false;
		} catch (error) {
			console.error('Error saving feedback:', error);
			isSubmittingFeedback = false;
		}
	}

	// Truncate long usernames
	$: displayUsername = username?.length > 15 ? username.slice(0, 15) + '...' : username;
</script>

<Card
	class="relative box-border h-[285px] w-[346px] overflow-hidden rounded-[10px] border-[#222222] bg-[#222222]"
>
	<div class="absolute left-1/2 top-1/2 h-[256.13px] w-[297px] -translate-x-1/2 -translate-y-1/2">
		<!-- User icon and name -->
		<div class="absolute left-0 top-0 flex flex-row items-center justify-start gap-2">
			<div class="relative aspect-square h-[29px] w-[29px] flex-shrink-0">
				<CircleUserRound class="h-full w-full" color="#D1D7E0" />
			</div>
			<div class="text-left text-base font-bold leading-[44px] tracking-[-0.02em] text-white">
				{displayUsername}
			</div>
		</div>

		<!-- Comment text - with truncation for long comments -->
		<div
			class="absolute left-0 top-[53px] h-[160px] w-[297px] overflow-hidden text-left text-base font-normal text-white"
		>
			{commentText}
		</div>

		<!-- Divider line -->
		<div
			class="absolute left-0 top-[226.13px] -mt-0.5 h-[2px] w-[297px] origin-top-left border-b-0 border-t-2 border-solid border-black"
		></div>

		<!-- Bottom section with date and "Full Comment" link -->
		<div
			class="absolute left-0 top-[237.13px] flex h-[28px] w-[297px] flex-row items-end items-center justify-between"
		>
			<div class="text-left text-xs font-normal text-white">
				{date}
			</div>
			<div class="flex items-center">
				<Button
					variant="ghost"
					size="icon"
					class="h-auto w-auto p-0 pr-2 hover:bg-transparent focus-visible:ring-0"
					aria-label={feedbackState === 'like' ? 'Remove like' : 'Like this comment'}
					onclick={handleLike}
					disabled={isSubmittingFeedback}
				>
					<svg
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill={feedbackState === 'like' ? '#FFFFFF' : 'none'}
						stroke="#FFFFFF"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="transition-colors"
					>
						<!-- ThumbsUp path data -->
						<path
							d="M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
						></path>
					</svg>
				</Button>
				<Button
					variant="ghost"
					size="icon"
					class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
					aria-label={feedbackState === 'dislike' ? 'Remove dislike' : 'Dislike this comment'}
					onclick={handleDislike}
					disabled={isSubmittingFeedback}
				>
					<svg
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill={feedbackState === 'dislike' ? '#FFFFFF' : 'none'}
						stroke="#FFFFFF"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="transition-colors"
					>
						<!-- ThumbsDown path data -->
						<path
							d="M17 14V2M9 18.12L11 14H5.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 7.5 2H21a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"
						></path>
					</svg>
				</Button>
			</div>
		</div>
	</div>
</Card>
