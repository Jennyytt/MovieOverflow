<script>
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";

  function goToLogin() {
    window.location.href = "/log-in";
  }
</script>

<Card.Root
  class="relative w-[527px] min-h-[600px] rounded-[23.48px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] pt-[75px] px-[42px] pb-[68px]"
  style="outline-offset: -3px"
>
  <Card.Content class="relative w-full h-full p-0">
    <!-- Title -->
    <div class="absolute left-0 top-0 w-[204px] h-[24px] flex justify-center text-[#46344E] text-[31.31px] font-[900]">
      Successful
    </div>

    <!-- Description (129px below the title) -->
    <div class="absolute left-0 top-[153px] w-[444px] h-[52px] text-[#5F1F73] text-[15px] font-[400] leading-[24px] tracking-[0.15px]">
      Congratulations! You have created an account.<br />
      Click “Log in” to log in MovieOverflow.
    </div>

    <!-- Log In Button (place wherever appropriate below) -->
    <div class="absolute left-0 top-[250px] h-[55px] flex flex-col justify-start items-start gap-[30.62px]">
      <Button
        class="w-[449.04px] h-[54.78px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-white text-[17.61px] font-[400]"
        on:click={goToLogin}
      >
        Log in
      </Button>
    </div>
  </Card.Content>
</Card.Root>
