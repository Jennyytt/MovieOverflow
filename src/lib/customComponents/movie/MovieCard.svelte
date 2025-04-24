<script>
	import { Card } from '$lib/components/ui/card';
	import { Star, Clock } from '@lucide/svelte';
	import MoviePosterCarousel from '../../../assets/movie-poster-carousel.png';
	export let title = 'Captain America: Brave ...';
</script>

<Card
	class="relative box-border h-[353px] w-[206px] overflow-hidden rounded-[10px] border-transparent bg-transparent"
>
	<img src={MoviePosterCarousel} alt="Movie Poster" class=" w-[206px] object-cover" />
	<div class="flex w-full items-center">
		<!-- rating-->
		<div class="flex basis-1/2 items-center justify-center">
			<Star class="relative h-4 w-5 pr-1" fill="#FBC02D" color="#FBC02D" />
			<div class="font-Inter font-bold text-white">4.1</div>
		</div>
		<!-- duration -->
		<div class="flex basis-1/2 items-center justify-center">
			<Clock class="h-4 w-5 pr-1" color="#FBC02D" />
			<div class="font-Inter font-bold text-white">1h 55m</div>
		</div>
	</div>
	<div>
		<!-- title -->
		<div
			style="width: 100%; text-align: center; color: white; font-size: 16px; font-family: Inter; font-weight: 500; word-wrap: break-word"
		>
			{title}
		</div>
	</div>
</Card>
