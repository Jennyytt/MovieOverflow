<script>
	import UserProfileView from '../../views/userprofile/UserProfileView.svelte';
	import WatchListView from '../../views/userprofile/WatchListView.svelte';
	import CriticReviewView from '../../views/userprofile/CriticReviewView.svelte';
	import ReviewDraftView from '../../views/userprofile/ReviewDraftView.svelte';
	import UserCommentView from '../../views/userprofile/UserCommentView.svelte';
</script>

<div class="mt-8">
	<UserProfileView />
	<br />
	<br />
	<WatchListView />
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
