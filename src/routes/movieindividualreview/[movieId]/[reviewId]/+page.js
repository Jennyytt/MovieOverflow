import pb from '$lib/pb';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const { movieId, reviewId } = params; // Ensure destructuring is correct

		// Fetch the specific review from Critics_Reviews
		const review = await pb.collection('critics_reviews').getOne(reviewId, {
			expand: 'userId,movieId' // Expand userId and movieId
		});

		// Verify the review is published and belongs to the correct movie
		if (review.isDraft || review.movieId !== movieId) {
			throw new Error('Review not found or not published');
		}

		// Format review data
		const formattedReview = {
			username: review.expand?.userId?.username || 'Unknown User',
			date: new Date(review.timestamp).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			reviewTitle: review.reviewTitle || 'Untitled Review',
			reviewText: review.reviewText,
			movie: {
				title: review.expand?.movieId?.title || 'Unknown Movie',
				rating: review.expand?.movieId?.certification || '',
				duration: review.expand?.movieId?.duration || '',
				posterImage: review.expand?.movieId?.posterURL || '',
				genre: review.expand?.movieId?.genres?.join(', ') || 'Unknown',
				directors: review.expand?.movieId?.directors?.join(', ') || 'Unknown',
				releaseDate: review.expand?.movieId?.releaseDate
					? new Date(review.expand.movieId.releaseDate).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})
					: 'Unknown'
			}
		};

		return {
			review: formattedReview,
			movieId, // Include movieId in the return object
			reviewId // Include reviewId in the return object
		};
	} catch (error) {
		console.error('Error loading review:', error);
		return {
			error: error.message,
			movieId: params.movieId, // Use params.movieId here
			reviewId: params.reviewId // Use params.reviewId here
		};
	}
}
