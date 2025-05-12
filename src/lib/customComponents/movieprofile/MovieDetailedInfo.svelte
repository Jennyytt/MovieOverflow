<script>
	import { Button } from '$lib/components/ui/button';

	export let movieDescription =
		'Neo believes that Morpheus, an elusive figure considered to be the most dangerous man alive, can answer his question -- What is the Matrix? Neo is contacted by Trinity, a beautiful stranger who leads him into an underworld where he meets Morpheus. They fight a brutal battle for their lives against a cadre of viciously intelligent secret agents. It is a truth that could cost Neo something more precious than his life.';
	export let director = 'Julius Onah';
	export let writers = ['Rob Edwards', 'Malcolm Spellman', 'Dalan Musson'];
	export let stars = ['Anthony Mackie', 'Harrison Ford', 'Danny Ramirez'];
	export let releaseDate = 'Feb 14, 2025';
	import { toast } from 'svelte-sonner';

	// State to track if reminder is set
	let willRemind = false;

	// Function to toggle reminder state
	function toggleReminder() {
		if (willRemind) {
			toast('Reminder has been removed');
			willRemind = false;
		} else {
			toast.success('Reminder has been created', {
				description: `${releaseDate} at 6:00pm`
			});
			willRemind = true;
		}
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
			{movieDescription}
		</p>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Director -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[91px]">
			<div class="text-left text-base font-medium text-[#cccccc]">Director</div>
			<div class="text-left text-base font-normal text-white">{director}</div>
		</div>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Writers -->
		<div
			class="relative flex w-[564px] flex-shrink-0 flex-row items-center justify-start gap-[99px]"
		>
			<div class="text-left text-base font-medium text-[#cccccc]">Writers</div>
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[11px]">
				{#each writers as writer, i}
					<div class="text-left text-base font-normal text-white">{writer}</div>
					{#if i < writers.length - 1}
						<div
							class="text-left text-base font-medium leading-[44px] tracking-[-0.02em] text-white"
						>
							·
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Stars -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[113px]">
			<div class="text-left text-base font-medium text-[#cccccc]">Stars</div>
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[11px]">
				{#each stars as star, i}
					<div class="text-left text-base font-normal text-white">{star}</div>
					{#if i < stars.length - 1}
						<div
							class="text-left text-base font-medium leading-[44px] tracking-[-0.02em] text-white"
						>
							·
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Divider Line -->
		<div class="-mt-[3px] h-0 self-stretch border-t-[3px] border-solid border-[#222222]"></div>

		<!-- Release Date -->
		<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-[10px]">
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[54px]">
				<div class="text-left text-base font-medium text-[#cccccc]">Release Date</div>
				<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[51px]">
					<div class="text-left text-base font-normal text-white">{releaseDate}</div>
					<Button
						onclick={toggleReminder}
						class="flex flex-row items-center justify-center gap-[10px] rounded-[20px] border border-solid border-black px-[25px] py-2 "
					>
						<span class="text-left text-base font-semibold text-[#eeeeee]">Set Reminder</span>
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
