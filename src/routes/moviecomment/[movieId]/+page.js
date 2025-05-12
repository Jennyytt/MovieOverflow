import pb from '$lib/pb';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const { movieId } = params;

		// Fetch comments from Ratings_Comments, filtering by movieId
		const comments = await pb.collection('ratings_comments').getFullList({
			filter: `movieId = "${movieId}"`,
			expand: 'userId,movieId', // Expand userId for username and movieId for movie details
			sort: '-timestamp' // Default sort by timestamp descending (newest first)
		});

		// Format the comments data for the frontend
		const formattedComments = comments.map((comment) => ({
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

		// Fetch movie details for MovieComCR
		const movieRecord = await pb.collection('movies').getOne(movieId);
		const movie = {
			title: movieRecord.title || 'Untitled Movie',
			rating: movieRecord.certification || 'N/A',
			duration: movieRecord.duration || 'N/A',
			posterImage: movieRecord.posterURL || '', // Use posterURL directly
			genre:
				movieRecord.genres && Array.isArray(movieRecord.genres)
					? movieRecord.genres.join(', ')
					: 'Unknown',
			directors:
				movieRecord.directors && Array.isArray(movieRecord.directors)
					? movieRecord.directors.join(', ')
					: 'Unknown',
			releaseDate: movieRecord.releaseDate
				? new Date(movieRecord.releaseDate).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
					})
				: 'Unknown'
		};

		return {
			comments: formattedComments,
			movie,
			movieId
		};
	} catch (error) {
		console.error('Error loading comments:', error);
		return {
			error: error.message,
			comments: [],
			movie: null,
			movieId: params.movieId
		};
	}
}
