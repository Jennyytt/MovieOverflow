// /routes/search/+page.js
import pb from '$lib/pb';

export async function load({ url }) {
	// Get search query from URL parameters
	const query = url.searchParams.get('q') || '';

	try {
		let searchResults = [];
		let totalCount = 0;

		if (query) {
			// Create a filter that searches across multiple fields
			const filter = `
        title ~ "${query}" || 
        directors ~ "${query}" || 
        writers ~ "${query}" ||
        stars ~ "${query}" ||
        description ~ "${query}"
      `;

			// Fetch movies from PocketBase
			const result = await pb.collection('movies').getList(1, 100, {
				filter: filter,
				sort: '-released' // Sort by release date, newest first
			});

			// Format the movie data for display
			searchResults = result.items.map((item) => ({
				id: item.id,
				title: item.title || 'Untitled',
				year: item.release_year || 'Unknown',
				cast: item.stars
					? Array.isArray(item.stars)
						? item.stars.join(', ')
						: item.stars
					: 'Cast unknown',
				poster: item.posterURL || null, // Will use default in component if null
				directors: item.directors
					? Array.isArray(item.directors)
						? item.directors.join(', ')
						: item.directors
					: '',
				description: item.description || ''
			}));

			totalCount = result.totalItems;
		}

		return {
			query,
			movies: searchResults,
			totalCount
		};
	} catch (error) {
		console.error('Error searching movies:', error);
		return {
			query,
			movies: [],
			totalCount: 0,
			error: 'Failed to fetch movies'
		};
	}
}
