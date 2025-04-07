<script>
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import EmailField from "$lib/customComponents/userauthen/EmailField.svelte";
  import PasswordField from "$lib/customComponents/userauthen/PasswordField.svelte";

  let email = "";
  let password = "";
</script>

<Card.Root class="relative w-[527px] h-[600px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] pt-[68px] pb-[68px] pl-[39px] pr-[38px]" style="outline-offset: -3px">
  <div class="mb-[15px] flex items-start gap-[8px]">
    <div class="w-[5px] h-[37px] bg-[#A508FF] rounded-[2px]"></div>
    <h1 class="text-[#46344E] text-[31.31px] font-[900] leading-none">Log in</h1>
  </div>

  <Card.Content class="flex flex-col gap-[15px] p-0">
    <!-- ✅ Reusable Email Field -->
    <div class="w-[449.04px]">
      <EmailField bind:value={email} errorMessage="Your account is not found." />
    </div>

    <!-- ✅ Reusable Password Field (no confirm) -->
    <div class="w-[449.04px]">
      <PasswordField bind:value={password} showConfirm={false} />
    </div>

    <!-- Forgot Password -->
    <div class="flex justify-end w-[449.56px]">
      <a href="#" class="text-[14.7px] text-[rgba(51,51,51,0.80)]">Forgot Password</a>
    </div>

    <!-- Login Button -->
    <div class="h-[115.15px] flex flex-col justify-start items-start gap-[30.62px]">
      <Button class="w-[449.04px] h-[54.78px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-white text-[17.61px] font-[400]">
        Log in
      </Button>
    </div>

    <!-- Sign Up -->
    <div class="text-[15.65px] text-black">
      Don’t have an account?
      <a href="#" class="text-[#5F1F73] underline">Sign Up</a>
    </div>
  </Card.Content>
</Card.Root>
