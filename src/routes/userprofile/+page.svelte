<script>
	import UserProfileView from '../../views/userprofile/UserProfileView.svelte';
	import WatchlistView from '../../views/userprofile/WatchlistView.svelte';
	import CriticReviewView from '../../views/userprofile/CriticReviewView.svelte';
	import ReviewDraftView from '../../views/userprofile/ReviewDraftView.svelte';
	import UserCommentView from '../../views/userprofile/UserCommentView.svelte';
	let ProUser = false; // Set this to true if the user is a pro user

	import pb from '$lib/pb';
	export let userId = '0038fspgp919464'; // The user ID
	let userInfo = null; // To store the fetched user information
	let error = null; // To handle errors

	// Fetch user information
	async function fetchUserInfo() {
		try {
			userInfo = await pb.collection('users').getOne(userId);
			// console.log('User Info:', userInfo); Logs the user information
			ProUser = userInfo.isPro; // Set ProUser based on the fetched data
		} catch (err) {
			error = err.message;
			console.error('Error fetching user info:', error);
		}
	}

	// Call the function when the component is mounted
	fetchUserInfo();
</script>

<div class="mt-8">
	<!--<div>
    {#if userInfo}
        <p>Username: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
		<p>IsPro: {userInfo.isPro}</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
        <p>Loading user information...</p>
    {/if}
</div> -->
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
