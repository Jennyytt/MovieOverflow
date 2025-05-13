<script>
	import { onMount } from 'svelte';
	import { ArrowDownWideNarrow, ArrowUpNarrowWide } from '@lucide/svelte';
	import LargerReviewCard from '$lib/customComponents/review/LargerReviewCard.svelte';
	import MovieComCR from '$lib/customComponents/movie/MovieComCR.svelte';
	import pb from '$lib/pb';

	export let data;
	let { reviews, movieId } = data;

	// State for movie details with better fallbacks
	let movie = {
		title: 'Loading...',
		rating: 'N/A',
		duration: 'N/A',
		posterImage: '', // Placeholder for image URL
		genre: 'Unknown',
		directors: 'Unknown',
		releaseDate: 'Unknown'
	};

	// State to track loading and error status
	let isLoading = true;
	let fetchError = null;

	// State variable to track the number of reviews to display - initialized as reactive
	let displayCount = 5;

	// State variable to track sort order ('descending' for newest to oldest, 'ascending' for oldest to newest)
	let sortOrder = 'descending';

	// Fetch movie details
	async function fetchMovieDetails() {
		try {
			const record = await pb.collection('movies').getOne(movieId);
			movie = {
				title: record.title || 'Untitled Movie',
				rating: record.certification || 'N/A',
				duration: record.duration || 'N/A',
				posterImage: record.posterURL || '',
				genre: record.genres && Array.isArray(record.genres) ? record.genres.join(', ') : 'Unknown',
				directors:
					record.directors && Array.isArray(record.directors)
						? record.directors.join(', ')
						: 'Unknown',
				releaseDate: record.releaseDate
					? new Date(record.releaseDate).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})
					: 'Unknown'
			};

			await fetchReviewsWithDetails();
			isLoading = false;
		} catch (error) {
			console.error('Error fetching movie details:', error);
			fetchError = error.message;
			movie.title = 'Error loading movie';
			isLoading = false;
		}
	}

	// Fetch reviews with all details to ensure we have titles
	async function fetchReviewsWithDetails() {
		try {
			const result = await pb.collection('critics_reviews').getList(1, 50, {
				filter: `movieId = "${movieId}" && isDraft = false`,
				expand: 'userId',
				sort: '-timestamp'
			});

			// Map reviews with all fields, paying special attention to reviewTitle
			reviews = result.items.map((review) => ({
				id: review.id,
				username: review.expand?.userId?.username || 'Unknown User',
				date: new Date(review.timestamp).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				}),
				// Try multiple possible field names for the title
				reviewTitle:
					review.reviewTitle || review.title || review.heading || `Review of ${movie.title}`,
				reviewText: review.reviewText || review.content || review.text || ''
			}));

			// Sort reviews based on current sort order
			sortReviews();

			// Reset display count to show only first 5 reviews initially
			displayCount = 5;
		} catch (error) {
			console.error('Error fetching review details:', error);
		}
	}

	// Fetch movie details on client mount
	onMount(fetchMovieDetails);

	function loadMore() {
		displayCount += 5;
	}

	// Function to sort reviews
	function sortReviews() {
		reviews = reviews.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			// Primary sorting: by date
			if (sortOrder === 'descending') {
				if (dateA > dateB) return -1;
				if (dateA < dateB) return 1;
			} else {
				if (dateA < dateB) return -1;
				if (dateA > dateB) return 1;
			}

			// Secondary sorting: by username (A to Z) for equal dates
			return a.username.localeCompare(b.username);
		});
	}

	// Function to toggle sort order
	function toggleSortOrder() {
		sortOrder = sortOrder === 'descending' ? 'ascending' : 'descending';
		sortReviews();
	}
</script>

<div class="inline-flex h-full w-full gap-7">
	{#if isLoading}
		<div class="flex h-[600px] w-[418px] flex-col items-center justify-center">
			<span class="text-white">Loading movie details...</span>
		</div>
	{:else if fetchError}
		<div class="flex h-[600px] w-[418px] flex-col items-center justify-center">
			<span class="text-red-500">Error loading movie: {fetchError}</span>
		</div>
	{:else}
		<MovieComCR
			title={movie.title}
			rating={movie.rating}
			duration={movie.duration}
			posterImage={movie.posterImage}
			genre={movie.genre}
			directors={movie.directors}
			releaseDate={movie.releaseDate}
		/>
	{/if}
	<div class="inline-flex w-[723.9px] flex-col items-center justify-start gap-[15px]">
		<div class="flex flex-col gap-[10px] self-stretch">
			<div class="flex items-end justify-between gap-8 self-stretch">
				<div>
					<span
						class="break-words text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						{movie.title} Critics Review
					</span>
				</div>
				<div class="flex items-center gap-[10px]">
					<div class="flex items-center">
						<span class="whitespace-nowrap text-[18.41px] font-semibold text-[#cccccc]">
							Sort By
						</span>
					</div>
					<div class="flex items-center gap-[6px]">
						<span class="text-[18.41px] font-semibold text-[#b693dc] underline"> Date </span>
						<button
							type="button"
							on:click={toggleSortOrder}
							aria-label={sortOrder === 'descending'
								? 'Sort by date ascending'
								: 'Sort by date descending'}
							class="cursor-pointer"
						>
							{#if sortOrder === 'descending'}
								<ArrowDownWideNarrow class="h-[18.41px] w-[18.41px] stroke-[#B693DC]" fill="none" />
							{:else}
								<ArrowUpNarrowWide class="h-[18.41px] w-[18.41px] stroke-[#B693DC]" fill="none" />
							{/if}
						</button>
					</div>
				</div>
			</div>
			<div class="h-0 self-stretch border-[2.3px] border-[#222222]"></div>
		</div>
		{#if reviews.length === 0}
			<div class="flex h-40 w-full items-center justify-center text-white">
				<p>No reviews available for this movie.</p>
			</div>
		{:else}
			<div class="flex w-full flex-col items-center gap-4">
				{#each reviews.slice(0, displayCount) as review (review.id)}
					<LargerReviewCard
						username={review.username}
						date={review.date}
						reviewTitle={review.reviewTitle}
						reviewText={review.reviewText}
						{movieId}
						reviewId={review.id}
					/>
				{/each}

				{#if displayCount < reviews.length}
					<!-- Change to a plain HTML button for simplicity to rule out component issues -->
					<button
						on:click={loadMore}
						class="inline-flex h-[34.05px] w-[110px] cursor-pointer items-center justify-center gap-[10px] rounded-[4.6px] bg-[rgba(128,43,177,0.8)] px-[14px] py-[8px] text-white"
					>
						Load More
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
