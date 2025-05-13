<script>
	import ReviewCarousel from '$lib/customComponents/review/ReviewCarousel.svelte';
	import { Plus, ChevronRight } from 'radix-icons-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { authStore } from '$lib/stores/authStore.js';

	// Add movieId as a prop to this component
	export let movieId = undefined;

	// Determine if user is PRO
	$: isPro = $authStore.isAuthenticated && $authStore.user?.isPro;
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1170px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Critics Reviews</div>
			<!-- Update the link to include movieId -->
			<Button
				variant="ghost"
				size="icon"
				class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
			>
				<a href={movieId ? `/moviecriticsreview/${movieId}` : '/moviecriticsreview'}>
					<ChevronRight class="relative h-[23px] w-[23px] flex-shrink-0 font-bold text-white" />
				</a>
			</Button>
		</div>

		<!-- Add Review button -->
		{#if isPro}
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-0">
				<Button
					variant="ghost"
					size="icon"
					class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
				>
					<a href={movieId ? `/moviereviewedit?movieId=${movieId}` : '/moviereviewedit'}>
						<Plus
							class="relative inset-0 h-[23px] w-[23px] flex-shrink-0 overflow-visible"
							color="#B693DC"
						/>
					</a>

					<div class="relative text-left text-[18px] font-bold text-[#b693dc] underline">
						<a href={movieId ? `/moviereviewedit?movieId=${movieId}` : '/moviereviewedit'}>Review</a
						>
					</div>
				</Button>
			</div>
		{/if}
	</div>

	<ReviewCarousel {movieId} />
</div>
