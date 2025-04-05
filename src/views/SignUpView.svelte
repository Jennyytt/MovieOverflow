<script>
    import SignUpBox from '../lib/customComponents/userauthen/SignUpBox.svelte';
    import logoBig from '../assets/MOicon-large.png'
</script>

<!-- Full page layout: horizontally align logo + login box -->
<div class="flex min-h-screen items-center justify-center gap-[34px] bg-black px-8 py-12">
	<!-- Logo Section -->
	<div class="flex flex-col items-start">
		<img src={logoBig} alt="MovieOverflow logo" class="w-[401px] h-[148px]" />
	</div>

	<!-- Login Section -->
	<div>
		<SignUpBox />
	</div>
</div>