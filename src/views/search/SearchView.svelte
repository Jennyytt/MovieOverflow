<script>
	import Poster from '../../assets/movie-poster-xl.png';
	// Dummy movie data
	let allMovies = $state([
		{
			id: 1,
			title: 'Captain America: Brave New World',
			year: '2025',
			cast: 'Anthony Mackie, Harrison Ford, Tim Blake Nelson',
			poster: Poster
		},
		{
			id: 2,
			title: 'The Avengers: Secret Wars',
			year: '2026',
			cast: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
			poster: Poster
		},
		{
			id: 3,
			title: 'Black Panther: Wakanda Forever',
			year: '2024',
			cast: "Letitia Wright, Lupita Nyong'o, Danai Gurira",
			poster: Poster
		},
		{
			id: 4,
			title: 'Thor: Love and Thunder',
			year: '2023',
			cast: 'Chris Hemsworth, Natalie Portman, Tessa Thompson',
			poster: Poster
		},
		{
			id: 5,
			title: 'Doctor Strange: Multiverse of Madness',
			year: '2022',
			cast: 'Benedict Cumberbatch, Elizabeth Olsen, Xochitl Gomez',
			poster: Poster
		},
		{
			id: 6,
			title: 'Spider-Man: No Way Home',
			year: '2021',
			cast: 'Tom Holland, Zendaya, Benedict Cumberbatch',
			poster: Poster
		},
		{
			id: 7,
			title: 'Eternals',
			year: '2021',
			cast: 'Gemma Chan, Richard Madden, Angelina Jolie',
			poster: Poster
		},
		{
			id: 8,
			title: 'Shang-Chi and the Legend of the Ten Rings',
			year: '2021',
			cast: 'Simu Liu, Awkwafina, Tony Leung',
			poster: Poster
		},
		{
			id: 9,
			title: 'Black Widow',
			year: '2021',
			cast: 'Scarlett Johansson, Florence Pugh, David Harbour',
			poster: Poster
		},
		{
			id: 10,
			title: 'Guardians of the Galaxy Vol. 3',
			year: '2023',
			cast: 'Chris Pratt, Zoe Saldana, Dave Bautista',
			poster: Poster
		},
		{
			id: 11,
			title: 'Guardians of the Galaxy Vol. 3',
			year: '2023',
			cast: 'Chris Pratt, Zoe Saldana, Dave Bautista',
			poster: Poster
		},
		{
			id: 12,
			title: 'Guardians of the Galaxy Vol. 3',
			year: '2023',
			cast: 'Chris Pratt, Zoe Saldana, Dave Bautista',
			poster: Poster
		}
	]);

	let displayCount = $state(5);

	// Display movie based on current count
	let displayedMovies = $derived(allMovies.slice(0, displayCount));

	// Load more movies function
	function loadMore() {
		displayCount = Math.min(displayCount + 5, allMovies.length);
	}
	// Dummy query
	let query = 'Avengers';
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
					<!-- Movie item -->
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
								<div class="self-stretch text-[15px] font-bold text-white">
									{movie.title}
								</div>
								<div class="self-stretch text-[15px] font-normal text-white">
									{movie.year}
								</div>
								<div class="self-stretch text-[15px] font-normal text-white">
									{movie.cast}
								</div>
							</div>
						</div>
					</div>

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
