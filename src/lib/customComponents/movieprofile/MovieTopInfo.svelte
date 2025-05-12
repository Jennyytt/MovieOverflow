<script>
	// Props for dynamic content
	let {
		title = 'Captain America: Brave New World',
		year = '2025',
		rating = 'IIA',
		duration = '1h 58m',
		score = '4.1',
		trailerVideoId = '1pHDWnXmK7Y'
	} = $props();

	import posterImage from '../../../assets/movie-poster-xl.png';
	import trailerBackgroundImage from '../../../assets/trailer-preview.png';
	import { Star } from '@lucide/svelte';

	// State to track if trailer is playing
	let isTrailerPlaying = $state(false);

	function playTrailer() {
		isTrailerPlaying = true;
	}

	// Handle keyboard events for accessibility
	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			playTrailer();
			event.preventDefault(); // Prevent scroll
		}
	}
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
				<span class="h-[24px] text-left text-base font-medium text-white">{year}</span>
				<span class="text-left text-base font-medium text-white">·</span>
				<span class="h-[24px] text-left text-base font-medium text-white">{rating}</span>
				<span class="text-left text-base font-medium text-white">·</span>
				<span class="h-[24px] text-left text-base font-medium text-white">{duration}</span>
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
				src={posterImage}
				alt={title + ' poster'}
				class="relative aspect-[2/3] h-[459px] w-[306px] flex-shrink-0 rounded-[4px] object-cover"
			/>
		</div>

		<!-- Trailer frame -->
		<div class="relative h-[459px] w-[816px] flex-shrink-0 overflow-hidden rounded-[4px]">
			{#if isTrailerPlaying}
				<!-- YouTube Iframe -->
				<div class="absolute inset-0 flex items-center justify-center bg-black">
					<iframe
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${trailerVideoId}?autoplay=1&modestbranding=1&rel=0`}
						title={`${title} - Official Trailer`}
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
						allowfullscreen
					></iframe>
				</div>
			{:else}
				<!-- Using a proper button instead of a div with click handlers -->
				<button
					class="absolute inset-0 flex h-full w-full items-end border-0 p-0 text-left"
					style="background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url({trailerBackgroundImage}) center; background-size: cover; background-repeat: no-repeat;"
					onclick={playTrailer}
					onkeydown={handleKeyDown}
					aria-label="Play trailer for {title}"
				>
					<div class="flex flex-row items-center justify-start gap-[15px] p-[19px_26px]">
						<svg
							class="relative aspect-square h-[70px] w-[70px] flex-shrink-0 overflow-visible"
							width="70"
							height="70"
							viewBox="0 0 70 70"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								d="M30.0934 22.5759L30.0934 22.5759C29.8881 22.439 29.6469 22.3659 29.4 22.3659C28.7097 22.3659 28.15 22.9256 28.15 23.6159V46.3841C28.15 46.631 28.2231 46.8722 28.36 47.0775L28.2352 47.1607L28.36 47.0776C28.7428 47.6519 29.5191 47.8072 30.0934 47.4241L30.0934 47.4241L47.1695 36.04C47.1696 36.04 47.1696 36.04 47.1696 36.04C47.3068 35.9484 47.4246 35.8306 47.5162 35.6934L30.0934 22.5759ZM30.0934 22.5759L47.1696 33.96L47.2528 33.8352M30.0934 22.5759L47.2528 33.8352M47.2528 33.8352L47.1696 33.96C47.744 34.3428 47.8993 35.119 47.5162 35.6934L47.2528 33.8352ZM35 69.85C15.7529 69.85 0.15 54.247 0.15 35C0.15 15.7529 15.7529 0.15 35 0.15C54.247 0.15 69.85 15.7529 69.85 35C69.85 54.247 54.247 69.85 35 69.85ZM35 66.2125C42.7811 66.2125 50.5829 62.2897 56.4363 56.4363C62.2897 50.5829 66.2125 42.7811 66.2125 35C66.2125 27.2189 62.2897 19.4171 56.4363 13.5637C50.5829 7.71027 42.7811 3.7875 35 3.7875C27.2189 3.7875 19.4171 7.71027 13.5637 13.5637C7.71027 19.4171 3.7875 27.2189 3.7875 35C3.7875 42.7811 7.71027 50.5829 13.5637 56.4363C19.4171 62.2897 27.2189 66.2125 35 66.2125Z"
								fill="white"
								stroke="black"
								stroke-width="0.3"
							/>
						</svg>
						<span class="text-left text-[35px] font-medium text-white">Play Trailer</span>
					</div>
				</button>
			{/if}
		</div>
	</div>
</div>
