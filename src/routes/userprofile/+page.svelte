<script>
	import UserProfileView from '../../views/userprofile/UserProfileView.svelte';
	import WatchlistView from '../../views/userprofile/WatchlistView.svelte';
	import CriticReviewView from '../../views/userprofile/CriticReviewView.svelte';
	import ReviewDraftView from '../../views/userprofile/ReviewDraftView.svelte';
	import UserCommentView from '../../views/userprofile/UserCommentView.svelte';
	import AuthGuard from '$lib/customComponents/authguard/AuthGuard.svelte';
	let ProUser = true; // Set this to true if the user is a pro user
</script>

<AuthGuard requireAuth={true} />

<div class="mt-8">
	<UserProfileView {ProUser} />
	<br />
	<br />
	<WatchlistView />
	<br />
	<br />
	{#if ProUser}
		<CriticReviewView />
		<br />
		<br />
		<ReviewDraftView />
		<br />
		<br />
	{/if}
	<UserCommentView />
</div>
