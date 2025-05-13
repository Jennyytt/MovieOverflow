<script>
	import defaultPosterImage from '../../../assets/movie-poster-xl.png';
	import { Star } from '@lucide/svelte';

	/* ---------- incoming props ---------- */
	export let title = 'Movie Title';
	export let year = '';
	export let rating = '';
	export let duration = '';
	export let score = '0';
	export let posterURL = null;
	export let trailerURL = null;

	/* ---------- fallbacks ---------- */
	const actualPosterURL = posterURL || defaultPosterImage;

	/* ---------- robust YouTube-ID extraction ---------- */
	let trailerVideoId = '';

	$: {
		trailerVideoId = '';
		if (trailerURL) {
			try {
				const u = new URL(trailerURL);
				if (u.searchParams.has('v')) trailerVideoId = u.searchParams.get('v');
				else if (u.pathname.includes('/embed/')) trailerVideoId = u.pathname.split('/').pop();
				else if (u.hostname === 'youtu.be') trailerVideoId = u.pathname.slice(1);
			} catch {
				/* ignore bad URL */
			}
		}
	}
</script>

<!-- ---------------- UI ---------------- -->
<div class="flex flex-col gap-[3px]">
	<!-- ✱✱ Title + meta + score ✱✱ -->
	<div class="flex w-[1170px] items-start justify-between">
		<!-- left: title + meta -->
		<div class="flex flex-col">
			<h1 class="text-[50px] font-semibold leading-[1.1] text-white">{title}</h1>

			<div class="flex items-center gap-2 text-base font-medium text-white">
				{#if year}
					<span>{year}</span><span>·</span>
				{/if}
				{#if rating}
					<span>{rating}</span><span>·</span>
				{/if}
				{#if duration}<span>{duration}</span>{/if}
			</div>
		</div>

		<!-- right: numeric rating -->
		<div class="relative h-[72px] w-[110px] min-w-[102px]">
			<div
				class="absolute left-0 top-[10px] w-[102px] text-right text-base font-medium leading-4 tracking-[-0.02em] text-[#cccccc]"
			>
				RATING
			</div>
			<div
				class="absolute left-0 top-[40px] flex h-[39px] w-[102px] items-center justify-end gap-[5px]"
			>
				<Star class="h-6 w-6" fill="#FBC02D" color="#FBC02D" />
				<span class="text-[32px] font-normal text-white">{score}</span>
				<span class="text-base font-normal text-[#cccccc]">/5</span>
			</div>
		</div>
	</div>

	<!-- Poster + Trailer row -->
	<div class="mt-2 flex items-start gap-[40px] self-stretch">
		<!-- poster -->
		<img
			src={actualPosterURL}
			alt={`${title} poster`}
			class="aspect-[2/3] h-[459px] w-[306px] rounded-[4px] object-cover"
		/>

		<!-- trailer -->
		<div class="h-[459px] w-[816px] flex-shrink-0 overflow-hidden rounded-[4px] bg-black">
			{#if trailerVideoId}
				<iframe
					class="h-full w-full"
					src={`https://www.youtube.com/embed/${trailerVideoId}`}
					title={`${title} – Trailer`}
					frameborder="0"
					allowfullscreen
				>
				</iframe>
			{:else}
				<div class="flex h-full w-full items-center justify-center text-white">
					No trailer available
				</div>
			{/if}
		</div>
	</div>
</div>
