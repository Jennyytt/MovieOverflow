<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	// Rating state
	let rating = 4; // Default to 4 stars filled as shown in the design

	function setRating(value) {
		rating = rating === value ? value - 1 : value;
	}

	function handlePOST() {
		// Handle POST request here
	}

	// Movie details
	let movieTitle = 'Captain America: Brave New World';
	let releaseDate = 'Feb 14, 2025';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button
			variant="link"
			class="h-auto p-0 text-[20px] font-bold text-[#b693dc] underline hover:text-[#c9a7ed]"
		>
			WRITE A COMMENT
		</Button>
	</Dialog.Trigger>

	<Dialog.Content
		class="h-[500px] w-[730px] rounded-[15px] border-none bg-[#1D1D1D] p-0 text-white"
	>
		<div class="relative h-full w-full px-[74px] py-[60px]">
			<!-- Movie Title and Date -->
			<div class="absolute left-[29px] top-[23px] flex flex-col gap-[6px]">
				<div class="text-left text-[20px] font-semibold text-white">
					{movieTitle} Review
				</div>
				<div class="text-left text-[16px] font-normal text-white">
					{releaseDate}
				</div>
			</div>

			<!-- Stars Rating -->
			<div
				class="absolute left-1/2 top-[73px] flex -translate-x-[139px] flex-row items-center gap-[18px] py-[15px]"
			>
				<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars  -->
				{#each Array(5) as _, i}
					<svg
						class="h-[40px] w-[40px] flex-shrink-0 cursor-pointer transition-transform hover:scale-110"
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						onclick={() => setRating(i + 1)}
						onkeydown={(e) => e.key === 'Enter' && setRating(i + 1)}
						tabindex="0"
						role="button"
						aria-label={`Rate ${i + 1} stars`}
					>
						{#if i < rating}
							<!-- Filled star -->
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.6529L14.3579 13.0667L20.0007 0.833252L25.6433 13.0667L39.0217 14.6529L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333Z"
								fill="#FBC02D"
							/>
						{:else}
							<!-- Outline star -->
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.6529L14.3579 13.0667L20.0007 0.833252L25.6433 13.0667L39.0217 14.6529L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333ZM20.0007 26.6133L27.0785 30.5751L25.4977 22.6194L31.4528 17.1123L23.398 16.1572L20.0007 8.79162L16.6032 16.1572L8.54836 17.1123L14.5035 22.6194L12.9227 30.5751L20.0007 26.6133Z"
								fill="#FBC02D"
							/>
						{/if}
					</svg>
				{/each}
			</div>

			<!-- Comment textarea with placeholder -->
			<Textarea
				type="textarea"
				placeholder="Write your thoughts here!"
				class="absolute left-1/2 top-[141px] h-[284px] w-[480px] -translate-x-[240px] rounded-[10px] border border-[#444444] bg-transparent p-3 text-[16px] text-[#89939e] placeholder-[#89939e] outline-none"
			/>

			<!-- Post button -->
			<div class="absolute bottom-[14px] right-[29px]">
				<Button
					class="h-[36px] w-[79px] rounded-[20px] bg-[rgba(128,43,177,0.8)] text-[14px] font-semibold text-[#eeeeee] hover:bg-[rgba(128,43,177,0.9)]"
				>
					POST
				</Button>
			</div>

			<!-- Close button (X) in the corner -->
			<Dialog.Close
				class="absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full opacity-70 hover:opacity-100 focus:outline-none"
				onclick={handlePOST}
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
