<script>
	import SearchView from '../../views/search/SearchView.svelte';

	// In SvelteKit, data is provided as a prop automatically
	export let data;

	// Debug log to see what data we have
	console.log('Search page data:', data);
</script>

<div>
	<br />
	<SearchView query={data.query} />
	<br />
</div>
