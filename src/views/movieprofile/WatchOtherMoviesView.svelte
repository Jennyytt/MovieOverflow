<script lang="ts">
	import { onMount } from 'svelte';
	import MovieCarousel from '$lib/customComponents/movie/MovieCarousel.svelte';
	import pb from '$lib/pb';

	let other = []; // reactive list for the carousel

	const LIMIT = 10; // how many cards you want

	onMount(async () => {
		const today = new Date(); // e.g. 2025-05-13T…
		const startOfYear = new Date(today.getFullYear(), 0, 1); // 2025-01-01T00:00:00.000Z

		const res = await pb.collection('movies').getList(1, LIMIT, {
			sort: '-releaseDate', // newest first
			filter:
				// PocketBase AND operator is  &&
				`releaseDate >= "${startOfYear.toISOString()}" && ` +
				`releaseDate <= "${today.toISOString()}"`,
			$autoCancel: false
		});

		other = res.items;
	});
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Watch Other Movies</div>
		</div>
	</div>

	<MovieCarousel movies={other} />
</div>
