<script>
	// Props for dynamic content
	import { CircleUserRound } from '@lucide/svelte';
	export let username = 'User Name';
	export let date = 'Feb 24, 2025';
</script>

<div class="flex h-full w-full gap-[61px]">
	<div class="flex w-[163px] flex-col gap-3">
		<div class="inline-flex h-[41.99px] items-center gap-[18px] self-stretch">
			<div class="relative aspect-square h-[42.34px] w-[42.34px] flex-shrink-0">
				<CircleUserRound class="h-full w-full" color="#D1D7E0" />
			</div>
			<div>
				<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]"
					>{username}</span
				>
			</div>
		</div>
		<div>
			<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]">{date}</span>
		</div>
	</div>
	<div class="w-[488px]">
		<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]"
			>The not-so-secret weapon this CAPTAIN AMERICA has going for it is Harrison Ford. Don't
			believe the nay-sayers out there: Brave New World is a 21st century Tall Tale, and if it takes
			two viewings to take it all in, so be it
		</span>
	</div>
</div>
