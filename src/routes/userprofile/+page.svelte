<script>
	import UserProfileView from '../../views/userprofile/UserProfileView.svelte';
	import WatchlistView from '../../views/userprofile/WatchlistView.svelte';
	import CriticReviewView from '../../views/userprofile/CriticReviewView.svelte';
	import ReviewDraftView from '../../views/userprofile/ReviewDraftView.svelte';
	import UserCommentView from '../../views/userprofile/UserCommentView.svelte';

	let ProUser = false; // Set this to true if the user is a pro user
	let username = null;

	import pb from '$lib/pb';
	export let userId = null; // The user ID
	let userInfo = null; // To store the fetched user information
	//let error = null; // To handle errors

	// Check if a user is logged in and get their userId
	if (pb.authStore.isValid) {
		userId = pb.authStore.model.id; // Get the logged-in user's ID
		userInfo = pb.authStore.model; // Get the logged-in user's full information
		ProUser = userInfo.isPro; // Set ProUser based on the fetched data
		username = userInfo.username; // Set username based on the fetched data
	} else {
		console.error('No user is logged in.');
	}

	import AuthGuard from '$lib/customComponents/authguard/AuthGuard.svelte';
	//let ProUser = true; // Set this to true if the user is a pro user
</script>

<AuthGuard requireAuth={true} />

<div class="mt-8">
	<!-- 
	<div>
		{#if userInfo}
			<p>Username: {userInfo.username}</p>
			<p>Email: {userInfo.email}</p>
			<p>IsPro: {userInfo.isPro}</p>
		{:else if error}
			<p>Error: {error}</p>
		{:else}
			<p>Loading user information...</p>
		{/if}
	</div>-->
	<UserProfileView {ProUser} {username} />
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
