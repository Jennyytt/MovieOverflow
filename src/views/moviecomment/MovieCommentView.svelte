<script>
	import posterImage from '../../assets/movie-poster-xl.png';
	import { ArrowDownWideNarrow, ArrowUpNarrowWide } from '@lucide/svelte';
	import LargerCommentCard from '$lib/customComponents/comment/LargerCommentCard.svelte';
	import MovieComCR from '$lib/customComponents/movie/MovieComCR.svelte';

	// Mock comments data for LargerCommentCard
	let comments = [
		{
			id: 1,
			username: 'Alex Johnson',
			date: 'Feb 15, 2025',
			commentText:
				'Harrison Ford steals the show! This movie is a thrilling ride with epic action scenes. I loved every minute of it, especially the final battle sequence which was absolutely breathtaking and kept me on the edge of my seat for the entire time. The character development was also top-notch, making this one of the best MCU films yet.'
		},
		{
			id: 2,
			username: 'Beth Carter',
			date: 'Feb 16, 2025',
			commentText: 'A bit predictable, but the visuals are stunning.'
		},
		{
			id: 3,
			username: 'Chris Davis',
			date: 'Feb 17, 2025',
			commentText: 'Loved the storytelling and character development. A great addition to the MCU!'
		},
		{
			id: 4,
			username: 'Diana Evans',
			date: 'Feb 18, 2025',
			commentText:
				'The pacing felt off at times, but the action sequences made up for it. Solid movie.'
		},
		{
			id: 5,
			username: 'Ethan Foster',
			date: 'Feb 19, 2025',
			commentText:
				'Captain America never disappoints! This one has some of the best fight scenes yet.'
		},
		{
			id: 6,
			username: 'Fiona Green',
			date: 'Feb 20, 2025',
			commentText:
				'A fun watch, but I wish they explored the side characters more. Still enjoyable.'
		},
		{
			id: 7,
			username: 'George Harris',
			date: 'Feb 21, 2025',
			commentText: 'Epic and action-packed! Harrison Ford as Red Hulk was a highlight for me.'
		},
		{
			id: 8,
			username: 'Hannah Ives',
			date: 'Feb 22, 2025',
			commentText:
				'Great visuals, but the plot felt a bit rushed. I’d still recommend it to MCU fans.'
		},
		{
			id: 9,
			username: 'Fiona Blue',
			date: 'Feb 20, 2025',
			commentText:
				'A fun watch, but I wish they explored the side characters more. Still enjoyable.'
		},
		{
			id: 10,
			username: 'Gedson Harrison',
			date: 'Feb 21, 2025',
			commentText: 'Epic and action-packed! Harrison Ford as Red Hulk was a highlight for me.'
		},
		{
			id: 11,
			username: 'Hannah Iverson',
			date: 'Feb 22, 2025',
			commentText:
				'Great visuals, but the plot felt a bit rushed. I’d still recommend it to MCU fans. Epic and action-packed! Harrison Ford as Red Hulk was a highlight for me. Great visuals, but the plot felt a bit rushed. I’d still recommend it to MCU fans. Epic and action-packed! Harrison Ford as Red Hulk was a highlight for me.'
		}
	];

	// State variable to track the number of comments to display
	let displayCount = 5;

	// State variable to track sort order ('descending' for newest to oldest, 'ascending' for oldest to newest)
	let sortOrder = 'descending';

	// Function to load more comments
	function loadMore() {
		displayCount += 5;
	}

	// Function to sort comments
	function sortComments() {
		comments = comments.sort((a, b) => {
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
		sortComments();
	}

	// Sort comments on initial load
	sortComments();
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
						Captain America: Brave New World Comments
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
		<!-- Dynamically render comments based on displayCount with a key -->
		{#each comments.slice(0, displayCount) as comment (comment.id)}
			<LargerCommentCard
				username={comment.username}
				date={comment.date}
				commentText={comment.commentText}
			/>
		{/each}
		<!-- Conditionally render Load More button -->
		{#if displayCount < comments.length}
			<button
				type="button"
				on:click={loadMore}
				class="inline-flex h-[34.05px] w-[103.08px] cursor-pointer items-center justify-center gap-[10px] rounded-[4.6px] bg-[rgba(128,43,177,0.8)] px-[14px] py-2"
			>
				<span class="break-words font-['Inter'] text-[14.73px] font-medium text-white">
					Load More
				</span>
			</button>
		{/if}
	</div>
</div>
