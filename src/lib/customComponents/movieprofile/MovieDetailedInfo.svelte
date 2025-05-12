<script>
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	// Import props
	let { movie } = $props();

	// State to track if reminder is set
	let willRemind = $state(false);

	// Function to toggle reminder state
	function toggleReminder() {
		if (willRemind) {
			toast('Reminder has been removed');
			willRemind = false;
		} else {
			toast.success('Reminder has been created', {
				description: `${formatReleaseDate(movie.releaseDate)} at 6:00pm`
			});
			willRemind = true;
		}
	}

	// Helper function to format release date
	function formatReleaseDate(dateString) {
		if (!dateString) return '';

		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			});
		} catch (error) {
			console.error('Error formatting date:', error);
			return dateString;
		}
	}

	// Helper function to join arrays with dot separators
	function formatList(list) {
		if (!list) return [];
		if (typeof list === 'string') return [list]; // Handle case where it's a single string
		return Array.isArray(list) ? list : [];
	}
</script>

<div
	class="relative h-[360px] flex-shrink-0 self-stretch overflow-hidden rounded-[10px] border-[3px] border-solid border-[#222222] bg-transparent"
>
	<div
		class="absolute left-1/2 top-1/2 flex w-[1066px] -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-start gap-[10px]"
	>
		<!-- Movie Description -->
		<p class="self-stretch text-left text-base font-normal text-white">
			{movie.description || 'No description available'}
		</p>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Director -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[91px]">
			<div class="text-left text-base font-medium text-[#cccccc]">Director</div>
			<div class="text-left text-base font-normal text-white">
				{movie.directors || 'Unknown Director'}
			</div>
		</div>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Writers -->
		<div
			class="relative flex w-[564px] flex-shrink-0 flex-row items-center justify-start gap-[99px]"
		>
			<div class="text-left text-base font-medium text-[#cccccc]">Writers</div>
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[11px]">
				{#if formatList(movie.writers).length > 0}
					{#each formatList(movie.writers) as writer, i}
						<div class="text-left text-base font-normal text-white">{writer}</div>
						{#if i < formatList(movie.writers).length - 1}
							<div
								class="text-left text-base font-medium leading-[44px] tracking-[-0.02em] text-white"
							>
								·
							</div>
						{/if}
					{/each}
				{:else}
					<div class="text-left text-base font-normal text-white">Unknown</div>
				{/if}
			</div>
		</div>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Stars -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[113px]">
			<div class="text-left text-base font-medium text-[#cccccc]">Stars</div>
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[11px]">
				{#if formatList(movie.stars).length > 0}
					{#each formatList(movie.stars) as star, i}
						<div class="text-left text-base font-normal text-white">{star}</div>
						{#if i < formatList(movie.stars).length - 1}
							<div
								class="text-left text-base font-medium leading-[44px] tracking-[-0.02em] text-white"
							>
								·
							</div>
						{/if}
					{/each}
				{:else}
					<div class="text-left text-base font-normal text-white">Unknown</div>
				{/if}
			</div>
		</div>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Release Date -->
		<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-[10px]">
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[54px]">
				<div class="text-left text-base font-medium text-[#cccccc]">Release Date</div>
				<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[51px]">
					<div class="text-left text-base font-normal text-white">
						{formatReleaseDate(movie.releaseDate) || 'TBA'}
					</div>
					{#if movie.releaseDate}
						<Button
							onclick={toggleReminder}
							class="flex flex-row items-center justify-center gap-[10px] rounded-[20px] border border-solid border-black px-[25px] py-2"
						>
							<span class="text-left text-base font-semibold text-[#eeeeee]">
								{willRemind ? 'Remove Reminder' : 'Set Reminder'}
							</span>
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
