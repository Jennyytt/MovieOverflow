<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import ReviewCard from '$lib/customComponents/ReviewCard.svelte';
</script>

<Carousel.Root
	opts={{
		align: 'start'
	}}
	class="relative w-[1170px] max-w-full"
>
	<div>
		<Carousel.Previous />
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
