<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import MovieCard from './MovieCard.svelte';
</script>

<Carousel.Root
	opts={{
		align: 'start'
	}}
	class="relative left-10 w-[1070px]  max-w-full pl-4"
>
	<div>
		<Carousel.Previous class="mx-[16px]" />
		<Carousel.Content class="-ml-4">
			<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars  -->
			{#each Array(7) as unusedItem, i (i)}
				<Carousel.Item class="pl-3 md:basis-1/4 lg:basis-1/5">
					<MovieCard />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Next />
	</div>
</Carousel.Root>
