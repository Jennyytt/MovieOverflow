<script>
	import UserCommentBlock from '$lib/customComponents/usercomment/UserCommentBlock.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1100px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">User Comments</div>
		</div>
	</div>
	<UserCommentBlock />
	<div class="flex w-full justify-center">
		<Button
			class="relative flex h-[32px] w-[100px] flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-[10px] rounded-[4px] bg-[#802bb1] font-bold text-white"
		>
			Load More
		</Button>
	</div>
</div>
