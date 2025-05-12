<script>
	import ReviewDraftCard from './ReviewDraftCard.svelte';
	import { Card } from '$lib/components/ui/card';
</script>

<Card
	class="margin-top-[20px] relative box-border w-[1100px] overflow-hidden rounded-[10px] border-[#222222] bg-[#000000]"
>
	<div
		class="margin-top-[20px] relative flex w-[1100px] flex-shrink-0 flex-col items-center justify-between gap-[10px] self-stretch"
	>
		<br />
		<ReviewDraftCard />
		<div class="relative h-[1px] w-[1048px] bg-[#222222]"></div>
		<ReviewDraftCard />
		<div class="relative h-[1px] w-[1048px] bg-[#222222]"></div>
		<ReviewDraftCard />
	</div>
</Card>
