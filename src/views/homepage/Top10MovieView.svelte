<script>
	import Top10Carousel from '$lib/customComponents/movie/Top10Carousel.svelte';
	import { Trophy } from '@lucide/svelte';
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and trophy icon -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<Trophy color="#A508FF" size={45} />
			<div class="relative text-left text-[32px] font-semibold text-white">Top 10</div>
		</div>
	</div>

	<Top10Carousel />
</div>
