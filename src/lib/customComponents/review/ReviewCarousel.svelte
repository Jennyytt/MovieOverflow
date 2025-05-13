<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import ReviewCard from './ReviewCard.svelte';
	import pb from '$lib/pb';
	import { onMount } from 'svelte';

	export let movieId = undefined;

	let reviews = [];

	onMount(async () => {
		try {
			// Create a filter based on movieId if it's provided
			let filter = 'isDraft=false';
			if (movieId) {
				filter += ` && movieId="${movieId}"`;
			}

			const result = await pb.collection('critics_reviews').getList(1, 3, {
				filter: filter,
				sort: '-timestamp',
				expand: 'userId',
				$autoCancel: false
			});

			reviews = result.items.map((r) => ({
				id: r.id,
				movieId: r.movieId || movieId, // Use the review's movieId or the passed movieId
				username: r.expand?.userId?.username ?? 'Anonymous',
				content: r.reviewText,
				timestamp: r.timestamp
			}));
		} catch (err) {
			console.error('Failed to load reviews:', err);
		}
	});
</script>

<Carousel.Root opts={{ align: 'start' }} class="relative left-10 w-[1070px] max-w-full pl-4">
	<div>
		<Carousel.Previous class="mx-[16px]" />
		<Carousel.Content class="-ml-4">
			{#each reviews as review (review.id)}
				<Carousel.Item class="pl-4 md:basis-1/3 lg:basis-1/3">
					<ReviewCard
						username={review.username}
						reviewText={review.content}
						date={new Date(review.timestamp).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})}
						movieId={review.movieId || movieId}
						reviewId={review.id}
					/>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Next />
	</div>
</Carousel.Root>
