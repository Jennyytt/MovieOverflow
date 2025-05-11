<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import pb from '$lib/pb';

	// This component takes a prop to determine if auth is required
	let { requireAuth = true } = $props();

	onMount(() => {
		if (requireAuth && !pb.authStore.isValid) {
			// Get current path for redirect after login
			const currentPath = window.location.pathname;
			goto(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
		}
	});
</script>

<!-- This component doesn't render anything visible -->
<slot />
