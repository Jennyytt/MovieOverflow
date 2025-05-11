<script>
	import Button from '$lib/components/ui/button/button.svelte';
	export let isOpen = false;

	function closePopup() {
		isOpen = false;
	}

	function confirmPublish() {
		closePopup();
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
		<div class="flex flex-col items-center gap-8 rounded-lg bg-[#222222] p-10">
			<span class="text-2xl font-bold text-white">Do you really want to publish your review?</span>
			<div class="flex gap-16">
				<Button
					onclick={closePopup}
					class="rounded-full border border-black bg-purple-700/80 px-6 py-2 text-base font-semibold text-gray-200"
					>No</Button
				>
				<Button
					onclick={confirmPublish}
					class="rounded-full border border-black bg-purple-700/80 px-6 py-2 text-base font-semibold text-gray-200"
					><a href="movieindividualreview">Yes</a>
				</Button>
			</div>
		</div>
	</div>
{/if}
