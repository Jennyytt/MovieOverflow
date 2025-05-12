<script lang="ts">
	import { onMount } from 'svelte';
	import { Flame } from '@lucide/svelte';
	import MovieCarousel from '$lib/customComponents/movie/MovieCarousel.svelte';
	import pb from '$lib/pb';

	let Top10movie = []; // reactive list for the carousel

	const LIMIT = 10; // how many cards you want

	onMount(async () => {
		const today = new Date(); // e.g. 2025-05-13T…

		const res = await pb.collection('movies').getList(1, LIMIT, {
			sort: '-rating', // newest first
			filter: `releaseDate <= "${today.toISOString()}"`,
			$autoCancel: false
		});

		Top10movie = res.items;
	});
</script>

<div class="relative flex flex-col items-start gap-8">
	<!-- section header -->
	<div class="flex w-[1170px] items-center justify-between">
		<div class="flex items-center gap-3">
			<Flame color="#A508FF" size={45} />
			<div class="text-[32px] font-semibold text-white">Trending</div>
		</div>
	</div>

	<!-- 4️⃣  pass the real list -->
	<MovieCarousel movies={Top10movie} />
</div>
