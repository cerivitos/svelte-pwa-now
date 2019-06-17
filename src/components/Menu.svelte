<script>
  import { showMenu } from "../store/store.js";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  let innerWidth;
</script>

<svelte:window bind:innerWidth="{innerWidth}" />

<div
  transition:fade
  class="fixed top-0 w-full h-full overflow-auto flex lg:flex-col items-center z-20"
  style="background: rgba(0, 0, 0, 0.7)"
  on:click="{(e) => showMenu.set(false) }"
>
  {#if innerWidth < 1024}
  <div
    transition:fly="{{x: -innerWidth * 0.7}}"
    class="bg-gray-200 shadow-lg h-full fixed left-0 top-0"
    style="width: {innerWidth * 0.7}px"
    on:click|stopPropagation=""
  >
    <slot></slot>
  </div>
  {:else}
  <!-- Limit transition fly amount to better see animation on large screen -->
  <div
    transition:fly="{{x: -300}}"
    class="bg-gray-200 shadow-lg h-full fixed left-0 top-0 z-20"
    style="width: {innerWidth * 0.4}px"
    on:click|stopPropagation=""
  >
    <slot></slot>
  </div>
  {/if}
</div>
