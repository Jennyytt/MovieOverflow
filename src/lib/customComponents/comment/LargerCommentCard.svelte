<script>
	import { CircleUserRound, ThumbsUp, ThumbsDown, Star } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';

	export let username = 'User Name';
	export let date = 'Feb 24, 2025';
	export let commentText = 'This is a default comment.';
	let feedbackState = null;
	let showMore = false;
	let needsShowMore = false;
	let commentElement;

	// Truncate username to 12 characters and append "..." if longer
	$: displayUsername = username.length > 12 ? username.slice(0, 12) + '...' : username;

	// Check if the comment exceeds 5 lines
	onMount(() => {
		if (commentElement) {
			// max-h-[138.075px] corresponds to 5 lines at the current font size and line height
			needsShowMore = commentElement.scrollHeight > 138.075;
		}
	});

	function handleLike() {
		if (feedbackState === 'like') {
			feedbackState = null;
		} else {
			feedbackState = 'like';
		}
	}

	function handleDislike() {
		if (feedbackState === 'dislike') {
			feedbackState = null;
		} else {
			feedbackState = 'dislike';
		}
	}

	function toggleShowMore() {
		showMore = !showMore;
	}
</script>

<div class="flex w-full flex-col items-start gap-4">
	<div class="flex h-full w-full items-start justify-start gap-[61px]">
		<div class="flex w-[163px] flex-col items-start justify-start gap-3">
			<div class="inline-flex h-[41.99px] items-center justify-start gap-[18px] self-stretch">
				<div class="relative aspect-square h-[42.34px] w-[42.34px] flex-shrink-0">
					<CircleUserRound class="h-full w-full stroke-[#D1D7E0]" />
				</div>
				<div>
					<span
						class="overflow-hidden whitespace-nowrap break-normal font-inter text-[18.41px] font-medium text-[#cccccc]"
					>
						{displayUsername}
					</span>
				</div>
			</div>
			<div class="inline-flex h-[20px] w-[100px] items-center justify-start">
				{#each Array(5)}
					<Star
						class="relative h-6 w-6 flex-shrink-0 overflow-visible stroke-[#FBC02D]"
						fill="none"
						size="20"
					/>
				{/each}
			</div>
			<div>
				<span class="break-words font-['Inter'] text-[18.41px] font-medium text-[#cccccc]">
					{date}
				</span>
			</div>
			<div class="inline-flex h-[20px] w-[40px] items-center justify-start gap-1">
				<Button
					variant="ghost"
					size="20"
					class="relative h-6 w-6 p-0 hover:bg-transparent focus-visible:ring-0"
					aria-label={feedbackState === 'like' ? 'Remove like' : 'Like this comment'}
					onclick={handleLike}
				>
					<ThumbsUp
						class="h-[20px] w-[20px] stroke-white"
						fill={feedbackState === 'like' ? '#FFFFFF' : 'none'}
						size="20"
					/>
				</Button>
				<Button
					variant="ghost"
					size="20"
					class="relative h-6 w-6 p-0 hover:bg-transparent focus-visible:ring-0"
					aria-label={feedbackState === 'dislike' ? 'Remove dislike' : 'Dislike this comment'}
					onclick={handleDislike}
				>
					<ThumbsDown
						class="h-[20px] w-[20px] stroke-white"
						fill={feedbackState === 'dislike' ? '#FFFFFF' : 'none'}
						size="20"
					/>
				</Button>
			</div>
		</div>
		<div class="inline-flex w-[494.34px] flex-col items-start gap-1">
			<div
				class={showMore ? '' : 'line-clamp-5 max-h-[138.075px] overflow-hidden'}
				bind:this={commentElement}
			>
				<span class="break-words font-['Inter'] text-[18.41px] font-medium text-[#cccccc]">
					{commentText}
				</span>
			</div>
			{#if needsShowMore && !showMore}
				<button
					type="button"
					on:click={toggleShowMore}
					class="cursor-pointer border-none bg-transparent p-0"
				>
					<span
						class="break-words font-['Inter'] text-[18.41px] font-semibold text-white underline drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						Show More
					</span>
				</button>
			{/if}
		</div>
	</div>
	<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
</div>
