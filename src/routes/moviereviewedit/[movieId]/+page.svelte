<script>
	import ReviewEditView from '../../../views/moviereviewedit/ReviewEditView.svelte';
	import AuthGuard from '$lib/customComponents/authguard/AuthGuard.svelte';
	import pb from '$lib/pb';
	import { authStore } from '$lib/stores/authStore';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Get data from the load function
	const { data } = $props();

	// States
	let reviewId = $state(null);
	let initialTitle = $state('');
	let initialContent = $state('');
	let isLoading = $state(false);

	// Load existing review (if editing a draft)
	onMount(async () => {
		if (!$authStore.isAuthenticated) return;

		const userId = $authStore.user.id;
		const movieId = data.movieId;

		try {
			const result = await pb.collection('critics_reviews').getList(1, 1, {
				filter: `userId = "${userId}" && movieId = "${movieId}" && isDraft = true`,
				$autoCancel: false
			});

			if (result.items.length > 0) {
				const review = result.items[0];
				reviewId = review.id;
				initialTitle = review.title || '';
				initialContent = review.reviewText || '';
			}
		} catch (err) {
			console.error('Error loading draft:', err);
			toast.error('Failed to load draft');
		}
	});

	// Save draft
	async function saveDraft(title, content) {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to save a draft');
			return;
		}

		isLoading = true;

		try {
			const userId = $authStore.user.id;
			const movieId = data.movieId;
			const timestamp = new Date().toISOString();

			if (reviewId) {
				// Update existing draft
				await pb.collection('critics_reviews').update(
					reviewId,
					{
						title,
						reviewText: content,
						isDraft: true,
						timestamp
					},
					{ $autoCancel: false }
				);
				toast.success('Draft updated successfully');
			} else {
				// Create new draft
				const newReview = await pb.collection('critics_reviews').create(
					{
						userId,
						movieId,
						title,
						reviewText: content,
						isDraft: true,
						timestamp
					},
					{ $autoCancel: false }
				);
				reviewId = newReview.id;
				toast.success('Draft saved successfully');
			}

			// Update states
			initialTitle = title;
			initialContent = content;
		} catch (err) {
			console.error('Error saving draft:', err);
			toast.error('Failed to save draft');
		} finally {
			isLoading = false;
		}
	}

	// Publish review
	async function publishReview(title, content) {
		if (!$authStore.isAuthenticated) {
			toast.error('Please log in to publish a review');
			return;
		}

		isLoading = true;

		try {
			const userId = $authStore.user.id;
			const movieId = data.movieId;
			const timestamp = new Date().toISOString();

			if (reviewId) {
				// Update existing draft to published
				await pb.collection('critics_reviews').update(
					reviewId,
					{
						title,
						reviewText: content,
						isDraft: false,
						timestamp
					},
					{ $autoCancel: false }
				);
			} else {
				// Create new published review
				const newReview = await pb.collection('critics_reviews').create(
					{
						userId,
						movieId,
						title,
						reviewText: content,
						isDraft: false,
						timestamp
					},
					{ $autoCancel: false }
				);
				reviewId = newReview.id;
			}

			toast.success('Review published successfully');
			// Redirect to the individual review page
			await goto(`/movieindividualreview/${movieId}/${reviewId}`);
		} catch (err) {
			console.error('Error publishing review:', err);
			toast.error('Failed to publish review');
		} finally {
			isLoading = false;
		}
	}
</script>

<AuthGuard requireAuth={true} />

<div class="m-0 flex min-h-screen w-full flex-col items-center p-0">
	<div class="mt-8">
		<ReviewEditView
			{reviewId}
			{initialTitle}
			{initialContent}
			{isLoading}
			{saveDraft}
			{publishReview}
		/>
	</div>
</div>