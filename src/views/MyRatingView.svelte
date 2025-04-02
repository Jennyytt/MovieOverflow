<script>
	let rating = 0;
	let lastSubmittedRating = 0; // Track the last submitted rating

	function setRating(value) {
		// If clicking the same star, deselect it
		if (rating === value) {
			rating = 0; // Reset to 0 stars
		} else {
			rating = value; // Otherwise set to the clicked star
		}

		// Re-enable the button if user selects a different rating than previously submitted
		if (isClicked && rating !== lastSubmittedRating) {
			isClicked = false;
		}
	}

	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronRight } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import WriteCommentDialog from '$lib/customComponents/movieprofile/WriteCommentDialog.svelte';
	let isClicked = false;

	function submitRating() {
		toast.success(`Thank you for rating ${rating} ${rating === 1 ? 'star' : 'stars'}!`);
		isClicked = true;
		lastSubmittedRating = rating; // Store the submitted rating
	}
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-start gap-8 self-stretch">
	<!-- Section title with purple bar -->
	<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
		<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
		<div class="relative text-left text-[32px] font-semibold text-white">My Rating</div>
		<Button
			variant="ghost"
			size="icon"
			class="h-auto w-auto p-0 hover:bg-transparent focus-visible:ring-0"
			aria-label="View ratings"
		>
			<ChevronRight class="relative h-[23px] w-[23px] flex-shrink-0 font-bold text-white" />
		</Button>
	</div>

	<!-- Rating container -->
	<div
		class="relative h-[248px] w-[1170px] flex-shrink-0 overflow-hidden rounded-[10px] border-[3px] border-solid border-[#222222] bg-transparent"
	>
		<div
			class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 px-0 py-[10px]"
		>
			<!-- Star rating -->
			<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-[18px]">
				<!-- eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars  -->
				{#each Array(5) as _, i}
					<svg
						class="relative aspect-square h-[40px] w-[40px] flex-shrink-0 cursor-pointer overflow-visible transition-transform hover:scale-110"
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						on:click={() => setRating(i + 1)}
						on:keydown={(e) => e.key === 'Enter' && setRating(i + 1)}
						tabindex="0"
						role="button"
						aria-label={`Rate ${i + 1} ${i === 0 ? 'star' : 'stars'}`}
					>
						<!-- Filled star path when rating is selected -->
						{#if i < rating}
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.653L14.3579 13.0667L20.0007 0.833313L25.6433 13.0667L39.0217 14.653L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333Z"
								fill="#FBC02D"
							/>
							<!-- Outline star path when rating is not selected -->
						{:else}
							<path
								d="M20.0007 30.4333L8.24492 37.0136L10.8705 23.7998L0.979492 14.653L14.3579 13.0667L20.0007 0.833313L25.6433 13.0667L39.0217 14.653L29.1308 23.7998L31.7563 37.0136L20.0007 30.4333ZM20.0007 26.6133L27.0785 30.5751L25.4977 22.6195L31.4528 17.1123L23.398 16.1572L20.0007 8.79168L16.6032 16.1572L8.54836 17.1123L14.5035 22.6195L12.9227 30.5751L20.0007 26.6133Z"
								fill="#FBC02D"
							/>
						{/if}
					</svg>
				{/each}
			</div>

			<!-- Post rating button -->
			<Button
				class="relative flex h-12 flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-[10px] rounded-[20px] border-[1px] border-solid border-black px-6 py-5 text-[20px] font-bold text-[#eeeeee]"
				on:click={submitRating}
				disabled={isClicked}
			>
				{isClicked ? 'RATING POSTED' : 'POST RATING'}
			</Button>

			<!-- Write a comment link -->
			<WriteCommentDialog />
		</div>
	</div>
</div>
