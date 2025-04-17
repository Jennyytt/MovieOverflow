<script>
	import { CircleUserRound, ThumbsUp, ThumbsDown, Star } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	export let username = 'User Name';
	export let date = 'Feb 24, 2025';
	let feedbackState = null;
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
</script>

<div class="flex w-full flex-col items-start gap-4">
	<div class="flex h-full w-full items-start justify-start gap-[61px]">
		<div class="flex w-[163px] flex-col items-start justify-start gap-3">
			<div class="inline-flex h-[41.99px] items-center justify-start gap-[18px] self-stretch">
				<div class="relative aspect-square h-[42.34px] w-[42.34px] flex-shrink-0">
					<CircleUserRound class="h-full w-full stroke-[#D1D7E0]" />
				</div>
				<div>
					<span class="break-words font-['Inter'] text-[18.41px] font-medium text-[#cccccc]">
						{username}
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
			<div class="inline-flex h-[20px] w-[40px] items-center justify-start">
				<Button
					variant="ghost"
					size="20"
					class="relative h-8 w-8 p-0 hover:bg-transparent focus-visible:ring-0"
					aria-label={feedbackState === 'like' ? 'Remove like' : 'Like this comment'}
					onclick={handleLike}
				>
					<ThumbsUp
						class="h-[22px] w-[22px] stroke-white"
						fill={feedbackState === 'like' ? '#FFFFFF' : 'none'}
						size="22"
					/>
				</Button>
				<Button
					variant="ghost"
					size="20"
					class="relative h-8 w-8 p-0 hover:bg-transparent focus-visible:ring-0"
					aria-label={feedbackState === 'dislike' ? 'Remove dislike' : 'Dislike this comment'}
					onclick={handleDislike}
				>
					<ThumbsDown
						class="h-[22px] w-[22px] stroke-white"
						fill={feedbackState === 'dislike' ? '#FFFFFF' : 'none'}
						size="22"
					/>
				</Button>
			</div>
		</div>
		<div class="inline-flex w-[494.34px] flex-col gap-1">
			<div class="line-clamp-5 max-h-[138.075px] overflow-hidden">
				<span class="break-words font-['Inter'] text-[18.41px] font-medium text-[#cccccc]">
					The not-so-secret weapon this CAPTAIN AMERICA has going for it is Harrison Ford. Don't
					believe the nay-sayers out there: Brave New World is a 21st century Tall Tale, and if it
					takes two viewings to take it all in, so be it hhfhhddjjdjdjdjdj kfjedfsemflse
					ksegkskgksekg snfnanefkanfk
				</span>
			</div>
			<div>
				<span
					class="break-words font-['Inter'] text-[18.41px] font-semibold text-white underline drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
				>
					Show More
				</span>
			</div>
		</div>
	</div>
	<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
</div>
