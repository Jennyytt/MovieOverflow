<script>
	import '../app.css';
	import NavBar from '../lib/customComponents/NavBar.svelte';
	let { children } = $props();
</script>

<NavBar />
{@render children()}
<!-- <Footer /> -->
