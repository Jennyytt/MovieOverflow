<script>
	import '../app.css';
	import NavBar from '../lib/customComponents/NavBar.svelte';
	import Footer from '../lib/customComponents/Footer.svelte';
	let { children } = $props();
</script>

<NavBar />
{@render children()}
<Footer />
