<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Top10MovieCard from './Top10MovieCard.svelte';
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
			<!-- eslint-disable-next-line no-unused-vars -->
			{#each Array(10) as _, i (i)}
				<Carousel.Item class="flex items-start pl-3 md:basis-1/2 lg:basis-1/3">
					<!-- Ranking and purple line (horizontal) -->
					<div class="mr-2 flex items-center">
						<div class="text-2xl font-bold text-white">{i + 1}</div>
						<div
							class="relative ml-2 h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"
						></div>
					</div>
					<Top10MovieCard rank={i + 1} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Next />
	</div>
</Carousel.Root>
