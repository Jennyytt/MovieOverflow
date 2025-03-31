<script>
	import { Facebook, Youtube, Instagram, Twitter } from '@lucide/svelte';
</script>

<div class="flex h-[464px] flex-col items-center justify-center gap-2.5 bg-black px-[325px]">
	<div class="flex w-[1270px] flex-col items-center justify-center gap-[35px]">
		<div
			class="flex h-[163px] w-[468px] flex-col items-start justify-start gap-2.5 rounded-[10px] border-[3px] border-solid border-[#222222] bg-black p-[30px_97px]"
		>
			<div class="flex w-[274px] flex-col items-center justify-center gap-[17px]">
				<div class="self-stretch text-center font-inter text-[20px] font-bold text-white">
					Follow MovieOverflow on
				</div>
				<div class="flex flex-row items-center justify-start gap-10 self-stretch">
					<!-- Facebook icon -->
					<Facebook class="h-9 w-9 cursor-pointer text-white" />

					<!-- Instagram icon -->
					<Instagram class="h-9 w-9 cursor-pointer text-white" />

					<!-- Twitter/X icon -->
					<Twitter class="h-9 w-9 cursor-pointer text-white" />

					<!-- YouTube icon -->
					<Youtube class="h-9 w-9 cursor-pointer text-white" />
				</div>
			</div>
		</div>

		<div class="flex flex-row items-center justify-center gap-[39px] self-stretch">
			<div class="cursor-pointer text-left font-inter text-lg font-medium text-white">Help</div>
			<div class="cursor-pointer text-left font-inter text-lg font-medium text-white">
				About MovieOverflow
			</div>
			<div class="cursor-pointer text-left font-inter text-lg font-medium text-white">
				Conditions of Use
			</div>
			<div class="cursor-pointer text-left font-inter text-lg font-medium text-white">
				Privacy Policy
			</div>
			<div class="cursor-pointer text-left font-inter text-lg font-medium text-white">
				Cookie Notice
			</div>
		</div>

		<div class="self-stretch text-center font-inter text-base font-medium text-[#b693dc]">
			Contact us: MovieOverflow@gmail.com
		</div>

		<div class="self-stretch text-center font-inter text-base font-medium text-[#666666]">
			© 1990-2025 by MovieOverflow.com, Inc.<br />
		</div>
	</div>
</div>
