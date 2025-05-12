import pb from '$lib/pb';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const { movieId } = params;

		// Fetch published reviews from Critics_Reviews where isDraft = false
		const reviews = await pb.collection('critics_reviews').getList(1, 50, {
			filter: `movieId = "${movieId}" && isDraft = false`,
			expand: 'userId', // Expand userId to get username
			sort: '-timestamp' // Default sort: newest first
		});

		// Map reviews to the format expected by CriticsReviewView
		const formattedReviews = reviews.items.map((review) => ({
			id: review.id,
			username: review.expand?.userId?.username || 'Unknown User',
			date: new Date(review.timestamp).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			reviewTitle: review.reviewTitle || 'Untitled Review',
			reviewText: review.reviewText
		}));

		return {
			reviews: formattedReviews,
			movieId
		};
	} catch (error) {
		console.error('Error loading reviews:', error);
		return {
			error: error.message,
			movieId: params.movieId,
			reviews: []
		};
	}
}
