<script>
	import ReviewEditView from '../../views/moviereviewedit/ReviewEditView.svelte';
	import AuthGuard from '$lib/customComponents/authguard/AuthGuard.svelte';
</script>

<AuthGuard requireAuth={true} />

<div class="m-0 flex min-h-screen w-full flex-col items-center p-0">
	<div class="mt-8">
		<ReviewEditView />
	</div>
</div>
