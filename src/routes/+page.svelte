<script>
	import TrendingMovieView from '../views/homepage/TrendingMovieView.svelte';
	import UpComingMovieView from '../views/homepage/UpComingMovieView.svelte';
	import LatestCriticsView from '../views/homepage/LatestCriticsView.svelte';
	import Top10MovieView from '../views/homepage/Top10MovieView.svelte';
	import BestMovieWithTopPicksView from '../views/homepage/BestMovieWithTopPicksView.svelte';
</script>

<div>
	<br />
	<br />
	<BestMovieWithTopPicksView />
	<br />
	<br />
	<TrendingMovieView />
	<br />
	<br />
	<UpComingMovieView />
	<br />
	<br />
	<LatestCriticsView />
	<br />
	<br />
	<Top10MovieView />
	<br />
	<br />
</div>
