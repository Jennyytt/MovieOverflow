<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowDownWideNarrow, ArrowUpNarrowWide } from '@lucide/svelte';
	import LargerCommentCard from '$lib/customComponents/comment/LargerCommentCard.svelte';
	import MovieComCR from '$lib/customComponents/movie/MovieComCR.svelte';

	// Props passed from +page.svelte
	export let comments;
	export let movie;
	// Removed export let movieId since it's unused

	// State variable to track the number of comments to display
	let displayCount = 5;

	// State variable to track sort mode ('date' or 'rating')
	let sortMode = 'date';

	// State variable to track sort order ('descending' for newest/highest to oldest/lowest, 'ascending' for oldest/lowest to newest/highest)
	let sortOrder = 'descending';

	// Function to load more comments
	function loadMore() {
		displayCount += 5;
	}

	// Function to sort comments
	function sortComments() {
		comments = comments.sort((a, b) => {
			if (sortMode === 'date') {
				// Sort by date
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
			} else {
				// Sort by rating
				const ratingA = a.rating;
				const ratingB = b.rating;

				// Primary sorting: by rating
				if (sortOrder === 'descending') {
					if (ratingA > ratingB) return -1;
					if (ratingA < ratingB) return 1;
				} else {
					if (ratingA < ratingB) return -1;
					if (ratingA > ratingB) return 1;
				}
			}

			// Secondary sorting: by username (A to Z) for equal dates or ratings
			return a.username.localeCompare(b.username);
		});
	}

	// Function to toggle sort mode
	function toggleSortMode() {
		sortMode = sortMode === 'date' ? 'rating' : 'date';
		// Reset sortOrder to descending when switching modes
		sortOrder = 'descending';
		sortComments();
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
	{#if !movie}
		<div class="flex h-[600px] w-[418px] flex-col items-center justify-center">
			<span class="text-red-500">Error loading movie details</span>
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
						{movie?.title || 'Movie'} Comments
					</span>
				</div>
				<div class="flex items-center gap-[10px]">
					<div class="flex items-center">
						<span class="whitespace-nowrap text-[18.41px] font-semibold text-[#cccccc]">
							Sort By
						</span>
					</div>
					<div class="flex items-center gap-[6px]">
						<button
							type="button"
							on:click={toggleSortMode}
							aria-label={sortMode === 'date' ? 'Sort by rating' : 'Sort by date'}
							class="cursor-pointer border-none bg-transparent p-0"
						>
							<span class="text-[18.41px] font-semibold text-[#b693dc] underline">
								{sortMode === 'date' ? 'Date' : 'Rating'}
							</span>
						</button>
						<button
							type="button"
							on:click={toggleSortOrder}
							aria-label={sortOrder === 'descending'
								? `Sort by ${sortMode} ascending`
								: `Sort by ${sortMode} descending`}
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
		{#if comments.length === 0}
			<div class="flex h-[200px] items-center justify-center">
				<span class="text-[18.41px] text-white">No comments available for this movie.</span>
			</div>
		{:else}
			{#each comments.slice(0, displayCount) as comment (comment.id)}
				<LargerCommentCard
					username={comment.username}
					date={comment.date}
					commentText={comment.commentText}
					rating={comment.rating}
				/>
			{/each}
			{#if displayCount < comments.length}
				<Button
					type="button"
					on:click={loadMore}
					class="inline-flex h-[34.05px] w-[103.08px] cursor-pointer items-center justify-center gap-[10px] rounded-[4.6px] bg-[rgba(128,43,177,0.8)] px-[14px] py-2"
				>
					<span class="break-words text-[14.73px] font-medium text-white"> Load More </span>
				</Button>
			{/if}
		{/if}
	</div>
</div>
