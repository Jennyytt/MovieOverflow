import pb from '$lib/pb';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const { movieId } = params;
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