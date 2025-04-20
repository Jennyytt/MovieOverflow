<script>
	import MovieInfo from '$lib/customComponents/movieinfo/MovieInfo.svelte';
	export let review =
		'I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight falcon deserves and it truly made me understand Steve’s decision and why he didn’t give the shield to Bucky.(Btw Anthony Mackie did a great job as a lead actor, lots of carisma i love it...';
	export let date = 'Feb 24, 2025';
</script>

<div class="relative flex w-[1048px] flex-col justify-center gap-8">
	<MovieInfo />
	<!-- Review Text -->
	<div class="text-medium text-left font-[16px] text-white">
		{review}
	</div>
	<!-- Date & Full Review-->
	<div class="flex flex-row items-center justify-start gap-4">
		<div class="text-left font-[18px] font-bold text-white">
			{date}
		</div>
		<div class="text-left font-[18px] font-bold text-white underline">Full Review</div>
	</div>
</div>
