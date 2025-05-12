<!-- /lib/customComponents/movieprofile/MovieTopInfo.svelte -->
<script>
	// Import using Svelte 5 props system
	let {
		title = 'Movie Title',
		year = '',
		rating = '',
		duration = '',
		score = '0'
		// posterURL = null,
		// trailerVideoId = 'YoHD9XEInc0' // Now using your working video ID
	} = $props();

	import defaultPosterImage from '../../../assets/movie-poster-xl.png';
	import { Star } from '@lucide/svelte';

	// TODO: movie poster from database
	// Fix the poster URL order - use posterURL if available, otherwise default
	const actualPosterURL = defaultPosterImage;
</script>

<div
	class="relative flex flex-shrink-0 flex-col items-start items-center justify-start gap-[3px] self-stretch"
>
	<!-- Title and Rating Section -->
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-start gap-[10px] self-stretch"
	>
		<!-- Movie Name and Info -->
		<div
			class="min-w-[1050px]relative flex w-[1050px] flex-shrink-0 flex-col items-start justify-start gap-0"
		>
			<h1 class="self-stretch text-left text-[50px] font-semibold text-white">{title}</h1>
			<div class="relative flex flex-shrink-0 items-center gap-2">
				{#if year}
					<span class="h-[24px] text-left text-base font-medium text-white">{year}</span>
					<span class="text-left text-base font-medium text-white">·</span>
				{/if}
				{#if rating}
					<span class="h-[24px] text-left text-base font-medium text-white">{rating}</span>
					<span class="text-left text-base font-medium text-white">·</span>
				{/if}
				{#if duration}
					<span class="h-[24px] text-left text-base font-medium text-white">{duration}</span>
				{/if}
			</div>
		</div>

		<!-- Rating Block -->
		<div class="relative flex h-[72px] w-[110px] min-w-[102px]">
			<div
				class="absolute left-0 top-[10px] w-[102px] text-right text-base font-medium leading-4 tracking-[-0.02em] text-[#cccccc]"
			>
				RATING
			</div>
			<div
				class="absolute left-0 top-[40px] flex h-[39px] w-[102px] flex-row items-center justify-end gap-[5px]"
			>
				<Star
					class="relative h-6 w-6 flex-shrink-0 overflow-visible"
					fill="#FBC02D"
					size="24"
					color="#FBC02D"
				/>
				<div class="relative flex flex-shrink-0 flex-row items-center justify-center gap-1">
					<span class="text-left text-[32px] font-normal text-white">{score}</span>
					<span class="text-left text-base font-normal text-[#cccccc]">/5</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Poster and Trailer Section -->
	<div
		class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[40px] self-stretch"
	>
		<!-- Movie Poster -->
		<div>
			<img
				src={actualPosterURL}
				alt={title + ' poster'}
				class="relative aspect-[2/3] h-[459px] w-[306px] flex-shrink-0 rounded-[4px] object-cover"
			/>
		</div>

		<!-- Trailer frame - now always showing the iframe -->
		<div class="relative h-[459px] w-[816px] flex-shrink-0 overflow-hidden rounded-[4px] bg-black">
			<!-- YouTube Iframe - direct display without toggle -->
			<iframe
				width="100%"
				height="100%"
				src="https://www.youtube.com/embed/YoHD9XEInc0"
				title={`${title} - Official Trailer`}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
				allowfullscreen
				class="absolute inset-0"
			></iframe>
		</div>
	</div>
</div>
