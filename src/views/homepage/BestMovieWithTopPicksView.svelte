<script>
	import BestMoviePoster from '$lib/customComponents/movie/BestMoviePoster.svelte';
	import TopPicksList from '$lib/customComponents/movie/TopPicksList.svelte';
</script>

<div class="relative flex flex-shrink-0 flex-row items-start justify-center gap-6 self-stretch">
	<!-- Left: Best Movie Poster -->
	<div class="flex-1">
		<BestMoviePoster />
	</div>
	<!-- Right: Top Picks List -->
	<div class="w-[300px]">
		<TopPicksList />
	</div>
</div>
