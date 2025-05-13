<script>
	import Poster from '../../assets/movie-poster-xl.png';
	import pb from '$lib/pb';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// Accept props
	export let query = '';
	export let movies = [];
	// export let totalCount = 0;
	export let error = null;

	// State
	let allMovies = [];
	let displayCount = 5;
	let previousQuery = '';

	// Check URL changes
	$: urlQuery = $page.url.searchParams.get('q') || '';

	$: if (urlQuery !== previousQuery) {
		query = urlQuery;
		previousQuery = urlQuery;
		displayCount = 5;

		// Perform a new search when URL query changes
		if (urlQuery) {
			searchMovies(urlQuery);
		} else {
			allMovies = []; // Clear results if no query
		}
	}

	// Initialize with either props or search when component mounts
	onMount(() => {
		// Reset any passed error if movies are available
		if (movies && movies.length > 0) {
			error = null; // Clear any server-side error if we have movies

			// Use the movies provided by props
			allMovies = movies.map((movie) => ({
				...movie,
				// Ensure poster field is properly set
				poster: movie.poster || Poster
			}));
			previousQuery = query; // Remember initial query
		} else if (query) {
			// If no movies were provided but we have a query, do our own search
			previousQuery = query;
			searchMovies(query);
		}
	});

	// Function to search movies from PocketBase
	async function searchMovies(searchQuery) {
		try {
			// Create a filter for PocketBase
			const filter = `title ~ "${searchQuery}" || directors ~ "${searchQuery}" || writers ~ "${searchQuery}" || stars ~ "${searchQuery}" || description ~ "${searchQuery}"`;

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
					// Use posterURL directly if available, otherwise try to generate URL
					poster: movie.posterURL || (movie.poster ? pb.files.getUrl(movie, movie.poster) : Poster),
					directors: movie.directors || ''
				}));
			} else {
				allMovies = [];
			}
		} catch (err) {
			console.error('Error searching movies:', err);
			allMovies = [];
		}
	}

	// Load more movies function
	function loadMore() {
		displayCount = Math.min(displayCount + 5, allMovies.length);
	}

	// Function to handle image errors
	function handleImageError(event) {
		event.target.src = Poster;
	}

	// Computed property for displayed movies
	$: displayedMovies = allMovies.slice(0, displayCount);
</script>

<div class="flex h-full w-[1170px] flex-col items-start justify-start gap-5">
	<div class="flex items-center justify-start gap-3 text-5xl font-bold text-white">
		Search Results for: {query}
	</div>
	<br />

	<!-- Header section -->
	<div class="flex items-center justify-start gap-3">
		<div class="h-[37px] w-[5px] rounded-[2px] bg-[#802BB1]"></div>
		<div class="text-3xl font-semibold text-white">Movies</div>
	</div>

	<!-- Movie results container -->
	<div
		class="flex flex-col items-start justify-start gap-[10px] self-stretch overflow-hidden rounded-[10px] border-[3px] border-[#222222] bg-transparent px-[84px] py-[57px]"
	>
		{#if displayedMovies.length === 0}
			<div class="flex w-full justify-center p-8 text-xl text-white">
				{#if query}
					No movies found matching "{query}"
				{:else}
					Please enter a search term
				{/if}
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center gap-[26px]">
				<div class="flex flex-col items-start justify-start gap-[10px] self-stretch">
					{#each displayedMovies as movie, index (movie.id)}
						<a href={`/movieprofile/${movie.id}`}>
							<div
								class="flex flex-col items-start justify-start gap-[10px] overflow-hidden bg-transparent"
							>
								<div class="flex items-center justify-start gap-[15px] self-stretch">
									<!-- Movie poster with error handling -->
									<div class="relative h-[138px] w-[92px]">
										<img
											class="absolute left-0 top-0 h-[138px] w-[92px] object-cover"
											src={movie.poster || Poster}
											alt={movie.title}
											on:error={handleImageError}
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
		{/if}
	</div>

	<!-- Load more button section -->
	<div class="relative h-[77px] self-stretch overflow-hidden">
		{#if displayCount < allMovies.length}
			<div
				class="absolute left-1/2 top-[22px] flex -translate-x-1/2 transform items-center justify-center rounded-[4.45px] bg-[rgba(128,43,177,0.8)] px-[13px] py-[8px]"
			>
				<button on:click={loadMore} class="text-[14.25px] font-medium text-white">
					Load More
				</button>
			</div>
		{/if}
	</div>
</div>
