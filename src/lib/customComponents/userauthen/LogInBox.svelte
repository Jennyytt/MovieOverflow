<script>
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
</script>

<Card.Root class="relative w-[527px] h-[600px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] pt-[68px] pb-[68px] pl-[39px] pr-[38px]" style="outline-offset: -3px">
  <div class="mb-[15px] flex items-start gap-[8px]">
    <div class="w-[5px] h-[37px] bg-[#A508FF] rounded-[2px]"></div>
    <h1 class="text-[#46344E] text-[31.31px] font-[900] leading-none">Log in</h1>
  </div>

  <Card.Content class="flex flex-col gap-[15px] p-0">
    <!-- Email -->
    <div class="flex flex-col gap-[3.91px] w-[449.04px]">
      <p class="text-[15.65px] text-[#5F1F73] font-[400]">Email</p>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email address"
        class="h-[54.78px] rounded-[11.74px] border border-[rgba(102,102,102,0.35)] px-[23.48px] text-[15.65px] placeholder:text-[rgba(102,102,102,0.60)]"
        required
      />
      <p class="text-[13.7px] text-[#EE1D52]">Your account is not found.</p>
    </div>

    <!-- Password -->
    <div class="flex flex-col gap-[3.91px] w-[449.04px]">
      <p class="text-[15.65px] text-[#5F1F73] font-[400]">Password</p>
      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        class="h-[54.78px] rounded-[11.74px] border border-[rgba(102,102,102,0.35)] px-[23px] text-[15.65px]  placeholder:text-[rgba(102,102,102,0.60)]"
        required
      />
    </div>

    <!-- Forgot Password -->
    <div class="flex justify-end w-[449.56px]">
      <a href="#" class="text-[14.7px] text-[rgba(51,51,51,0.80)] ">Forgot Password</a>
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
