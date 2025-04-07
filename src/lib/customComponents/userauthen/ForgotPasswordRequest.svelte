<script>
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import EmailField from "$lib/customComponents/userauthen/EmailField.svelte";

  let email = "";
</script>

<Card.Root
  class="relative w-[527px] min-h-[600px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] pt-[68px] pb-[68px] pl-[39px] pr-[38px]"
  style="outline-offset: -3px"
>
  <Card.Content class="flex flex-col gap-[15px] p-0">
    <!-- Title -->
    <div class="mb-[15px] flex items-start gap-[8px]">
      <div class="w-[5px] h-[37px] bg-[#A508FF] rounded-[2px]"></div>
      <h1 class="text-[#46344E] text-[31.31px] font-[900] leading-none">Forgot Password</h1>
    </div>

    <!-- Email Field -->
    <div class="w-[449.04px]">
      <EmailField bind:value={email} />
    </div>

    <!-- Instruction Text -->
    <div class="text-[15.93px] text-[#5F1F73] leading-[20px] tracking-[0.18px] font-[400] w-[449.04px]">
      <p>We will send a link to your email for password reset.</p>
      <p>Please check your email for further action.</p>
    </div>

    <!-- Send Link Button -->
    <div class="h-[115.15px] flex flex-col justify-start items-start gap-[30.62px]">
      <Button
        class="w-[449.04px] h-[54.78px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-white text-[17.61px] font-[400]"
      >
        Send Link
      </Button>
    </div>

    <!-- Footer Link -->
    <div class="text-[15.65px] text-[#5F1F73] font-[400]">
      Already have an account?
      <a href="/log-in" class="text-[rgba(128,43,177,0.80)] underline">Log in</a>
    </div>
  </Card.Content>
</Card.Root>
