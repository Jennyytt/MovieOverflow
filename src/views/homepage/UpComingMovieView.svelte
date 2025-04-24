<script>
	import MovieCarousel from '$lib/customComponents/movie/MovieCarousel.svelte';
	import { AlarmClock } from '@lucide/svelte';
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<AlarmClock color="#A508FF" size={45} />
			<div class="relative text-left text-[32px] font-semibold text-white">Up Coming</div>
		</div>
	</div>

	<MovieCarousel />
</div>
