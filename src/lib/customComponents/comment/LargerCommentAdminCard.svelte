<script>
	import { CircleUserRound } from '@lucide/svelte';
	import { onMount } from 'svelte';

	export let username = 'User Name';
	export let date = 'Feb 24, 2025';
	export let commentText = 'This is a default comment.';
	export let commentId; // Added prop for comment ID
	export let handleDelete = () => {}; // Added prop for delete handler
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
						class="overflow-hidden whitespace-nowrap break-normal text-[18.41px] font-medium text-[#cccccc]"
					>
						{displayUsername}
					</span>
				</div>
			</div>
			<div>
				<span class="break-words text-[18.41px] font-medium text-[#cccccc]">
					{date}
				</span>
			</div>
			<div class="self-stretch text-left">
				<button
					type="button"
					onclick={() => handleDelete(commentId)}
					class="cursor-pointer border-none bg-transparent p-0"
				>
					<span class="break-words text-base font-semibold text-[#f54f4c] underline"> Delete </span>
				</button>
			</div>
		</div>
		<div class="inline-flex w-[494.34px] flex-col items-start gap-1">
			<div
				class={showMore ? '' : 'line-clamp-5 max-h-[138.075px] overflow-hidden'}
				bind:this={commentElement}
			>
				<span class="break-words text-[18.41px] font-medium text-[#cccccc]">
					{commentText}
				</span>
			</div>
			{#if needsShowMore && !showMore}
				<button
					type="button"
					onclick={toggleShowMore}
					class="cursor-pointer border-none bg-transparent p-0"
				>
					<span
						class="break-words text-[18.41px] font-semibold text-white underline drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						Show More
					</span>
				</button>
			{/if}
		</div>
	</div>
	<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
</div>
