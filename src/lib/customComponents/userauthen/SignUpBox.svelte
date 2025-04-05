<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Eye, EyeOff } from "@lucide/svelte";
  
    let showPassword = false;
    let showConfirmPassword = false;
  </script>
  
  <Card.Root class="relative w-[619px] min-h-[763px] rounded-[25px] border-[3px] border-[#ABBED1] bg-[#EEEEEE] px-[84.4px] pt-[65px] pb-[64.8px]" style="outline-offset: -3px">
    <!-- Title Section -->
    <div class="mb-[15px] flex items-start gap-[15px]">
      <div class="w-[5px] h-[34.36px] bg-[#A508FF] rounded-[2px]"></div>
      <h1 class="text-[#46344E] text-[31.31px] font-[900] leading-none">
        Welcome to MovieOverflow
      </h1>
    </div>
  
    <Card.Content class="flex flex-col gap-[15px] p-0 w-[451px]">
      <!-- Email -->
      <div class="flex flex-col w-full">
        <span class="mb-[3.91px] text-[15.65px] text-[#5F1F73] font-[400]">Email</span>
        <Input
          id="email"    
          type="email"
          placeholder="Enter your email address"
          class="h-[54.78px] rounded-[11.74px] border border-[rgba(102,102,102,0.35)] px-[23.48px] text-[15.65px] font-[400] text-[rgba(102,102,102,1)] placeholder:text-[rgba(102,102,102,0.60)]"
          required
        />
      </div>
  
      <!-- Username -->
      <div class="flex flex-col w-full">
        <span class="mb-[3.91px] text-[15.65px] text-[#5F1F73] font-[400]">Username</span>
        <Input
          type="text"
          placeholder="Enter your username"
          class="h-[54.78px] rounded-[11.74px] border border-[rgba(102,102,102,0.35)] px-[23.48px] text-[15.65px] font-[400] placeholder:text-[rgba(102,102,102,0.60)]"
        />
        <p class="text-[13.7px] text-[#EE1D52] font-[400]">Your username is used already.</p>
      </div>
  
      <!-- Password -->
      <div class="flex flex-col w-full relative">
        <span class="mb-[3.91px] text-[15.65px] text-[#5F1F73] font-[400]">Password</span>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          class="h-[54.78px] w-full rounded-[11.74px] border border-[rgba(102,102,102,0.35)] px-[23.48px] pr-10 text-[15.65px] font-[400] placeholder:text-[rgba(102,102,102,0.60)] text-[#5F1F73]"
        />
        {#if showPassword}
          <EyeOff class="absolute right-[15px] top-[47px] w-[23.48px] h-[23.48px] text-gray-500 cursor-pointer" on:click={() => showPassword = false} />
        {:else}
          <Eye class="absolute right-[15px] top-[47px] w-[23.48px] h-[23.48px] text-gray-500 cursor-pointer" on:click={() => showPassword = true} />
        {/if}
      </div>
  
      <!-- Confirm Password -->
      <div class="flex flex-col w-full relative">
        <span class="mb-[3.91px] text-[15.65px] text-[#5F1F73] font-[400]">Confirm Password</span>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter your password"
          class="h-[54.78px] w-full rounded-[11.74px] border border-[rgba(102,102,102,0.35)] px-[23.48px] pr-10 text-[15.65px] font-[400] placeholder:text-[rgba(102,102,102,0.60)]"
        />
        {#if showConfirmPassword}
          <EyeOff class="absolute right-[15px] top-[47px] w-[23.48px] h-[23.48px] text-gray-500 cursor-pointer" on:click={() => showConfirmPassword = false} />
        {:else}
          <Eye class="absolute right-[15px] top-[47px] w-[23.48px] h-[23.48px] text-gray-500 cursor-pointer" on:click={() => showConfirmPassword = true} />
        {/if}
        <p class="text-[13.7px] text-[#EE1D52] font-[400] mt-1">Your password is not matched, please try again.</p>
      </div>
  
      <!-- Create Account Button -->
      <div class="h-[115.15px] flex flex-col justify-start items-start gap-[30.62px]">
        <Button class="w-full h-[54.78px] rounded-[31.31px] bg-[rgba(128,43,177,0.80)] text-white text-[17.61px] font-[400] text-center flex items-center justify-center">
          Create Account
        </Button>
      </div>
  
      <!-- Footer -->
      <div class="text-[15.65px] text-[#333333] font-[400]">
        Already have an account?
        <a href="#" class="text-[#111111] underline font-[700]"> Log in </a>
      </div>
    </Card.Content>
  </Card.Root>
  