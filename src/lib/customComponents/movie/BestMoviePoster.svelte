<script>
	import { Star, Clock } from '@lucide/svelte';
	import MovieBigPoster from '../../../assets/movie-big-poster.png';
</script>

<div class="relative">
	<!-- Poster -->
	<img
		src={MovieBigPoster}
		alt="Best Movie Poster"
		class="h-[510px] w-[829px] rounded-lg object-cover"
	/>
	<!-- Overlay for text -->
	<div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
		<!-- Title -->
		<div class="font-['Work Sans'] text-[28px] font-normal text-white">Oppenheimer</div>
		<!-- Slogan -->
		<div class="font-['Work Sans'] mt-2 text-[22px] font-normal text-gray-400">
			The World Forever Changes
		</div>
		<!-- Rating and Duration -->
		<div class="mt-3 flex items-center space-x-6">
			<div class="flex items-center">
				<Star class="mr-1 h-5 w-5" fill="#F5C518" color="#F5C518" />
				<div class="font-Inter font-bold text-white">
					8.3
					<span class="text-[12px] font-medium">/10</span>
				</div>
			</div>
			<div class="flex items-center">
				<Clock class="mr-1 h-5 w-5" color="#FFD600" />
				<div class="font-Inter font-bold text-white">3 Hours</div>
			</div>
		</div>
	</div>
</div>
