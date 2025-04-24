<script>
	import { Input } from '$lib/components/ui/input';
  
	export let label = "Email";
	export let placeholder = "Enter your email address";
	export let value = "";
	export let errorMessage = "";
  
	
  </script>
  
  <div class="flex flex-col w-full">
	<span class="mb-[3.91px] text-[15.65px] text-[#5F1F73] font-[400]">{label}</span>
  
	<Input
	  type="email"
	  bind:value={value}
	  placeholder={placeholder}
	  class="h-[54.78px] w-full rounded-[11.74px] border border-[rgba(102,102,102,0.35)]
			 px-[23.48px] text-[15.65px] font-[400]
			 text-[rgba(102,102,102,1)] placeholder:text-[rgba(102,102,102,0.60)]"
	  required
	/>
  
	{#if typeof errorMessage === 'string' && errorMessage.trim() !== ''}
	<p class="text-[13.7px] text-[#EE1D52] font-[400] mt-1">{errorMessage}</p>
	{/if}
  
  </div>