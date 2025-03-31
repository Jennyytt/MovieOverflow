<script>
	import CommentCarousel from '$lib/customComponents/CommentCarousel.svelte';
	import { ChevronRight } from 'radix-icons-svelte';
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Users' Comments</div>
			<ChevronRight class="relative h-[23px] w-[23px] flex-shrink-0 font-bold text-white" />
		</div>
	</div>

	<!-- Your existing ReviewCarousel component -->
	<CommentCarousel />
</div>
