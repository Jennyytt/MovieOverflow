<script>
	import { Card } from '$lib/components/ui/card';
	import { Star, Clock } from '@lucide/svelte';
	import MoviePosterCarousel from '../../../assets/movie-poster-carousel.png';
	export let rank = 1;
	export let title = `Tick Tick... Boom ${rank}`;
</script>

<div class="flex items-start">
	<!-- Poster -->
	<Card
		class="relative box-border h-[353px] w-[206px] overflow-hidden rounded-[10px] border-transparent bg-transparent"
	>
		<img src={MoviePosterCarousel} alt="Movie Poster" class="w-[206px] object-cover" />
	</Card>

	<!-- Title, Rating, Duration (on the right) -->
	<div class="ml-4 flex flex-col justify-start">
		<!-- Title -->
		<div
			style="color: white; font-size: 16px; font-family: Inter; font-weight: 500; word-wrap: break-word"
		>
			{title}
		</div>
		<!-- Rating and Duration -->
		<div class="mr-4 flex items-center">
			<Star class="relative h-4 w-5 pr-1" fill="#FBC02D" color="#FBC02D" />
			<div class="font-Inter font-bold text-white">7.5</div>
		</div>
		<div class="flex items-center">
			<Clock class="h-4 w-5 pr-1" color="#FBC02D" />
			<div class="font-Inter font-bold text-white">1h 55m</div>
		</div>
	</div>
</div>
