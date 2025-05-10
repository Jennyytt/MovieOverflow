<script>
	import UserProfileView from '../../views/userprofile/UserProfileView.svelte';
	import WatchlistView from '../../views/userprofile/WatchlistView.svelte';
	import CriticReviewView from '../../views/userprofile/CriticReviewView.svelte';
	import ReviewDraftView from '../../views/userprofile/ReviewDraftView.svelte';
	import UserCommentView from '../../views/userprofile/UserCommentView.svelte';
</script>

<div class="mt-8">
	<UserProfileView />
	<br />
	<br />
	<WatchlistView />
	<br />
	<br />
	<CriticReviewView />
	<br />
	<br />
	<ReviewDraftView />
	<br />
	<br />
	<UserCommentView />
</div>
