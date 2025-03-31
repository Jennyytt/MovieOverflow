<script>
	import ReviewCarousel from '$lib/customComponents/ReviewCarousel.svelte';
	import { Plus, ChevronRight } from 'radix-icons-svelte';
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Critics Reviews</div>
			<ChevronRight class="relative h-[23px] w-[23px] flex-shrink-0 font-bold text-white" />
		</div>

		<!-- Add Review button -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-0">
			<!-- <div class="flex-shrink-0 w-[23px] h-[23px] relative aspect-square"> -->
			<Plus
				class="relative inset-0 h-[23px] w-[23px] flex-shrink-0 overflow-visible"
				color="#B693DC"
			/>
			<!-- </div> -->
			<div class="relative text-left text-[18px] font-bold text-[#b693dc] underline">Review</div>
		</div>
	</div>

	<!-- Your existing ReviewCarousel component -->
	<ReviewCarousel />
</div>
