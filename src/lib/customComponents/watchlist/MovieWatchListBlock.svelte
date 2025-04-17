<script>
	import MovieCard from './MovieCard.svelte';
	import { Card } from '$lib/components/ui/card';
</script>

<Card
	class="relative box-border h-[419px] w-[1100px] overflow-hidden rounded-[10px] border-[#222222] bg-[#000000]"
>
	<div
		class="absolute left-[20px] top-1/2 flex -translate-y-1/2 flex-row items-baseline justify-start gap-2"
	>
		<MovieCard />
		<MovieCard />
		<MovieCard />
		<MovieCard />
		<MovieCard />
	</div>
</Card>
