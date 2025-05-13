<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import CommentCard from './CommentCard.svelte';
	import { onMount } from 'svelte';
	import pb from '$lib/pb';

	// Add movieId prop to receive from parent
	export let movieId;

	// State for comments
	let comments = [];
	let isLoading = true;
	let error = null;

	// Function to fetch comments from backend
	async function fetchComments() {
		try {
			isLoading = true;

			// Fetch comments from Ratings_Comments, filtering by movieId
			const result = await pb.collection('ratings_comments').getList(1, 10, {
				filter: `movieId = "${movieId}"`,
				expand: 'userId', // Expand userId for username
				sort: '-timestamp' // Default sort by timestamp descending (newest first)
			});

			// Format the comments data for the frontend
			comments = result.items.map((comment) => ({
				id: comment.id,
				username: comment.expand?.userId?.username || 'Unknown User',
				date: new Date(comment.timestamp).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				}),
				commentText: comment.commentText || 'No comment provided.',
				rating: comment.rating || 0
			}));

			isLoading = false;
		} catch (err) {
			console.error('Error fetching comments:', err);
			error = err.message;
			isLoading = false;
		}
	}

	// Fetch comments when component mounts
	onMount(() => {
		if (movieId) {
			fetchComments();
		} else {
			console.error('No movieId provided to CommentCarousel');
			error = 'Missing movie ID';
			isLoading = false;
		}
	});
</script>

<Carousel.Root
	opts={{
		align: 'start'
	}}
	class="relative left-10 w-[1070px] max-w-full pl-4"
>
	<div>
		<Carousel.Previous class="mx-[16px]" />
		<Carousel.Content class="-ml-4">
			{#if isLoading}
				<!-- Show loading placeholders -->
				<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars -->
				{#each Array(3) as _, i (i)}
					<Carousel.Item class="pl-3 md:basis-1/3 lg:basis-1/3">
						<div class="h-[285px] w-[346px] animate-pulse rounded-[10px] bg-gray-800"></div>
					</Carousel.Item>
				{/each}
			{:else if error}
				<!-- Show error message -->
				<Carousel.Item class="md:basis-1/1 lg:basis-1/1 pl-3">
					<div
						class="flex h-[285px] w-[346px] items-center justify-center rounded-[10px] bg-[#222222] p-4 text-white"
					>
						<p>Error loading comments: {error}</p>
					</div>
				</Carousel.Item>
			{:else if comments.length === 0}
				<!-- Show message when no comments available -->
				<Carousel.Item class="md:basis-1/1 lg:basis-1/1 pl-3">
					<div
						class="flex h-[285px] w-[346px] items-center justify-center rounded-[10px] bg-[#222222] p-4 text-white"
					>
						<p>No comments available for this movie.</p>
					</div>
				</Carousel.Item>
			{:else}
				<!-- Show actual comments -->
				{#each comments as comment (comment.id)}
					<Carousel.Item class="pl-3 md:basis-1/3 lg:basis-1/3">
						<CommentCard
							username={comment.username}
							commentText={comment.commentText}
							date={comment.date}
							commentId={comment.id}
							{movieId}
						/>
					</Carousel.Item>
				{/each}
			{/if}
		</Carousel.Content>

		<Carousel.Next />
	</div>
</Carousel.Root>
