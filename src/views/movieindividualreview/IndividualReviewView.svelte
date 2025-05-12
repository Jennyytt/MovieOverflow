<script>
	import { CircleUserRound } from '@lucide/svelte';
	import MovieComCR from '$lib/customComponents/movie/MovieComCR.svelte';

	export let data;
	let { review } = data; // Removed movieId from destructuring

	// Truncate username to 12 characters and append "..." if longer
	$: displayUsername =
		review.username.length > 12 ? review.username.slice(0, 12) + '...' : review.username;

	// Split the reviewText into paragraphs based on HTML tags or newlines
	$: paragraphs = review.reviewText.split(/<br \/>|\n/).filter((p) => p.trim() !== '');
</script>

<div class="inline-flex h-full w-full gap-7">
	<MovieComCR
		title={review.movie.title}
		rating={review.movie.rating}
		duration={review.movie.duration}
		posterImage={review.movie.posterImage}
		genre={review.movie.genre}
		directors={review.movie.directors}
		releaseDate={review.movie.releaseDate}
	/>
	<div class="inline-flex w-[725.34px] flex-col items-center justify-start gap-[15px]">
		<div class="inline-flex items-center justify-between self-stretch">
			<div class="w-[530px]">
				<span
					class="break-words text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
				>
					{review.movie.title} Critics Review
				</span>
			</div>
		</div>
		<div class="h-0 w-[725.34px] border-[2.3px] border-[#222222]"></div>
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
					<span class="break-words text-[18.41px] font-medium text-[#cccccc]">{review.date}</span>
				</div>
			</div>

			<div class="inline-flex w-[528px] flex-col items-start justify-start gap-[22px]">
				<div class="self-stretch">
					<span
						class="break-words text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						{review.reviewTitle}
					</span>
				</div>
				<div class="flex flex-col gap-4 self-stretch">
					{#each paragraphs as paragraph, index (index)}
						<p class="break-words text-[18.41px] font-medium text-[#CCCCCC]">
							{paragraph}
						</p>
					{/each}
				</div>
			</div>
		</div>
		<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
	</div>
</div>
