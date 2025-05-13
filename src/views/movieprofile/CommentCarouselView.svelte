<script>
	import CommentCarousel from '$lib/customComponents/comment/CommentCarousel.svelte';
	import { ChevronRight } from 'radix-icons-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	// Add an export to receive the movieId from the parent component
	export let movieId;
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Users' Comments</div>
			<Button
				variant="ghost"
				size="icon"
				class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
				><a href={`/moviecomment/${movieId}`}
					><ChevronRight class="relative h-[23px] w-[23px] flex-shrink-0 font-bold text-white" /></a
				></Button
			>
		</div>
	</div>

	<CommentCarousel {movieId} />
</div>
