<script>
	import { writable } from 'svelte/store';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Bold, Italic, Underline } from '@lucide/svelte';
	import PublishPopUp from '$lib/customComponents/review/PublishPopUp.svelte';
	import { Toaster, toast } from 'svelte-sonner';

	// Props from parent (+page.svelte)
	const {
		//reviewId = null,
		initialTitle = '',
		initialContent = '',
		isLoading = false,
		saveDraft = () => {},
		publishReview = () => {}
	} = $props();

	let isPublishPopUpOpen = $state(false);
	const activeFormatting = writable('none'); // 'none', 'bold', 'italic', or 'underline'
	let reviewTitle = $state(initialTitle);
	let reviewContent = $state(initialContent);
	let contentEditableElement;

	function openPublishPopUp() {
		if (!reviewTitle.trim() || !reviewContent.trim()) {
			toast.error('Please provide both a title and review content before publishing.');
			return;
		}
		isPublishPopUpOpen = true;
	}

	function toggleFormatting(formatting) {
		if ($activeFormatting === formatting) {
			activeFormatting.set('none');
		} else {
			activeFormatting.set(formatting);
			if (contentEditableElement) {
				contentEditableElement.focus();
			}
		}
	}

	function disableFormatting() {
		activeFormatting.set('none');
	}

	function handleInput(event) {
		reviewContent = event.target.textContent;
		if (contentEditableElement) {
			if (reviewContent.trim() === '') {
				contentEditableElement.classList.add('empty');
			} else {
				contentEditableElement.classList.remove('empty');
			}
		}
	}

	function handleKeydown(event) {
		const key = event.key;
		if (key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) return;

		event.preventDefault();

		const selection = window.getSelection();
		if (selection.rangeCount === 0) return;

		const range = selection.getRangeAt(0);
		range.deleteContents();

		if (!$activeFormatting || $activeFormatting === 'none') {
			const span = document.createElement('span');
			span.textContent = key;
			span.style.fontWeight = 'normal';
			span.style.fontStyle = 'normal';
			span.style.textDecoration = 'none';
			range.insertNode(span);

			range.setStartAfter(span);
			range.setEndAfter(span);
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
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

			range.insertNode(span);

			range.setStartAfter(span);
			range.setEndAfter(span);
			selection.removeAllRanges();
			selection.addRange(range);
		}

		reviewContent = contentEditableElement.textContent;
		if (reviewContent.trim() === '') {
			contentEditableElement.classList.add('empty');
		} else {
			contentEditableElement.classList.remove('empty');
		}
	}

	function handleFocus() {
		if (contentEditableElement && reviewContent.trim() === '') {
			const selection = window.getSelection();
			const range = document.createRange();
			range.setStart(contentEditableElement, 0);
			range.setEnd(contentEditableElement, 0);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}

	function handleSaveDraft() {
		if (!reviewTitle.trim() && !reviewContent.trim()) {
			toast.error('Please provide a title or content to save as a draft.');
			return;
		}
		saveDraft(reviewTitle, reviewContent);
	}

	function handlePublishReview() {
		isPublishPopUpOpen = false;
		publishReview(reviewTitle, reviewContent);
	}
</script>

<div class="flex w-full flex-wrap justify-center gap-4">
	<Toaster />
	<div class="flex w-[1170px] items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="h-[37px] w-[5px] rounded-sm bg-purple-700"></div>
			<span class="text-[37.44px] font-semibold text-white">Critics Review Entry</span>
		</div>
		<div class="flex items-center gap-9">
			<Button
				onclick={handleSaveDraft}
				disabled={isLoading}
				class="rounded-full px-6 py-2 text-base font-semibold"
			>
				Save Draft
			</Button>
			<Button
				onclick={openPublishPopUp}
				disabled={isLoading}
				class="rounded-full px-6 py-2 text-base font-semibold"
			>
				Publish
			</Button>
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
			>
				{#if initialContent}
					{@html initialContent}
				{/if}
			</div>
		</div>
	</div>
</div>

<PublishPopUp bind:isOpen={isPublishPopUpOpen} on:confirm={handlePublishReview} />

<style>
	.content-editable:empty::before,
	.content-editable.empty::before {
		content: attr(data-placeholder);
		color: #797979;
	}
</style>