<!-- /routes/movieprofile/[movieId]/+page.svelte -->
<script>
	import MovieInfoView from '../../../views/movieprofile/MovieInfoView.svelte';
	import ReviewCarouselView from '../../../views/movieprofile/ReviewCarouselView.svelte';
	import CommentCarouselView from '../../../views/movieprofile/CommentCarouselView.svelte';
	import MyRatingView from '../../../views/movieprofile/MyRatingView.svelte';
	import WatchOtherMoviesView from '../../../views/movieprofile/WatchOtherMoviesView.svelte';

	// Get data from the load function
	export let data;
</script>

{#if data.error}
	<div class="flex h-screen items-center justify-center">
		<div class="rounded bg-red-500 p-6 text-white">
			<h2 class="text-2xl font-bold">Error Loading Movie</h2>
			<p>{data.error}</p>
		</div>
	</div>
{:else}
	<div>
		<MovieInfoView movie={data.movie} movieId={data.movieId} />
		<br />
		<br />
		<ReviewCarouselView movieId={data.movieId} />
		<br />
		<br />
		<CommentCarouselView movieId={data.movieId} />
		<br />
		<br />
		<MyRatingView movieId={data.movieId} />
		<br />
		<br />
		<WatchOtherMoviesView />
	</div>
{/if}
