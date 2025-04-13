<script>
	// Props for dynamic content
	export let title = 'Captain America: Brave New World';
	//export let year = '2025';
	export let rating = 'IIA';
	export let duration = '1h 58m';
	import posterImage from '../../assets/movie-poster-xl.png';
	import { MoveDown } from '@lucide/svelte';
	import LargerReviewCard from '$lib/customComponents/review/LargerReviewCard.svelte';
</script>

<div class="inline-flex h-full w-full gap-7">
	<div class="inline-flex w-[418px] flex-col items-center justify-center gap-[31px]">
		<img src={posterImage} alt={title + ' poster'} class="h-[473px] w-[315px] rounded-[3.68px]" />
		<div
			class="flex h-[274px] flex-col items-center justify-center gap-[10px] self-stretch rounded-[9.2px] border-[2.76px] border-[#222222] bg-black px-[23px] py-[19px]"
		>
			<div class="flex w-[370.79px] flex-col items-center justify-center gap-[14px]">
				<div class="flex flex-col gap-[7px] self-stretch">
					<div class="self-stretch">
						<span
							class="break-words font-inter text-[22.09px] font-semibold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
							>{title}</span
						>
					</div>
					<div class="items-left justify-left inline-flex gap-3">
						<div class="flex items-end gap-[7px]">
							<div>
								<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]"
									>{rating}</span
								>
							</div>
							<div>
								<span class="break-words font-inter text-[18.41px] font-medium text-white">,</span>
							</div>
						</div>
						<div>
							<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]"
								>{duration}</span
							>
						</div>
					</div>
				</div>
				<div class="h-0 w-[366px] border-[1.38px] border-[#222222]"></div>
				<div class="inline-flex items-center justify-center gap-[77px] self-stretch">
					<div>
						<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]"
							>Genre</span
						>
					</div>
					<div>
						<span class="break-words font-inter text-[18.41px] font-normal text-white"
							>Action, Adventure, Fantasy</span
						>
					</div>
				</div>
				<div class="h-0 w-[366px] border-[1.38px] border-[#222222]"></div>
				<div class="inline-flex items-center justify-between self-stretch">
					<div>
						<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]"
							>Director</span
						>
					</div>
					<div>
						<span class="break-words font-inter text-[18.41px] font-normal text-white"
							>Julius Onah</span
						>
					</div>
				</div>
				<div class="h-0 w-[366px] border-[1.38px] border-[#222222]"></div>
				<div class="inline-flex items-center justify-between self-stretch opacity-60">
					<div>
						<span class="break-words font-inter text-[18.41px] font-medium text-[#cccccc]"
							>Release Date</span
						>
					</div>
					<div>
						<span class="break-words font-inter text-[18.41px] font-normal text-white"
							>Feb 14, 2025</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="inline-flex w-[723.9px] flex-col items-center justify-start gap-[22px]">
		<div class="flex flex-col gap-[19px] self-stretch">
			<div class="inline-flex items-end justify-center gap-8 self-stretch">
				<div class="w-[531.97px]">
					<span
						class="break-words font-inter text-[22.09px] font-semibold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
						>Captain America: Brave New World Critics Review</span
					>
				</div>
				<div class="flex items-center gap-[25px]">
					<div class="flex w-[62.13px] items-center justify-between">
						<div>
							<span class="whitespace-nowrap font-inter text-[18.41px] font-semibold text-[#cccccc]"
								>Sort By</span
							>
						</div>
					</div>
					<div class="relative flex items-end justify-center gap-[6px]">
						<div class="flex w-[42px] items-center justify-between">
							<div>
								<span
									class="break-words font-inter text-[18.41px] font-semibold text-[#b693dc] underline"
									>Date</span
								>
							</div>
						</div>
						<MoveDown
							class="absolute left-[4.51px] top-[1.61px] h-[16.11px] w-[10.18px]"
							fill="none"
							color="#B693DC"
						/>
					</div>
				</div>
			</div>
			<div class="h-0 self-stretch border-[2.3px] border-[#222222]"></div>
		</div>
		<LargerReviewCard />
		<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
		<LargerReviewCard />
		<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
		<LargerReviewCard />
		<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
		<LargerReviewCard />
		<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
		<LargerReviewCard />
		<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
		<div
			class="inline-flex h-[34.05px] w-[103.08px] items-center justify-center gap-[10px] rounded-[4.6px] bg-[rgba(128,43,177,0.8)] px-[14px] py-[8px]"
		>
			<div>
				<span class="break-words font-inter text-[14.73px] font-medium text-white">Load More</span>
			</div>
		</div>
	</div>
</div>
