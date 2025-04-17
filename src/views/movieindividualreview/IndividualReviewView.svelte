<script>
	import posterImage from '../../assets/movie-poster-xl.png';
	import { CircleUserRound } from '@lucide/svelte';
	import MovieComCR from '$lib/customComponents/movie/MovieComCR.svelte';
	export let name = 'Jeffrey Lawwwwwwwww';
	export let date = 'Feb 24, 2025';
	export let title = 'The Worst Movie I Have Ever Watched';
	export let reviewText =
		'The man who coined the phrase “Life is pain” never met Nathan Caine. Nate is afflicted with an extremely rare genetic disorder called “congenital insensitivity to pain analgesia” that makes him incapable of feeling any sort of pain. (Yes, it’s real.) To a moviegoing public drowning in comic-book movies, that might sound like a superpower. To Nate, it’s more curse than gift.<br /><br />It’s important for a person to feel pain. Pain keeps us alive. It tells us to move our hand away from a fire before we permanently damage our hand, or to go see a doctor so that an illness or an infection can be treated. Nate never gets those warnings, so to protect himself he lives a life covered in almost literal bubble wrap. He never eats solid foods out of fear of accidentally biting through his tongue. He tops his pencils with puddy; he has tennis balls on every door handle and desk corner, lest he puncture himself without noticing. When he’s not working as an assistant bank manager in San Diego, he’s avoiding danger at home, mostly playing MMORPGs with his only friend — a voice in his headphones that he’s never even met (the voice of Jacob Batalon).<br />';

	// Split the reviewText into paragraphs based on <br /> tags
	let paragraphs = reviewText.split('<br />').filter((p) => p.trim() !== '');
</script>

<div class="inline-flex h-full w-full gap-7">
	<MovieComCR
		title="Captain America: Brave New World"
		rating="IIA"
		duration="1h 58m"
		{posterImage}
		genre="Action, Adventure, Fantasy"
		director="Julius Onah"
		releaseDate="Feb 14, 2025"
	/>
	<div class="inline-flex w-[725.34px] flex-col items-center justify-start gap-[15px]">
		<div class="inline-flex items-center justify-between self-stretch">
			<div class="w-[530px]">
				<span
					class="break-words font-['Inter'] text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
				>
					Captain America: Brave New World Critics Review
				</span>
			</div>
			<div
				class="flex items-center justify-center gap-[10px] rounded-[20px] border border-black bg-[rgba(128,43,177,0.80)] px-[11.765px] py-[2.65px]"
				data-property-1="button no icon (dark)"
			>
				<div>
					<span class="break-words font-['Inter'] text-base font-semibold text-[#EEEEEE]">
						Back
					</span>
				</div>
			</div>
		</div>
		<div class="h-0 w-[725.34px] border-[2.3px] border-[#222222]"></div>
		<div class="inline-flex items-start justify-start self-stretch">
			<div class="inline-flex w-[197.34px] flex-col items-start justify-start gap-3">
				<div class="inline-flex items-center justify-start gap-[18px] self-stretch">
					<div class="relative aspect-square h-[42.34px] w-[42.34px] flex-shrink-0">
						<CircleUserRound class="h-full w-full stroke-[#D1D7E0]" />
					</div>
					<div class="w-[120px]">
						<span class="break-words font-['Inter'] text-[18.41px] font-medium text-[#CCCCCC]">
							{name}
						</span>
					</div>
				</div>
				<div>
					<span class="break-words font-['Inter'] text-[18.41px] font-medium text-[#CCCCCC]">
						{date}
					</span>
				</div>
			</div>
			<div class="inline-flex w-[528px] flex-col items-start justify-start gap-[22px]">
				<div class="self-stretch">
					<span
						class="break-words font-['Inter'] text-[22.09px] font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					>
						{title}
					</span>
				</div>
				<div class="flex flex-col gap-4 self-stretch">
					{#each paragraphs as paragraph, index (index)}
						<p class="break-words font-['Inter'] text-[18.41px] font-medium text-[#CCCCCC]">
							{paragraph}
						</p>
					{/each}
				</div>
			</div>
		</div>
		<div class="h-0 self-stretch border-[1.38px] border-[#222222]"></div>
	</div>
</div>
