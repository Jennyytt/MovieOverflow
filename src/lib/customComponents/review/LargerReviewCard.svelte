<script>
	// Props for dynamic content
	import { CircleUserRound } from '@lucide/svelte';
	export let username = 'User Name';
	export let date = 'Feb 24, 2025';
	export let reviewTitle = 'Title Of Critics Review';
	export let reviewText =
		'Good movie!<br/>Good!<br/>Good!<br/>Good!<br/>Good movie but have a lot of potential to be even mor...';

	// Truncate username to 12 characters and append "..." if longer
	$: displayUsername = username.length > 12 ? username.slice(0, 12) + '...' : username;
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
						class="overflow-hidden whitespace-nowrap break-normal font-inter text-[18.41px] font-medium text-[#cccccc]"
						>{displayUsername}</span
					>
				</div>
			</div>
			<div>
				<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]">{date}</span>
			</div>
		</div>

		<div class="inline-flex w-[494.34px] flex-col gap-3">
			<div>
				<span
					class="break-words font-['Inter'] text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
				>
					{reviewTitle}
				</span>
			</div>
			<div>
				<span class="break-words font-['Inter'] text-[18.41px] font-medium text-[#cccccc]">
					{reviewText}
				</span>
			</div>
			<div>
				<span
					class="break-words font-['Inter'] text-[18.41px] font-semibold text-white underline drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
				>
					Full Review
				</span>
			</div>
		</div>
	</div>
	<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
</div>
