<script>
	import { CircleUserRound } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	export let username = 'User Name';
	export let date = 'Feb 24, 2025';
	export let reviewTitle = 'Title Of Critics Review';
	export let reviewText = 'This is a review text';
	export let movieId; // Add movieId prop
	export let reviewId; // Add reviewId prop

	// Truncate username to 12 characters and append "..." if longer
	$: displayUsername =
		username?.length > 12 ? username.slice(0, 12) + '...' : username || 'Anonymous';

	$: safeReviewTitle = reviewTitle || 'Untitled Review';

	// Function to navigate to the MovieIndividualReview page
	function navigateToFullReview() {
		goto(`/movieindividualreview/${movieId}/${reviewId}`);
	}
</script>

<div class="flex w-full flex-col items-start gap-6">
	<div class="flex h-full w-full gap-[61px]">
		<div class="flex w-[163px] flex-col gap-3">
			<div class="inline-flex h-[41.99px] items-center gap-[18px] self-stretch">
				<div class="relative aspect-square h-[42.34px] w-[42.34px] flex-shrink-0">
					<CircleUserRound class="h-full w-full" color="#D1D7E0" />
				</div>
				<div>
					<span
						class="overflow-hidden whitespace-nowrap break-normal text-[18.41px] font-medium text-[#cccccc]"
						>{displayUsername}</span
					>
				</div>
			</div>
			<div>
				<span class="break-words text-[18.41px] font-medium text-[#cccccc]">{date}</span>
			</div>
		</div>

		<div class="inline-flex w-[494.34px] flex-col gap-3">
			<div>
				<span
					class="break-words text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
				>
					{safeReviewTitle}
				</span>
			</div>
			<div class="line-clamp-5 max-h-[138.075px] overflow-hidden">
				<span class="break-words text-[18.41px] font-medium text-[#cccccc]">
					{reviewText || 'No review content available.'}
				</span>
			</div>
			<div>
				<button
					on:click={navigateToFullReview}
					class="cursor-pointer break-words border-none bg-transparent text-[18.41px] font-semibold text-white underline drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
				>
					Full Review
				</button>
			</div>
		</div>
	</div>
	<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
</div>
