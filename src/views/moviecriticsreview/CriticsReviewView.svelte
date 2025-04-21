<script>
	import posterImage from '../../assets/movie-poster-xl.png';
	import { ArrowDownWideNarrow, ArrowUpNarrowWide } from '@lucide/svelte';
	import LargerReviewCard from '$lib/customComponents/review/LargerReviewCard.svelte';
	import MovieComCR from '$lib/customComponents/movie/MovieComCR.svelte';

	// Mock reviews data tailored to LargerReviewCard props
	let reviews = [
		{
			id: 1,
			username: 'John Smith',
			date: 'Feb 15, 2025',
			reviewTitle: 'Thrilling Marvel Adventure',
			reviewText:
				'A thrilling continuation of the Captain America saga with strong performances and exciting action scenes.'
		},
		{
			id: 2,
			username: 'Emma Watson',
			date: 'Feb 16, 2025',
			reviewTitle: 'Solid but Predictable',
			reviewText:
				'Solid action sequences but the plot feels predictable at times. Still worth a watch for Marvel fans.'
		},
		{
			id: 3,
			username: 'Michael Cheng',
			date: 'Feb 17, 2025',
			reviewTitle: 'Epic and Unmissable',
			reviewText:
				'An epic adventure that delivers on all fronts! The visuals and storytelling are top-notch.'
		},
		{
			id: 4,
			username: 'Sarah Johnson',
			date: 'Feb 18, 2025',
			reviewTitle: 'Lacking Depth',
			reviewText:
				'Disappointing compared to previous entries; lacks emotional depth but has decent action.'
		},
		{
			id: 5,
			username: 'David Lee',
			date: 'Feb 19, 2025',
			reviewTitle: 'Visually Stunning',
			reviewText: 'Visually stunning with a compelling narrative. A great addition to the MCU.'
		},
		{
			id: 6,
			username: 'Laura Adams',
			date: 'Feb 20, 2025',
			reviewTitle: 'Good but Flawed',
			reviewText: 'Decent but forgets some key character arcs. The action keeps it engaging.'
		},
		{
			id: 7,
			username: 'Tom Brown',
			date: 'Feb 21, 2025',
			reviewTitle: 'Action-Packed Fun',
			reviewText: 'A must-see for Marvel fans, packed with action and great moments.'
		},
		{
			id: 8,
			username: 'Lisa Wong',
			date: 'Feb 22, 2025',
			reviewTitle: 'Great Visuals, Uneven Pacing',
			reviewText: 'Great visuals but the pacing could be improved. Still an enjoyable film.'
		},
		{
			id: 9,
			username: 'Laura Kate',
			date: 'Feb 20, 2025',
			reviewTitle: 'Good but Flawed',
			reviewText: 'Decent but forgets some key character arcs. The action keeps it engaging.'
		},
		{
			id: 10,
			username: 'Tommy Kebab',
			date: 'Feb 21, 2025',
			reviewTitle: 'Action-Packed Fun',
			reviewText: 'A must-see for Marvel fans, packed with action and great moments.'
		},
		{
			id: 11,
			username: 'Lisa Wang',
			date: 'Feb 22, 2025',
			reviewTitle: 'Great Visuals, Uneven Pacing',
			reviewText: 'Great visuals but the pacing could be improved. Still an enjoyable film.'
		}
	];

	// State variable to track the number of reviews to display
	let displayCount = 5;

	// State variable to track sort order ('descending' for newest to oldest, 'ascending' for oldest to newest)
	let sortOrder = 'descending';

	// Function to load more reviews
	function loadMore() {
		displayCount += 5;
	}

	// Function to sort reviews
	function sortReviews() {
		reviews = reviews.sort((a, b) => {
			// Convert date strings (e.g., "Feb 15, 2025") to Date objects for comparison
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

	// Sort reviews on initial load
	sortReviews();
</script>

<div class="inline-flex h-full w-full gap-7">
	<MovieComCR
		title="Captain America: Brave New World"
		rating="IIA"
		duration="1h 58m"
		{posterImage}
		genre="Action, Adventure, Fantasy"
		director="Julius Onah"
		releaseDate="Feb 14, 2025"
	/>
	<div class="inline-flex w-[723.9px] flex-col items-center justify-start gap-[15px]">
		<div class="flex flex-col gap-[10px] self-stretch">
			<div class="flex items-end justify-between gap-8 self-stretch">
				<div>
					<span
						class="break-words font-['Inter'] text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						Captain America: Brave New World Critics Review
					</span>
				</div>
				<div class="flex items-center gap-[10px]">
					<div class="flex items-center">
						<span
							class="whitespace-nowrap font-['Inter'] text-[18.41px] font-semibold text-[#cccccc]"
						>
							Sort By
						</span>
					</div>
					<div class="flex items-center gap-[6px]">
						<span class="font-['Inter'] text-[18.41px] font-semibold text-[#b693dc] underline">
							Date
						</span>
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
		<!-- Dynamically render reviews based on displayCount with a key -->
		{#each reviews.slice(0, displayCount) as review (review.id)}
			<LargerReviewCard
				username={review.username}
				date={review.date}
				reviewTitle={review.reviewTitle}
				reviewText={review.reviewText}
			/>
		{/each}
		<!-- Conditionally render Load More button -->
		{#if displayCount < reviews.length}
			<button
				type="button"
				on:click={loadMore}
				class="inline-flex h-[34.05px] w-[103.08px] cursor-pointer items-center justify-center gap-[10px] rounded-[4.6px] bg-[rgba(128,43,177,0.8)] px-[14px] py-[8px]"
			>
				<span class="break-words font-inter text-[14.73px] font-medium text-white">Load More</span>
			</button>
		{/if}
	</div>
</div>
