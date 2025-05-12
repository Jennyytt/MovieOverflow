<script lang="ts">
	import { onMount } from 'svelte';
	import { Flame } from '@lucide/svelte';
	import MovieCarousel from '$lib/customComponents/movie/MovieCarousel.svelte';
	import pb from '$lib/pb';

	let upcoming = []; // reactive list for the carousel

	const LIMIT = 10; // how many cards you want
	const DAYS_BACK = 30; // “recent” window – tweak freely

	onMount(async () => {
		const threshold = new Date();
		threshold.setDate(threshold.getDate() - DAYS_BACK);

		const result = await pb.collection('movies').getList(1, LIMIT, {
			sort: '-releaseDate', // newest first
			filter: `releaseDate >= "${threshold.toISOString()}"`,
			$autoCancel: false
		});

		upcoming = result.items; // drives the UI
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
	<MovieCarousel movies={upcoming} />
</div>
