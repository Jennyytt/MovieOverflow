<script>
	import SearchView from '../../views/search/SearchView.svelte';

	// In SvelteKit, data is provided as a prop automatically
	export let data;
</script>

<div>
	<br />
	<SearchView
		query={data.query}
		movies={data.movies}
		totalCount={data.totalCount}
		error={data.error}
	/>
	<br />
</div>
