<!-- $lib/customComponents/watchlist/MovieCard.svelte -->
<script>
	import { Card } from '$lib/components/ui/card';
	import { Star, Clock, X } from '@lucide/svelte';
	import MoviePosterCarousel from '../../../assets/movie-poster-carousel.png';
	import { createEventDispatcher } from 'svelte';

	// Props for movie details
	export let title = 'Movie Title';
	export let rating = '7.5';
	export let duration = '1h 55m';

	export let movieId = '';
	// eslint-disable-next-line svelte/valid-compile
	export let watchlistId = null;

	export let posterURL = null;

	// Create event dispatcher
	const dispatch = createEventDispatcher();

	// Function to remove from watchlist
	function removeFromWatchlist(event) {
		event.preventDefault(); // Prevent navigation
		event.stopPropagation(); // Stop event bubbling

		// Dispatch event with the movie ID to remove
		dispatch('removed', { movieId });
	}
</script>

<Card
	class="relative box-border h-[353px] w-[206px] overflow-hidden rounded-[10px] border-transparent bg-transparent"
>
	<!-- Remove button -->
	<button
		class="absolute right-2 top-2 z-10 rounded-full bg-black bg-opacity-50 p-1"
		onclick={removeFromWatchlist}
	>
		<X size={16} class="text-white" />
	</button>

	<a href={movieId ? `../movieprofile/${movieId}` : '../movieprofile'}>
		<!-- TODO: use poster from database-->
		<img src={MoviePosterCarousel || posterURL} alt="Movie Poster" class="w-[206px] object-cover" />

		<div class="flex w-full items-center">
			<!-- rating-->
			<div class="flex basis-1/2 items-center justify-center">
				<Star class="relative h-4 w-5 pr-1" fill="#FBC02D" color="#FBC02D" />
				<div class="font-Inter font-bold text-white">{rating}</div>
			</div>
			<!-- duration -->
			<div class="flex basis-1/2 items-center justify-center">
				<Clock class="h-4 w-5 pr-1" color="#FBC02D" />
				<div class="font-Inter font-bold text-white">{duration}</div>
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
	</a>
</Card>
