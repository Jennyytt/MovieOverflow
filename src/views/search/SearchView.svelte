<script>
	import Poster from '../../assets/movie-poster-xl.png';
	import pb from '$lib/pb';
	import { goto } from '$app/navigation'; // Import goto for programmatic navigation

	// Get props in Svelte 5 style with destructuring
	let { query = 'Avengers' } = $props();

	// Debug log to see what we're receiving
	// console.log('SearchView props:', { query });

	// Movies state
	let allMovies = $state([]);
	let displayCount = $state(5);

	// Display movie based on current count
	let displayedMovies = $derived(allMovies.slice(0, displayCount));

	// Function to search movies from PocketBase
	async function searchMovies() {
		try {
			// Create a filter for PocketBase
			const filter = `title ~ "${query}" || directors ~ "${query}" || writers ~ "${query}" || stars ~ "${query}" || description ~ "${query}"`;

			// Fetch movies from PocketBase
			const result = await pb.collection('movies').getList(1, 50, {
				filter: filter,
				sort: '-created'
			});

			// Format results to match expected structure
			if (result && result.items && result.items.length > 0) {
				allMovies = result.items.map((movie) => ({
					id: movie.id,
					title: movie.title || 'Untitled',
					year: movie.releaseDate
						? new Date(movie.releaseDate).getFullYear().toString()
						: 'Unknown',
					cast: movie.stars || 'Cast not available',
					poster: movie.poster ? pb.files.getUrl(movie, movie.poster) : Poster
				}));
			} else {
				// console.log('No search results found for:', query);
				// If no results, use an empty array
				allMovies = [];
			}
		} catch (err) {
			console.error('Error searching movies:', err);
			// On error, keep empty array
			allMovies = [];
		}
	}

	// Load more movies function
	function loadMore() {
		displayCount = Math.min(displayCount + 5, allMovies.length);
	}

	// Function to navigate to movie profile
	// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
	function navigateToMovie(movieId) {
		goto(`/movieprofile/${movieId}`);
	}

	// Search when component mounts or when query changes
	$effect(() => {
		searchMovies();
	});
</script>

<div class="flex h-full w-[1170px] flex-col items-start justify-start gap-5">
	<div class="flex items-center justify-start gap-3 text-5xl font-bold text-white">
		Search Results for: {query}
	</div>
	<br />

	<!-- Header section with vertical purple bar -->
	<div class="flex items-center justify-start gap-3">
		<div class="h-[37px] w-[5px] rounded-[2px] bg-[#802BB1]"></div>
		<div class="text-3xl font-semibold text-white">Movies</div>
	</div>

	<!-- Movie results container -->
	<div
		class="flex flex-col items-start justify-start gap-[10px] self-stretch overflow-hidden rounded-[10px] border-[3px] border-[#222222] bg-transparent px-[84px] py-[57px]"
	>
		<div class="flex flex-col items-center justify-center gap-[26px]">
			<div class="flex flex-col items-start justify-start gap-[10px] self-stretch">
				{#each displayedMovies as movie, index (movie.id)}
					<!-- Movie item with correct link to movie profile -->
					<a href={`/movieprofile/${movie.id}`}>
						<div
							class="flex flex-col items-start justify-start gap-[10px] overflow-hidden bg-transparent"
						>
							<div class="flex items-center justify-start gap-[15px] self-stretch">
								<!-- Movie poster -->
								<div class="relative h-[138px] w-[92px]">
									<img
										class="absolute left-0 top-0 h-[138px] w-[92px]"
										src={movie.poster}
										alt={movie.title}
									/>
								</div>

								<!-- Movie details -->
								<div class="flex flex-col items-start justify-start">
									<div class="self-stretch font-bold text-white">
										{movie.title}
									</div>
									<div class="self-stretch font-normal text-white">
										{movie.year}
									</div>
									<div class="self-stretch font-normal text-white">
										{movie.cast}
									</div>
								</div>
							</div>
						</div>
					</a>

					<!-- Divider (except after the last item) -->
					{#if index < displayedMovies.length - 1}
						<div class="h-0 w-[1000px] self-stretch border-t-[3px] border-[#222222]"></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- Load more button section -->
	<div class="relative h-[77px] self-stretch overflow-hidden">
		{#if displayCount < allMovies.length}
			<div
				class="absolute left-1/2 top-[22px] flex -translate-x-1/2 transform items-center justify-center rounded-[4.45px] bg-[rgba(128,43,177,0.8)] px-[13px] py-[8px]"
			>
				<button onclick={loadMore} class="text-[14.25px] font-medium text-white">
					Load More
				</button>
			</div>
		{/if}
	</div>
</div>
