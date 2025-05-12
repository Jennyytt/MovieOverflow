<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Star, Clock } from '@lucide/svelte';

	// record comes from the parent
	export let movie;

	//  ✅ new logic: use posterURL directly
	const posterUrl = movie?.posterURL ?? '/placeholder-poster.png';
</script>

<Card
	class="relative h-[370px] w-[206px] overflow-hidden rounded-[10px] border-transparent bg-transparent"
>
	<img src={posterUrl} alt={movie.title} class="h-[308px] w-[206px] object-cover" />

	<div class="flex w-full items-center py-1">
		<!-- rating -->
		<div class="flex basis-1/2 items-center justify-center">
			<Star class="h-4 w-5 pr-1" fill="#FBC02D" color="#FBC02D" />
			<span class="font-inter font-bold text-white">{movie.rating}</span>
		</div>
		<!-- duration -->
		<div class="flex basis-1/2 items-center justify-center">
			<Clock class="h-4 w-5 pr-1" color="#FBC02D" />
			<span class="font-inter font-bold text-white">{movie.duration}</span>
		</div>
	</div>

	<!-- title -->
	<div class="w-full truncate px-1 text-center text-[16px] font-medium text-white">
		{movie.title}
	</div>
</Card>
