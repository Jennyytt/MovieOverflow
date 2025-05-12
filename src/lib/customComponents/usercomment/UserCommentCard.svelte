<script>
	export let rating = 4;
	export let commentText =
		'I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight falcon deserves and it truly made me understand Steve’s decision and why he didn’t give the shield to Bucky.(Btw Anthony Mackie did a great job as a lead actor, lots of carisma i love it...';
	export let date = 'Feb 24, 2025';
	export let like_num = 100;
	export let dislike_num = 200;
	export let movieId = null; // Example movie ID, replace with actual data

	import { ThumbsUp, ThumbsDown } from '@lucide/svelte';
	import MovieInfo from '$lib/customComponents/movieinfo/MovieInfo.svelte';

	import pb from '$lib/pb';

	let title = 'Unknown Title';
	let year = 'Unknown Year';
	let stars = ['Unknown Actor'];

	// Fetch movie details when the component is mounted or movieId changes
	$: fetchMovieDetails();

	async function fetchMovieDetails() {
		if (!movieId) {
			console.warn('No movieId provided.');
			return;
		}

		try {
			const movie = await pb.collection('movies').getOne(movieId);

			// Update movie details
			title = movie.title || 'Unknown Title';
			year = movie.release_year || 'Unknown Year';
			stars = movie.stars || ['Unknown Actor'];
		} catch (err) {
			console.error('Error fetching movie details:', err);
		}
	}
</script>

<div class="relative flex w-[1048px] flex-col justify-center gap-8">
	<MovieInfo {title} {year} {stars} />
	<div class="relative flex w-[1048px] flex-row justify-start gap-8">
		<!-- Rate, Date, like & Dislike-->
		<div class="relative flex flex-col justify-start gap-2">
			<!-- Star rating -->
			<div class="relative h-[28px]">
				<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[18px]">
					{#each Array(5) as _, i}
						<svg
							class="relative aspect-square h-[5px] w-[5px] flex-shrink-0 overflow-visible transition-transform"
							fill="none"
							stroke="#FBC02D"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{#if i < rating && _ != -100}
								<path
									d="M10.0007 15.2167L4.12246 18.5068L5.43525 11.8999L0.489746 7.3265L7.17895 6.53335L10.0007 0.416656L12.8217 6.53335L19.5108 7.3265L14.5654 11.8999L15.8782 18.5068L10.0007 15.2167Z"
									fill="#FBC02D"
								/>
							{:else}
								<path
									d="M10.0007 15.2167L4.12246 18.5068L5.43525 11.8999L0.489746 7.3265L7.17895 6.53335L10.0007 0.416656L12.8217 6.53335L19.5108 7.3265L14.5654 11.8999L15.8782 18.5068L10.0007 15.2167ZM10.0007 13.3067L13.5392 15.2876L12.7488 11.3098L15.7264 8.55615L11.699 8.0786L10.0007 4.39584L8.30208 8.0786L4.27418 8.55615L7.25175 11.3098L6.46134 15.2876L10.0007 13.3067Z"
									fill="#FBC02D"
								/>
							{/if}
						</svg>
					{/each}
				</div>
			</div>
			<!-- Date -->
			<div class="h-[28px] text-left font-[18px] font-bold text-white">
				{date}
			</div>
			<!-- Like & Dislike buttons -->
			<div class="relative flex flex-row items-center justify-start gap-1">
				<ThumbsUp class="inline-block h-[28px] w-[28px] transition-colors" color="#FFFFFF" />
				<button class="text-white">{like_num}</button>
				<ThumbsDown class="inline-block h-[28px] w-[28px] transition-colors" color="#FFFFFF" />
				<button class="text-white">{dislike_num}</button>
			</div>
		</div>
		<!-- comment & full comment button-->
		<div class="relative flex flex-col justify-start gap-8">
			<!-- Review Text -->
			<div class="text-medium text-left font-[16px] text-white">
				{commentText}
			</div>
		</div>
	</div>
</div>
