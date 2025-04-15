<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { Bold, Italic, Underline } from '@lucide/svelte';
</script>

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
				class="rounded-full border border-black bg-purple-700/80 px-6 py-2 text-base font-semibold text-gray-200"
				>Publish</Button
			>
		</div>
	</div>
	<div class="flex w-[1170px] flex-col gap-5 rounded-lg border-4 border-[#222222] bg-black p-6">
		<div class="flex w-[1108px] flex-col gap-5">
			<div class="flex items-center gap-7">
				<button class="flex h-7 w-7 items-center justify-center rounded-sm bg-white/10">
					<Bold class="h-[18.67px] w-[14px] text-white" />
				</button>
				<button class="flex h-7 w-7 items-center justify-center rounded-sm bg-white/10">
					<Italic class="h-[18.67px] w-[14px] text-white" />
				</button>
				<button class="flex h-7 w-7 items-center justify-center rounded-sm bg-white/10">
					<Underline class="h-[18.67px] w-[14px] text-white" />
				</button>
			</div>
			<input
				class="h-[46px] w-full rounded-lg border-none bg-[#222222] px-5 py-3 text-sm font-medium text-[#797979] placeholder:text-[#797979] focus:outline-none focus:ring-0"
				placeholder="Type the title of your movie review..."
				type="text"
			/>
			<textarea
				class="h-[662px] w-full resize-y rounded-lg border-none bg-[#222222] px-5 py-3 text-sm font-medium text-[#797979] placeholder:align-top placeholder:text-[#797979] focus:outline-none focus:ring-0"
				placeholder="What are your thoughts on this movie?"
			></textarea>
		</div>
	</div>
</div>
