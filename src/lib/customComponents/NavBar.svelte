<script>
	import logoSmall from '../../assets/MOicon-small.png';
	import { Search, Gem, Bookmark, UserRound, CircleUser } from '@lucide/svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	// ! TODO: Function to handle search click
	function handleSearchClick() {
		// const searchInput = document.querySelector('input[type="text"]');
		// 		const query = searchInput.value;
	}
</script>

<div class="relative box-border h-[66px] overflow-hidden bg-[#1d1d1d]">
	<div
		class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-start gap-[50px]"
	>
		<!-- MovieOverflow icon -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start">
			<a href="/"
				><img
					class="h-[44px] min-h-[44px] w-[180px] min-w-[180px]"
					alt="The project logo"
					src={logoSmall}
				/></a
			>
		</div>
		<div class="relative">
			<Input
				class="relative h-[56px] w-[514px] min-w-[250px] flex-shrink-0 flex-row items-center justify-between rounded-[10px] border-[#2B2B2B] bg-[#2b2b2b] px-4 py-3 pr-12 text-white"
				placeholder="What do you want to search?"
				type="text"
			/>
			<!-- Positioned the search icon at the right side of the search bar -->
			<div
				class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
				on:click={handleSearchClick}
				on:keydown={(e) => e.key === 'Enter' && handleSearchClick()}
				tabindex="0"
				role="button"
				aria-label="Search"
			>
				<a href="/search"><Search color="#D1D7E0" size={20} /></a>
			</div>
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1 rounded-[20px]"
		>
			<Gem color="#B693DC" />
			<div
				class="relative h-[22px] w-[45px] text-left text-base font-semibold leading-[140%] text-[#b693dc]"
			>
				<a href="/pro">PRO</a>
			</div>
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-start justify-start gap-1"
		>
			<Bookmark color="#D1D7E0" />
			<div class="relative text-center text-base font-semibold leading-[140%] text-[#d1d7e0]">
				<a href="/watchlist">Watchlist</a>
			</div>
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
		>
			<UserRound color="#D1D7E0" />
			<div class="relative text-center text-base font-semibold leading-[140%] text-[#d1d7e0]">
				<a href="login">Log in</a>
			</div>
		</div>

		<div
			class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
		>
			<CircleUser color="#D1D7E0" />
			<div class="relative text-center text-base font-semibold leading-[140%] text-[#d1d7e0]">
				<a href="signup">Sign Up</a>
			</div>
		</div>
	</div>
</div>
