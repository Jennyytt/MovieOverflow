<script>
	import MovieCommentView from '../../../views/moviecomment/MovieCommentView.svelte';
	export let data;
</script>

{#if data.error}
	<div class="flex h-screen items-center justify-center">
		<div class="rounded bg-red-500 p-6 text-white">
			<h2 class="text-2xl font-bold">Error Loading Comments</h2>
			<p>{data.error}</p>
		</div>
	</div>
{:else}
	<div class="m-0 flex min-h-screen w-full flex-col items-center p-0">
		<div class="mt-8">
			<MovieCommentView comments={data.comments} movie={data.movie} />
		</div>
	</div>
{/if}
