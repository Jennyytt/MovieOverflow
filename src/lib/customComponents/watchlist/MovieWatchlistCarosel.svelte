<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import MovieCard from './MovieCard.svelte';

	// Receive movie details as props
	export let movies = [];
	console.log('Movies:', { movies });
</script>

<Carousel.Root
	opts={{
		align: 'start'
	}}
	class="relative w-[1080px] max-w-full pl-4"
>
	<div>
		<Carousel.Previous class="mx-[8px]" />
		<Carousel.Content class="-ml-2">
			{#each movies as movie (movie.id)}
				<Carousel.Item class="pl-3 md:basis-1/4 lg:basis-1/5">
					<MovieCard
						title={movie.title || 'Unknown Title'}
						rating={movie.rating?.toString() || '0.0'}
						duration={movie.duration || 'N/A'}
						movieId={movie.id}
						posterURL={movie.posterURL}
					/>
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<Carousel.Next />
	</div>
</Carousel.Root>
