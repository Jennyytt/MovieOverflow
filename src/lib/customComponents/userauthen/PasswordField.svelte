<script>
  import { Input } from "$lib/components/ui/input";
  import { Eye, EyeOff } from "@lucide/svelte";

  export let label = "Password";
  export let placeholder = "Enter your password";
  export let value = "";
  export let errorMessage = "";

  export let showConfirm = false;
  export let confirmValue = "";
  export let confirmPlaceholder = "Re-enter your password";
  export let confirmErrorMessage = "";

  let showPassword = false;
  let showConfirmPassword = false;

  const toggle = (field) =>
    field === "main"
      ? (showPassword = !showPassword)
      : (showConfirmPassword = !showConfirmPassword);

  $: confirmError = showConfirm && confirmValue && value !== confirmValue
    ? "Passwords do not match"
    : "";
</script>

<!-- 🔐 Password Field -->
<div class="flex flex-col w-full">
  <span class="mb-[3.91px] text-[15.65px] text-[#5F1F73] font-[400]">{label}</span>

  <div class="relative w-full">
    <Input
      type={showPassword ? "text" : "password"}
      bind:value={value}
      placeholder={placeholder}
      class="h-[54.78px] w-full rounded-[11.74px] border border-[rgba(102,102,102,0.35)]
             px-[23.48px] pr-[48px] text-[15.65px] font-[400]
             placeholder:text-[rgba(102,102,102,0.60)] text-[#5F1F73]"
    />
    <div
      class="absolute right-[15px] top-[15.28px] w-[23.48px] h-[23.48px] cursor-pointer"
      on:click={() => toggle("main")}
    >
      {#if showPassword}
        <EyeOff class="w-full h-full text-gray-500" />
      {:else}
        <Eye class="w-full h-full text-gray-500" />
      {/if}
    </div>
  </div>

  {#if errorMessage}
    <p class="text-[13.7px] text-[#EE1D52] font-[400] mt-1">{errorMessage}</p>
  {/if}
</div>

<!-- 🔁 Confirm Password Field -->
{#if showConfirm}
  <div class="flex flex-col w-full mt-4">
    <span class="mb-[3.91px] text-[15.65px] text-[#5F1F73] font-[400]">Confirm Password</span>

    <div class="relative w-full">
      <Input
        type={showConfirmPassword ? "text" : "password"}
        bind:value={confirmValue}
        placeholder={confirmPlaceholder}
        class="h-[54.78px] w-full rounded-[11.74px] border border-[rgba(102,102,102,0.35)]
               px-[23.48px] pr-[48px] text-[15.65px] font-[400]
               placeholder:text-[rgba(102,102,102,0.60)] text-[#5F1F73]"
      />
      <div
        class="absolute right-[15px] top-[15.28px] w-[23.48px] h-[23.48px] cursor-pointer"
        on:click={() => toggle("confirm")}
      >
        {#if showConfirmPassword}
          <EyeOff class="w-full h-full text-gray-500" />
        {:else}
          <Eye class="w-full h-full text-gray-500" />
        {/if}
      </div>
    </div>

    {#if confirmErrorMessage || confirmError}
      <p class="text-[13.7px] text-[#EE1D52] font-[400] mt-1">
        {confirmErrorMessage || confirmError}
      </p>
    {/if}
  </div>
{/if}
