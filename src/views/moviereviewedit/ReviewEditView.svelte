<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { Bold, Italic, Underline } from '@lucide/svelte';
	import PublishPopUp from '$lib/customComponents/review/PublishPopUp.svelte';

	let isPublishPopUpOpen = false;
	let activeFormatting = null; // 'bold', 'italic', 'underline', or null
	let reviewTitle = '';
	let reviewContent = '';
	let textareaElement;

	function openPublishPopUp() {
		isPublishPopUpOpen = true;
	}

	function toggleFormatting(formatting) {
		if (activeFormatting === formatting) {
			activeFormatting = null;
		} else {
			activeFormatting = formatting;
		}
	}

	function disableFormatting() {
		activeFormatting = null;
	}

	function handleKeydown(event) {
		if (!activeFormatting || !textareaElement || document.activeElement !== textareaElement) return;

		const start = textareaElement.selectionStart;
		const end = textareaElement.selectionEnd;
		const value = reviewContent;
		const key = event.key;

		// Only apply formatting to printable characters (ignore control keys like Arrow keys)
		if (key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
			event.preventDefault();
			let prefix = '';
			let suffix = '';
			switch (activeFormatting) {
				case 'bold':
					prefix = '**';
					suffix = '**';
					break;
				case 'italic':
					prefix = '*';
					suffix = '*';
					break;
				case 'underline':
					prefix = '__';
					suffix = '__';
					break;
			}
			// Insert the character wrapped with formatting at the cursor position
			reviewContent = value.slice(0, start) + prefix + key + suffix + value.slice(end);
			// Move cursor to after the inserted text
			const newPosition = start + prefix.length + 1;
			setTimeout(() => {
				textareaElement.selectionStart = newPosition;
				textareaElement.selectionEnd = newPosition;
			}, 0);
		}
	}

	function publishReview() {
		// Placeholder for actual publishing logic
		console.log('Publishing review:', reviewTitle, reviewContent);
		isPublishPopUpOpen = false;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex w-full flex-wrap justify-center gap-4">
	<div class="flex w-[1170px] items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="h-[37px] w-[5px] rounded-sm bg-purple-700"></div>
			<span class="text-[37.44px] font-semibold text-white">Critics Review Entry</span>
		</div>
		<div class="flex items-center gap-9">
			<Button
				class="rounded-full border border-black bg-purple-700/80 px-6 py-2 text-base font-semibold text-gray-200"
				>Save Draft</Button
			>
			<Button
				onclick={openPublishPopUp}
				class="rounded-full border border-black bg-purple-700/80 px-6 py-2 text-base font-semibold text-gray-200"
				>Publish</Button
			>
		</div>
	</div>
	<div class="flex w-[1170px] flex-col gap-5 rounded-lg border-4 border-[#222222] bg-black p-6">
		<div class="flex w-[1108px] flex-col gap-5">
			<div class="flex items-center gap-7">
				<button
					onclick={() => toggleFormatting('bold')}
					class={`h-7 w-7 ${activeFormatting === 'bold' ? 'bg-purple-700/80' : 'bg-white/10'} flex items-center justify-center rounded-sm`}
				>
					<Bold class="h-[18.67px] w-[14px] text-white" />
				</button>
				<button
					onclick={() => toggleFormatting('italic')}
					class={`h-7 w-7 ${activeFormatting === 'italic' ? 'bg-purple-700/80' : 'bg-white/10'} flex items-center justify-center rounded-sm`}
				>
					<Italic class="h-[18.67px] w-[14px] text-white" />
				</button>
				<button
					onclick={() => toggleFormatting('underline')}
					class={`h-7 w-7 ${activeFormatting === 'underline' ? 'bg-purple-700/80' : 'bg-white/10'} flex items-center justify-center rounded-sm`}
				>
					<Underline class="h-[18.67px] w-[14px] text-white" />
				</button>
			</div>
			<input
				bind:value={reviewTitle}
				onfocus={disableFormatting}
				class="h-[46px] w-full rounded-lg border-none bg-[#222222] px-5 py-3 text-sm font-medium text-[#797979] placeholder:text-[#797979] focus:outline-none focus:ring-0"
				placeholder="Type the title of your movie review..."
				type="text"
			/>
			<textarea
				bind:value={reviewContent}
				bind:this={textareaElement}
				class="h-[662px] w-full resize-y rounded-lg border-none bg-[#222222] px-5 py-3 text-sm font-medium text-[#797979] placeholder:align-top placeholder:text-[#797979] focus:outline-none focus:ring-0"
				placeholder="What are your thoughts on this movie?"
			></textarea>
		</div>
	</div>
</div>

<PublishPopUp bind:isOpen={isPublishPopUpOpen} on:confirm={publishReview} />
