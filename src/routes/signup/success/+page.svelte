<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SignUpSuccess from '../../../lib/customComponents/userauthen/SuccessMessage.svelte';
	import pb from '$lib/pb';

	let token = '';
	let verified = false;
	let failed = false;

	$: token = $page.url.searchParams.get('token');

	onMount(async () => {
  console.log("Token from URL:", token);
  try {
    await pb.collection('users').confirmVerification(token);
    console.log("Verification succeeded");
    verified = true;
  } catch (err) {
    console.error("Verification failed:", JSON.stringify(err?.response?.data || err, null, 2)); //for debug

  }
});

</script>

<div>
	<SignUpSuccess
		message1={['Congratulations! You have created an account.']}
		message2={['Click “Log in” to log in MovieOverflow.']}
	/>
	<br />
</div>