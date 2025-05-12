// /routes/search/+page.js
export function load({ url }) {
	// Get search query from URL parameters
	const query = url.searchParams.get('q') || 'Avengers';

	// Debug log to see what query we're getting
	// console.log('Search query:', query);

	return {
		query
	};
}
