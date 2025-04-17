<script>
	import posterImage from '../../assets/movie-poster-xl.png';
	import { MoveDown } from '@lucide/svelte';
	import LargerCommentAdminCard from '$lib/customComponents/comment/LargerCommentAdminCard.svelte';
	import MovieComCR from '$lib/customComponents/movie/MovieComCR.svelte';
</script>

<div class="inline-flex h-full w-full gap-7">
	<MovieComCR
		title="Captain America: Brave New World"
		rating="IIA"
		duration="1h 58m"
		{posterImage}
		genre="Action, Adventure, Fantasy"
		director="Julius Onah"
		releaseDate="Feb 14, 2025"
	/>
	<div class="inline-flex w-[723.9px] flex-col items-center justify-start gap-[15px]">
		<div class="flex flex-col gap-[10px] self-stretch">
			<div class="flex items-end justify-between gap-8 self-stretch">
				<div>
					<span
						class="break-words font-['Inter'] text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						Captain America: Brave New World Comments
					</span>
				</div>
				<div class="flex items-center gap-[10px]">
					<div class="flex items-center">
						<span
							class="whitespace-nowrap font-['Inter'] text-[18.41px] font-semibold text-[#cccccc]"
						>
							Sort By
						</span>
					</div>
					<div class="flex items-center gap-[6px]">
						<span class="font-['Inter'] text-[18.41px] font-semibold text-[#b693dc] underline">
							Date
						</span>
						<MoveDown class="h-[18.41px] w-[18.41px] stroke-[#B693DC]" fill="none" />
					</div>
				</div>
			</div>
			<div class="h-0 self-stretch border-[2.3px] border-[#222222]"></div>
		</div>
		<LargerCommentAdminCard />
		<LargerCommentAdminCard />
		<LargerCommentAdminCard />
		<LargerCommentAdminCard />
		<LargerCommentAdminCard />
		<div
			class="inline-flex h-[34.05px] w-[103.08px] items-center justify-center gap-[10px] rounded-[4.6px] bg-[rgba(128,43,177,0.8)] px-[14px] py-2"
		>
			<div>
				<span class="break-words font-['Inter'] text-[14.73px] font-medium text-white">
					Load More
				</span>
			</div>
		</div>
	</div>
</div>
