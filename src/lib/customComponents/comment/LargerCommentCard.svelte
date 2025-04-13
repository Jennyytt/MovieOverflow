<script>
	// Props for dynamic content
	import { CircleUserRound, ThumbsUp, ThumbsDown, Star } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	export let username = 'User Name';
	export let date = 'Feb 24, 2025';
	// Track the like/dislike state
	// null = neither, "like" = thumbs up, "dislike" = thumbs down
	let feedbackState = null;
	function handleLike() {
		// If already liked, cancel the like
		if (feedbackState === 'like') {
			feedbackState = null;
		} else {
			// Otherwise, set to liked
			feedbackState = 'like';
		}
	}
	function handleDislike() {
		// If already disliked, cancel the dislike
		if (feedbackState === 'dislike') {
			feedbackState = null;
		} else {
			// Otherwise, set to disliked
			feedbackState = 'dislike';
		}
	}
</script>

<div class="largercommentcard">
	<div class="commentdetails">
		<div class="name">
			<div class="relative aspect-square h-[42.34px] w-[42.34px] flex-shrink-0">
				<CircleUserRound class="h-full w-full" color="#D1D7E0" />
			</div>
			<div><span class="username_span">{username}</span></div>
		</div>
		<div data-property-1="4" class="stars---small">
			{#each Array(5)}
				<Star
					class="relative h-6 w-6 flex-shrink-0 overflow-visible"
					fill="none"
					size="20"
					color="#FBC02D"
				/>
			{/each}
		</div>
		<div><span class="feb242025_span">{date}</span></div>
		<div class="reactions">
			<Button
				variant="ghost"
				size="icon"
				class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
				aria-label={feedbackState === 'like' ? 'Remove like' : 'Like this comment'}
				onclick={handleLike}
			>
				<ThumbsUp
					class="
                        width: 22px;
                        height: 22px;
                        left: 1px;
                        top: 0.64px;
                        position: absolute;
                        background: black;
                        border: 1px white solid;"
					fill={feedbackState === 'like' ? '#FFFFFF' : 'none'}
					color="#FFFFFF"
				/>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
				aria-label={feedbackState === 'dislike' ? 'Remove dislike' : 'Dislike this comment'}
				onclick={handleDislike}
			>
				<ThumbsDown
					class="
                        width: 22px;
                        height: 22px;
                        left: 1px;
                        top: 0.64px;
                        position: absolute;
                        background: black;
                        border: 1px white solid;"
					fill={feedbackState === 'dislike' ? '#FFFFFF' : 'none'}
					color="#FFFFFF"
				/>
			</Button>
		</div>
	</div>
	<div class="comment">
		<span class="comment_span"
			>The not-so-secret weapon this CAPTAIN AMERICA has going for it is Harrison Ford. Don't
			believe the nay-sayers out there: Brave New World is a 21st century Tall Tale, and if it takes
			two viewings to take it all in, so be it
		</span>
	</div>
</div>

<style>
	.username_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.feb242025_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.comment_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.comment {
		width: 488px;
	}

	.name {
		align-self: stretch;
		height: 41.99px;
		justify-content: flex-start;
		align-items: center;
		gap: 18px;
		display: inline-flex;
	}

	.stars---small {
		width: 100px;
		height: 20px;
		justify-content: flex-start;
		align-items: center;
		display: inline-flex;
	}

	.reactions {
		justify-content: center;
		align-items: center;
		gap: 6px;
		display: inline-flex;
	}

	.commentdetails {
		width: 163px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 12px;
		display: inline-flex;
	}

	.largercommentcard {
		width: 100%;
		height: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 61px;
		display: inline-flex;
	}
</style>
