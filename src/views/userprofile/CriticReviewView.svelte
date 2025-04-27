<script>
	import CriticReviewCard from '../../lib/customComponents/criticsreview/CriticReviewCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card } from '$lib/components/ui/card';
	let reviews = [
		{
			id: 1,
			date: 'Feb 15, 2025',
			review:
				'Harrison Ford steals the show! This super amazing movie is a thrilling ride with epic action scenes. I loved every minute of the movie, especially the final battle sequence which was absolutely breathtaking and kept me on the edge of my seat for the entire time. The character development was also top-notch, making this one of the best MCU films yet.'
		},
		{
			id: 2,
			date: 'Feb 16, 2025',
			review: 'A bit predictable, but the visuals are stunning.'
		},
		{
			id: 3,
			date: 'Feb 17, 2025',
			review: 'Loved the storytelling and character development. A great addition to the MCU!'
		},
		{
			id: 4,
			date: 'Feb 18, 2025',
			review: 'The pacing felt off at times, but the action sequences made up for it. Solid movie.'
		},
		{
			id: 5,
			date: 'Feb 19, 2025',
			review: 'Captain America never disappoints! This one has some of the best fight scenes yet.'
		},
		{
			id: 6,
			date: 'Feb 20, 2025',
			review:
				'An emotional rollercoaster! The character arcs were beautifully crafted, and the cinematography was stunning. A must-watch for MCU fans.'
		},
		{
			id: 7,
			date: 'Feb 21, 2025',
			review:
				'While the action scenes were great, the plot felt a bit predictable. Still, the performances made it worth watching.'
		},
		{
			id: 8,
			date: 'Feb 22, 2025',
			review:
				'The humor was spot on, and the chemistry between the characters was fantastic. One of the better MCU movies in recent years.'
		},
		{
			id: 9,
			date: 'Feb 23, 2025',
			review:
				'The pacing was a bit uneven, but the emotional payoff in the final act made up for it. A solid entry in the franchise.'
		},
		{
			id: 10,
			date: 'Feb 24, 2025',
			review:
				'Visually stunning and action-packed! The new characters were a great addition, and the story kept me engaged throughout.'
		}
	];
	let displayCount = 3; // Number of comments to display initially

	let sortMode = 'date';

	let sortOrder = 'descending'; // Default sort order

	function loadMore() {
		displayCount += 3; // Increase the number of displayed comments by 3
	}
	function sortReviews() {
		reviews = reviews.sort((a, b) => {
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
			}
		});
	}

	// Sort comments on initial load
	sortReviews();
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1100px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">
				Previous Critics Reviews
			</div>
		</div>
	</div>
	<Card
		class="margin-top-[20px] relative box-border w-[1100px] overflow-hidden rounded-[10px] border-[#222222] bg-[#000000]"
	>
		<div
			class="margin-top-[20px] relative flex w-[1100px] flex-shrink-0 flex-col items-center justify-between gap-[10px] self-stretch"
		>
			{#each reviews.slice(0, displayCount) as review, index (review.id)}
				<div class="relative h-[10px]"></div>
				<CriticReviewCard date={review.date} review={review.review} />
				{#if index < displayCount - 1 && index < reviews.length - 1}
					<div class="relative h-[1px] w-[1048px] bg-[#222222]"></div>
				{:else}
					<div class="relative h-[20px]"></div>
					<!-- Empty spacing for the last review -->
				{/if}
			{/each}
		</div>
	</Card>
	<!-- Conditionally render Load More button -->
	<div class="flex w-full justify-center">
		{#if displayCount < reviews.length}
			<Button
				type="button"
				onclick={loadMore}
				class="inline-flex h-[34.05px] w-[103.08px] cursor-pointer items-center justify-center gap-[10px] rounded-[4.6px] bg-[rgba(128,43,177,0.8)] px-[14px] py-2"
			>
				<span class="break-words text-[14.73px] font-medium text-white"> Load More </span>
			</Button>
		{/if}
	</div>
</div>
