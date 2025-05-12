import pb from '$lib/pb';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		// Get movieId from URL parameters
		const { movieId } = params;

		// Fetch movie details from PocketBase
		const movie = await pb.collection('movies').getOne(movieId);

		return {
			movie,
			movieId
		};
	} catch (error) {
		console.error('Error loading movie:', error);
		return {
			error: error.message,
			movieId: params.movieId
		};
	}
}
