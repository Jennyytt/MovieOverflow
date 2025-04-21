<script>
	// Props for dynamic content
	export let title = 'Captain America: Brave New World';
	export let rating = 'IIA';
	export let duration = '1h 58m';
	export let posterImage;
	export let genre = 'Action, Adventure, Fantasy';
	export let director = 'Julius Onah';
	export let releaseDate = 'Feb 14, 2025';
</script>

<div class="inline-flex w-[418px] flex-col items-center justify-start gap-[31px]">
	<img src={posterImage} alt={`${title} poster`} class="h-[473px] w-[315px] rounded-[3.68px]" />
	<div
		class="flex flex-col items-center justify-start gap-[10px] self-stretch rounded-[9.2px] border-[2.76px] border-[#222222] bg-black px-[23px] py-[19px]"
	>
		<div class="flex w-[370.79px] flex-col items-center justify-start gap-[10px]">
			<div class="flex flex-col gap-[7px] self-stretch">
				<div class="self-stretch">
					<span
						class="break-words text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						{title}
					</span>
				</div>
				<div class="inline-flex items-start justify-start gap-3">
					<div class="flex items-end gap-[7px]">
						<div>
							<span class="break-words text-[18.41px] font-medium text-[#cccccc]">
								{rating}
							</span>
						</div>
						<div>
							<span class="break-words text-[18.41px] font-medium text-white"> , </span>
						</div>
					</div>
					<div>
						<span class="break-words text-[18.41px] font-medium text-[#cccccc]">
							{duration}
						</span>
					</div>
				</div>
			</div>
			<div class="h-0 w-[366px] border-[1.38px] border-[#222222]"></div>
			<div class="inline-flex items-center justify-between self-stretch">
				<div>
					<span class="break-words text-[18.41px] font-medium text-[#cccccc]"> Genre </span>
				</div>
				<div>
					<span class="break-words text-[18.41px] font-normal text-white">
						{genre}
					</span>
				</div>
			</div>
			<div class="h-0 w-[366px] border-[1.38px] border-[#222222]"></div>
			<div class="inline-flex items-center justify-between self-stretch">
				<div>
					<span class="break-words text-[18.41px] font-medium text-[#cccccc]"> Director </span>
				</div>
				<div>
					<span class="break-words text-[18.41px] font-normal text-white">
						{director}
					</span>
				</div>
			</div>
			<div class="h-0 w-[366px] border-[1.38px] border-[#222222]"></div>
			<div class="inline-flex items-center justify-between self-stretch">
				<div>
					<span class="break-words text-[18.41px] font-medium text-[#cccccc]"> Release Date </span>
				</div>
				<div>
					<span class="break-words text-[18.41px] font-normal text-white">
						{releaseDate}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
