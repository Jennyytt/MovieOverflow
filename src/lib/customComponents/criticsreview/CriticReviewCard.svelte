<script>
	import MovieInfo from '$lib/customComponents/movieinfo/MovieInfo.svelte';
	export let review =
		'I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight falcon deserves and it truly made me understand Steve’s decision and why he didn’t give the shield to Bucky.(Btw Anthony Mackie did a great job as a lead actor, lots of carisma i love it...';
	export let date = 'Feb 24, 2025';

	export let movieId = 'movieId'; // Replace with actual movie ID if needed

	import pb from '$lib/pb';

	let title = 'Unknown Title';
	let year = 'Unknown Year';
	let stars = ['Unknown Actor'];

	// Fetch movie details when the component is mounted or movieId changes
	$: {
		if (movieId) {
			fetchMovieDetails();
		}
	}

	async function fetchMovieDetails() {
		if (!movieId) {
			console.warn('No movieId provided.');
			return;
		}

		try {
			const movie = await pb.collection('movies').getOne(movieId);

			// Update movie details
			title = movie.title || 'Unknown Title';
			year = movie.release_year || 'Unknown Year';
			stars = movie.stars || ['Unknown Actor'];
		} catch (err) {
			console.error('Error fetching movie details:', err);
		}
	}
</script>

<div class="relative flex w-[1048px] flex-col justify-center gap-4">
	<MovieInfo {title} {year} {stars} />
	<!-- Review Text -->
	<div class="text-medium text-left font-[16px] text-white">
		{review}
	</div>
	<!-- Date & Full Review-->
	<div class="flex flex-row items-center justify-start gap-4">
		<div class="text-left font-[18px] font-bold text-white">
			{date}
		</div>
		<a class="text-left font-[18px] font-bold text-white underline" href="../movieindividualreview"
			>Full Review</a
		>
	</div>
</div>
