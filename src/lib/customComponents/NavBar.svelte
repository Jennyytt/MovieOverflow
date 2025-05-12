<script>
	import logoSmall from '../../assets/MOicon-small.png';
	import { Search, Gem, Bookmark, UserRound, CircleUser, LogOut } from '@lucide/svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { authStore } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';

	// ! TODO: Function to handle search click
	function handleSearchClick() {
		// const searchInput = document.querySelector('input[type="text"]');
		// 		const query = searchInput.value;
	}

	// Function to handle logout
	function handleLogout() {
		authStore.logout();
		goto('/');
	}

	// Determine if user is PRO
	$: isPro = $authStore.isAuthenticated && $authStore.user?.isPro;

	// Function to handle PRO button click
	function handleProClick(event) {
		// Prevent default navigation
		event.preventDefault();

		if (isPro) {
			// Do nothing if already PRO
			return;
		} else if ($authStore.isAuthenticated) {
			// Navigate to PRO upgrade page if logged in but not PRO
			goto('/pro');
		} else {
			// Navigate to login page with redirect parameter if not logged in
			goto('/login?redirectTo=/pro');
		}
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
				onclick={handleSearchClick}
				onkeydown={(e) => e.key === 'Enter' && handleSearchClick()}
				tabindex="0"
				role="button"
				aria-label="Search"
			>
				<a href="/search"><Search color="#D1D7E0" size={20} /></a>
			</div>
		</div>

		<!-- PRO Button with custom click handler -->
		<div
			class="relative flex flex-shrink-0 {isPro
				? 'cursor-default'
				: 'cursor-pointer'} flex-row items-center justify-center gap-1 rounded-[20px]"
		>
			<Gem color={isPro ? '#FFC700' : '#B693DC'} />
			<div
				class="relative h-[22px] w-[45px] text-left text-base font-semibold leading-[140%] {isPro
					? 'text-[#FFC700]'
					: 'text-[#b693dc]'}"
				onclick={handleProClick}
				onkeydown={(e) => e.key === 'Enter' && handleProClick(e)}
				tabindex="0"
				role="button"
			>
				PRO
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

		{#if $authStore.isAuthenticated}
			<!-- User Account - Displayed when logged in -->
			<div
				class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
			>
				<UserRound color="#D1D7E0" />
				<div class="relative text-center text-base font-semibold leading-[140%] text-[#d1d7e0]">
					<a href="/userprofile">Account</a>
				</div>
			</div>

			<!-- Logout Button - Displayed when logged in -->
			<div
				class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
				onclick={handleLogout}
				onkeydown={(e) => e.key === 'Enter' && handleLogout()}
				tabindex="0"
				role="button"
			>
				<LogOut color="#D1D7E0" />
				<div class="relative text-center text-base font-semibold leading-[140%] text-[#d1d7e0]">
					Logout
				</div>
			</div>
		{:else}
			<!-- Login Button - Displayed when not logged in -->
			<div
				class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
			>
				<UserRound color="#D1D7E0" />
				<div class="relative text-center text-base font-semibold leading-[140%] text-[#d1d7e0]">
					<a href="/login">Log in</a>
				</div>
			</div>

			<!-- Sign Up Button - Displayed when not logged in -->
			<div
				class="relative flex flex-shrink-0 cursor-pointer flex-row items-center justify-center gap-1"
			>
				<CircleUser color="#D1D7E0" />
				<div class="relative text-center text-base font-semibold leading-[140%] text-[#d1d7e0]">
					<a href="/signup">Sign Up</a>
				</div>
			</div>
		{/if}
	</div>
</div>
