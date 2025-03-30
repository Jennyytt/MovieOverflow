<script>
	import logoSmall from '../../assets/MOicon-small.png';
	import { Search, Gem, Bookmark, UserRound, CircleUser } from '@lucide/svelte';
</script>

<div class="navbar-unsigned">
	<div class="nav-content">
		<div class="mo-icon">
			<img
				class="h-[44px] min-h-[44px] w-[180px] min-w-[180px]"
				alt="The project logo"
				src={logoSmall}
			/>
		</div>

		<div class="nav-searchbar">
			<div class="what-do-you-want-to-search">What do you want to search?</div>
			<Search color="#D1D7E0" />
		</div>

		<div class="nav-pro">
			<Gem color="#B693DC" />

			<div class="pro">PRO</div>
		</div>

		<div class="nav-watchlist">
			<Bookmark color="#D1D7E0" />
			<div class="watchlist">Watchlist</div>
		</div>

		<div class="nav-account">
			<UserRound color="#D1D7E0" />
			<div class="log-in">Log in</div>
		</div>

		<div class="nav-account">
			<CircleUser color="#D1D7E0" />
			<div class="sign-up">Sign Up</div>
		</div>
	</div>
</div>

<style>
	.navbar-unsigned,
	.navbar-unsigned * {
		box-sizing: border-box;
	}

	.navbar-unsigned {
		background: var(--brand-nav-bar-grey, #1d1d1d);
		height: 66px;
		position: relative;
		overflow: hidden;
	}

	.nav-content {
		display: flex;
		flex-direction: row;
		gap: 50px;
		align-items: center;
		justify-content: flex-start;
		position: absolute;
		left: 50%;
		translate: -50% -50%;
		top: 50%;
	}

	.mo-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-shrink: 0;
		position: relative;
	}

	.nav-searchbar {
		background: #2b2b2b;
		border-radius: 10px;
		padding: 12px 6px 12px 6px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-shrink: 0;
		width: 514px;
		height: 56px;
		min-width: 250px;
		position: relative;
	}

	.what-do-you-want-to-search {
		color: var(--dark-text-secondary, #797979);
		text-align: left;
		font-family: 'Inter-Regular', sans-serif;
		font-size: 14px;
		font-weight: 400;
		position: relative;
	}

	.nav-pro {
		border-radius: 20px;
		display: flex;
		flex-direction: row;
		gap: 4px;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		position: relative;
		cursor: pointer;
	}

	.pro {
		color: var(--brand-primary-light, #b693dc);
		text-align: left;
		font-family: 'Inter-SemiBold', sans-serif;
		font-size: 16px;
		line-height: 140%;
		font-weight: 600;
		position: relative;
		width: 45px;
		height: 22px;
	}

	.nav-watchlist {
		display: flex;
		flex-direction: row;
		gap: 4px;
		align-items: flex-start;
		justify-content: flex-start;
		flex-shrink: 0;
		position: relative;
		cursor: pointer;
	}

	.watchlist {
		color: #d1d7e0;
		text-align: center;
		font-family: 'Inter-SemiBold', sans-serif;
		font-size: 16px;
		line-height: 140%;
		font-weight: 600;
		position: relative;
	}

	.nav-account {
		display: flex;
		flex-direction: row;
		gap: 4px;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		position: relative;
		cursor: pointer;
	}

	.log-in {
		color: var(--brand-nav-bar-icon-grey, #d1d7e0);
		text-align: center;
		font-family: 'Inter-SemiBold', sans-serif;
		font-size: 16px;
		line-height: 140%;
		font-weight: 600;
		position: relative;
	}

	.sign-up {
		color: var(--brand-nav-bar-icon-grey, #d1d7e0);
		text-align: center;
		font-family: 'Inter-SemiBold', sans-serif;
		font-size: 16px;
		line-height: 140%;
		font-weight: 600;
		position: relative;
	}
</style>
