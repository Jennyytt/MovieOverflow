<script>
	import UserProfileBlock from '$lib/customComponents/userprofile/UserProfileBlock.svelte';
	export let ProUser = false; // Set this to true if the user is a pro user
	export let username = 'Test User Name';
</script>

<div class="relative flex flex-shrink-0 flex-col items-start justify-center gap-8 self-stretch">
	<div
		class="relative flex w-[1100px] flex-shrink-0 flex-row items-center justify-between self-stretch"
	>
		<!-- Section title with purple line and arrow -->
		<div class="relative flex flex-shrink-0 flex-row items-center justify-start gap-3">
			<div class="relative h-[37px] w-[5px] flex-shrink-0 rounded-[2px] bg-[#802bb1]"></div>
			<div class="relative text-left text-[32px] font-semibold text-white">Personal Profile</div>
		</div>
	</div>

	<UserProfileBlock {ProUser} {username} />
</div>
