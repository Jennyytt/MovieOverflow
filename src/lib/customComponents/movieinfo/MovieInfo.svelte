<script>
	export let title = 'Captain America: Brave New World';
	export let year = '2025';
	export let stars = ['Anthony Mackie', 'Harrison Ford', 'Danny Ramirez'];
	import posterImage from '../../../assets/movie-poster-carousel.png';
</script>

<div class="relative flex flex-row items-start items-center justify-start gap-[15px] self-stretch">
	<!-- Movie Poster -->
	<img src={posterImage} alt="Movie Poster" class="h-[152px] w-[101px] object-cover" />

	<!-- Movie Title, Year, Stars -->
	<div class="flex flex-col items-start justify-start gap-2">
		<div class="text-[15px] font-bold tracking-[-0.02em] text-white">{title}</div>
		<div class="font-regular text-[15px] tracking-[-0.02em] text-white">{year}</div>
		<div class="flex flex-row items-center justify-start gap-2">
			{#each stars as star}
				<div class="font-regular text-[15px] tracking-[-0.02em] text-white">{star}</div>
			{/each}
		</div>
	</div>
</div>
