<script>
	import MovieDetails from '$lib/customComponents/movieprofile/MovieDetailedInfo.svelte';
	import MovieTopInfo from '$lib/customComponents/movieprofile/MovieTopInfo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Check } from 'radix-icons-svelte';

	const {
		movie,
		isInWatchlist = false,
		hasNotification = false,
		isLoading = false,
		toggleWatchlist = () => {},
		toggleReminder = () => {}
	} = $props();
</script>

<div>
	<MovieTopInfo
		title={movie.title}
		year={movie.release_year?.toString() ?? ''}
		rating={movie.certification ?? ''}
		duration={movie.duration ?? ''}
		score={movie.rating?.toString() ?? '0'}
		posterURL={movie.posterURL}
		trailerURL={movie.trailerURL}
	/>
	<br />
	<!-- Make the button more verbose to debug -->
	<Button
		onclick={toggleWatchlist}
		class="flex h-[42px] w-[227px] items-center justify-center gap-3 rounded-[20px] px-8 py-[11px]"
		disabled={isLoading}
	>
		{#if isInWatchlist === true}
			<Check class="h-5 w-5" />
			<span class="text-left text-base font-bold">In Watchlist</span>
		{:else}
			<Plus class="h-5 w-5" />
			<span class="text-left text-base font-bold">Add to Watchlist</span>
		{/if}
	</Button>
	<br />
	<MovieDetails {movie} {hasNotification} {isLoading} {toggleReminder} />
</div>
