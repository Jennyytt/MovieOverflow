<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
  
    function handleClose() {
      // Implement modal close or redirect logic here
      console.log("Close button clicked");
    }
  
    function goToLogin() {
      // Navigate to the login page
      window.location.href = "/log-in";
    }
  </script>
  
  <Card.Root
    class="relative w-[527px] min-h-[600px] rounded-[23.48px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] pt-[75px] pl-[42px] pr-[42px] pb-[68px]"
    style="outline-offset: -3px"
  >
    <!-- Close Icon (top right corner) -->
    <div
      class="absolute top-[41px] right-[40px] w-[23.48px] h-[23.48px] cursor-pointer"
      on:click={handleClose}
    >
      <div class="absolute w-[13.7px] h-[13.7px] top-[4.89px] left-[4.89px] bg-[#666666] rounded-sm" />
    </div>
  
    <Card.Content class="flex flex-col gap-[25px] p-0 w-[450px]">
      <!-- Title -->
      <div class="flex items-center gap-[8px]">
        <div class="w-[4.25px] h-[23.11px] bg-[#A508FF] rounded-[2px]" />
        <h1 class="text-[#46344E] text-[31.31px] font-[900] leading-none">Successful</h1>
      </div>
  
      <!-- Instructional Message -->
      <div class="text-[#5F1F73] text-[15px] font-[400] leading-[24px] tracking-[0.15px]">
        <p>Congratulations! Your Password has been changed.</p>
        <p>Click “Log in” to log in with your new password.</p>
      </div>
  
      <!-- Spacer -->
      <div class="h-[23.12px]"></div>
  
      <!-- Log In Button -->
      <div class="h-[55px] flex flex-col justify-start items-start gap-[30.62px]">
        <Button
          class="w-[449.04px] h-[54.78px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-white text-[17.61px] font-[400]"
          on:click={goToLogin}
        >
          Log in
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
  