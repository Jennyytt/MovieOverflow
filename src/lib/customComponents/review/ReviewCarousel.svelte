<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import ReviewCard from './ReviewCard.svelte';
</script>

<Carousel.Root
	opts={{
		align: 'start'
	}}
	class="relative left-10 w-[1070px] max-w-full pl-4"
>
	<div>
		<Carousel.Previous class="mx-[16px]" />
		<Carousel.Content class="-ml-4">
			<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars  -->
			{#each Array(7) as unusedItem, i (i)}
				<Carousel.Item class="pl-4 md:basis-1/3 lg:basis-1/3">
					<ReviewCard />
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<Carousel.Next />
	</div>
</Carousel.Root>
