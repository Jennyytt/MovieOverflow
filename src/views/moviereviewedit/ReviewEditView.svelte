<script>
	import { writable } from 'svelte/store';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Bold, Italic, Underline } from '@lucide/svelte';
	import PublishPopUp from '$lib/customComponents/review/PublishPopUp.svelte';
	import { Toaster, toast } from 'svelte-sonner';

	let isPublishPopUpOpen = false;
	const activeFormatting = writable('none'); // 'none', 'bold', 'italic', or 'underline'
	let reviewTitle = '';
	let reviewContent = '';
	let contentEditableElement;

	function openPublishPopUp() {
		isPublishPopUpOpen = true;
	}

	function toggleFormatting(formatting) {
		if ($activeFormatting === formatting) {
			// Deactivate the current formatting by setting to 'none'
			activeFormatting.set('none');
		} else {
			// Activate the new formatting, deactivating others
			activeFormatting.set(formatting);
			if (contentEditableElement) {
				contentEditableElement.focus();
			}
		}
	}

	function disableFormatting() {
		// Set to 'none' instead of null
		activeFormatting.set('none');
	}

	function handleInput(event) {
		// Update reviewContent with the plain text content of the contenteditable div
		reviewContent = event.target.textContent;
		// Add or remove the 'empty' class based on content
		if (contentEditableElement) {
			if (reviewContent.trim() === '') {
				contentEditableElement.classList.add('empty');
			} else {
				contentEditableElement.classList.remove('empty');
			}
		}
	}

	function handleKeydown(event) {
		// Only apply formatting to printable characters (ignore control keys like Arrow keys)
		const key = event.key;
		if (key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) return;

		event.preventDefault();

		// Get the current selection and range
		const selection = window.getSelection();
		if (selection.rangeCount === 0) return;

		const range = selection.getRangeAt(0);
		range.deleteContents(); // Remove any selected content

		// If no formatting is active, insert plain text wrapped in a span to reset styles
		if (!$activeFormatting || $activeFormatting === 'none') {
			// Use a span to explicitly reset font-weight, font-style, and text-decoration
			const span = document.createElement('span');
			span.textContent = key;
			span.style.fontWeight = 'normal';
			span.style.fontStyle = 'normal';
			span.style.textDecoration = 'none';
			range.insertNode(span);

			// Move the cursor to after the inserted span
			range.setStartAfter(span);
			range.setEndAfter(span);
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
			// Apply formatting if a formatting option is active
			const span = document.createElement('span');
			span.textContent = key;
			switch ($activeFormatting) {
				case 'bold':
					span.style.fontWeight = 'bold';
					break;
				case 'italic':
					span.style.fontStyle = 'italic';
					break;
				case 'underline':
					span.style.textDecoration = 'underline';
					break;
			}

			// Insert the styled span
			range.insertNode(span);

			// Move the cursor to after the inserted span
			range.setStartAfter(span);
			range.setEndAfter(span);
			selection.removeAllRanges();
			selection.addRange(range);
		}

		// Update reviewContent
		reviewContent = contentEditableElement.textContent;
		// Update the 'empty' class
		if (reviewContent.trim() === '') {
			contentEditableElement.classList.add('empty');
		} else {
			contentEditableElement.classList.remove('empty');
		}
	}

	function handleFocus() {
		// If the content is empty, move the cursor to the start of the contenteditable div
		if (contentEditableElement && reviewContent.trim() === '') {
			const selection = window.getSelection();
			const range = document.createRange();
			range.setStart(contentEditableElement, 0);
			range.setEnd(contentEditableElement, 0);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
	function saveDraft() {
		toast.success('Your draft is saved');
	}
	function publishReview() {
		isPublishPopUpOpen = false;
	}
</script>

<div class="flex w-full flex-wrap justify-center gap-4">
	<div class="flex w-[1170px] items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="h-[37px] w-[5px] rounded-sm bg-purple-700"></div>
			<span class="text-[37.44px] font-semibold text-white">Critics Review Entry</span>
		</div>
		<div class="flex items-center gap-9">
			<Toaster />
			<Button onclick={saveDraft} class="rounded-full px-6 py-2 text-base font-semibold"
				><a href>Save Draft</a></Button
			>
			<Button onclick={openPublishPopUp} class="rounded-full px-6 py-2 text-base font-semibold"
				>Publish</Button
			>
		</div>
	</div>
	<div class="flex w-[1170px] flex-col gap-5 rounded-lg border-4 border-[#222222] bg-black p-6">
		<div class="flex w-[1108px] flex-col gap-5">
			<div class="flex items-center gap-7">
				<button
					onclick={() => toggleFormatting('bold')}
					class={`h-7 w-7 ${$activeFormatting === 'bold' ? 'bg-purple-700/80' : 'bg-white/10'} flex items-center justify-center rounded-sm`}
					aria-label="Toggle bold formatting"
				>
					<Bold class="h-[18.67px] w-[14px] text-white" />
				</button>
				<button
					onclick={() => toggleFormatting('italic')}
					class={`h-7 w-7 ${$activeFormatting === 'italic' ? 'bg-purple-700/80' : 'bg-white/10'} flex items-center justify-center rounded-sm`}
					aria-label="Toggle italic formatting"
				>
					<Italic class="h-[18.67px] w-[14px] text-white" />
				</button>
				<button
					onclick={() => toggleFormatting('underline')}
					class={`h-7 w-7 ${$activeFormatting === 'underline' ? 'bg-purple-700/80' : 'bg-white/10'} flex items-center justify-center rounded-sm`}
					aria-label="Toggle underline formatting"
				>
					<Underline class="h-[18.67px] w-[14px] text-white" />
				</button>
			</div>
			<input
				bind:value={reviewTitle}
				onfocus={disableFormatting}
				class="h-[46px] w-full rounded-lg border-none bg-[#222222] px-5 py-3 text-sm font-medium text-[#FFFFFF] placeholder:text-[#797979] focus:outline-none focus:ring-0"
				placeholder="Type the title of your movie review..."
				type="text"
			/>
			<div
				bind:this={contentEditableElement}
				contenteditable="true"
				oninput={handleInput}
				onfocus={handleFocus}
				onkeydown={handleKeydown}
				class="content-editable empty h-[662px] w-full rounded-lg border-none bg-[#222222] px-5 py-3 text-sm font-medium font-normal text-[#FFFFFF] focus:outline-none focus:ring-0"
				data-placeholder="What are your thoughts on this movie?"
				role="textbox"
				aria-multiline="true"
				aria-label="Movie review content"
				aria-placeholder="What are your thoughts on this movie?"
				tabindex="0"
				style="white-space: pre-wrap; overflow-y: auto;"
			></div>
		</div>
	</div>
</div>

<PublishPopUp bind:isOpen={isPublishPopUpOpen} on:confirm={publishReview} />

<style>
	.content-editable:empty::before,
	.content-editable.empty::before {
		content: attr(data-placeholder);
		color: #797979;
	}
</style>
