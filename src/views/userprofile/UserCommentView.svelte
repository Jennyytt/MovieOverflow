<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import UserCommentCard from '$lib/customComponents/usercomment/UserCommentCard.svelte';
	import { Card } from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/authStore';
	import pb from '$lib/pb';

	let comments = [];

	// Function to fetch comments for the logged-in user
	async function fetchComment() {
		try {
			// Check if the user is authenticated
			if (!$authStore.isAuthenticated) {
				console.error('User is not authenticated.');
				return;
			}

			// Get user ID from auth store
			const userId = $authStore.user.id;
			// Fetch comments for this user from the 'rating_comments' collection
			const commentRecords = await pb
				.collection('ratings_comments')
				.getFullList(`userId = "${userId}"`);

			// Map the fetched records to the desired format
			comments = commentRecords.map((record) => ({
				id: record.id,
				movieId: record.movieId,
				date: new Date(record.timestamp).toLocaleDateString('en-CA'),
				rating: record.rating,
				commentText: record.commentText
			}));
		} catch (err) {
			console.error('Error fetching comments:', err);
		}
	}

	// Fetch comments on component mount
	onMount(fetchComment);

	/*let comments = [
		{
			id: 1,
			date: 'Feb 15, 2025',
			rating: 5,
			like_num: 120,
			dislike_num: 10,
			commentText:
				'I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight falcon deserves and it truly made me understand Steve’s decision and why he didn’t give the shield to Bucky.(Btw Anthony Mackie did a great job as a lead actor, lots of carisma i love it.'
		},
		{
			id: 2,
			date: 'Feb 16, 2025',
			rating: 4,
			like_num: 95,
			dislike_num: 20,
			commentText:
				'Great visuals and solid performances, but the pacing felt a bit off in the middle.'
		},
		{
			id: 3,
			date: 'Feb 17, 2025',
			rating: 3,
			like_num: 80,
			dislike_num: 35,
			commentText:
				'It was an okay movie. Some parts were predictable, but the humor and action made up for it.'
		},
		{
			id: 4,
			date: 'Feb 18, 2025',
			rating: 2,
			like_num: 50,
			dislike_num: 60,
			commentText:
				'The plot was weak, and the characters felt underdeveloped. Not the best MCU movie.'
		},
		{
			id: 5,
			date: 'Feb 19, 2025',
			rating: 1,
			like_num: 30,
			dislike_num: 90,
			commentText:
				'Disappointed with this one. The story lacked depth, and the action scenes couldn’t save it.'
		},
		{
			id: 6,
			date: 'Feb 20, 2025',
			rating: 5,
			like_num: 150,
			dislike_num: 5,
			commentText:
				'An emotional and action-packed masterpiece! One of the best movies I’ve seen in years.'
		},
		{
			id: 7,
			date: 'Feb 21, 2025',
			rating: 4,
			like_num: 110,
			dislike_num: 15,
			commentText:
				'The performances were top-notch, and the visuals were stunning. A great addition to the MCU.'
		},
		{
			id: 8,
			date: 'Feb 22, 2025',
			rating: 3,
			like_num: 70,
			dislike_num: 40,
			commentText:
				'It was a decent movie, but it didn’t live up to the hype. The ending felt rushed.'
		},
		{
			id: 9,
			date: 'Feb 23, 2025',
			rating: 2,
			like_num: 40,
			dislike_num: 75,
			commentText:
				'The action scenes were good, but the story was all over the place. Not my favorite.'
		},
		{
			id: 10,
			date: 'Feb 24, 2025',
			rating: 1,
			like_num: 20,
			dislike_num: 100,
			commentText: 'Terrible movie. The plot made no sense, and the characters were poorly written.'
		}
	];*/

	let displayCount = 3; // Number of comments to display initially

	let sortMode = 'date';

	let sortOrder = 'descending'; // Default sort order

	function loadMore() {
		displayCount += 3; // Increase the number of displayed comments by 3
	}

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
			}
		});
	}

	// Sort comments on initial load
	sortComments();
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1100px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">User Comments</div>
		</div>
	</div>
	<Card
		class="margin-top-[20px] relative box-border w-[1100px] overflow-hidden rounded-[10px] border-[#222222] bg-[#000000]"
	>
		<div
			class="margin-top-[20px] relative flex w-[1100px] flex-shrink-0 flex-col items-center justify-between gap-[10px] self-stretch"
		>
			{#each comments.slice(0, displayCount) as comment, index (comment.id)}
				<div class="relative h-[10px]"></div>
				<UserCommentCard
					rating={comment.rating}
					movieId={comment.movieId}
					like_num={comment.like_num}
					dislike_num={comment.dislike_num}
					commentText={comment.commentText}
					date={comment.date}
				/>
				{#if index < displayCount - 1 && index < comments.length - 1}
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
		{#if displayCount < comments.length}
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
