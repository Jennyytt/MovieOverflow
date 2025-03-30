<script>
	import logoSmall from '../../assets/MOicon-small.png';
	import { Search, Gem, Bookmark, UserRound, CircleUser } from '@lucide/svelte';
</script>

<div class="relative box-border h-[66px] overflow-hidden bg-[#1d1d1d]">
	<div
		class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-start gap-[50px]"
	>
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start">
			<img
				class="h-[44px] min-h-[44px] w-[180px] min-w-[180px]"
				alt="The project logo"
				src={logoSmall}
			/>
		</div>

		<div
			class="relative flex h-[56px] w-[514px] min-w-[250px] flex-shrink-0 flex-row items-center justify-between rounded-[10px] bg-[#2b2b2b] px-1.5 py-3"
		>
			<div class="relative text-left font-inter text-sm font-normal text-[#797979]">
				What do you want to search?
			</div>
			<Search color="#D1D7E0" />
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1 rounded-[20px]"
		>
			<Gem color="#B693DC" />
			<div
				class="relative h-[22px] w-[45px] text-left font-inter text-base font-semibold leading-[140%] text-[#b693dc]"
			>
				PRO
			</div>
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-start justify-start gap-1"
		>
			<Bookmark color="#D1D7E0" />
			<div
				class="relative text-center font-inter text-base font-semibold leading-[140%] text-[#d1d7e0]"
			>
				Watchlist
			</div>
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
		>
			<UserRound color="#D1D7E0" />
			<div
				class="relative text-center font-inter text-base font-semibold leading-[140%] text-[#d1d7e0]"
			>
				Log in
			</div>
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
		>
			<CircleUser color="#D1D7E0" />
			<div
				class="relative text-center font-inter text-base font-semibold leading-[140%] text-[#d1d7e0]"
			>
				Sign Up
			</div>
		</div>
	</div>
</div>
