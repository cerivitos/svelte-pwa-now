<script>
  import FadeInImage from "./FadeInImage.svelte";
  import {fade} from 'svelte/transition';
  import {showCarousel, carouselName, carouselPics} from "../store/store.js";

  let innerWidth;
</script>

<svelte:window bind:innerWidth="{innerWidth}" />

<div transition:fade="{{duration: 80}}"
  class="fixed top-0 w-full h-full overflow-auto flex lg:flex-col items-center z-20"
  style="background: rgba(0, 0, 0, 0.7)" on:click="{() => showCarousel.set(false) }"
>
  {#each $carouselPics as pic, i}
  <FadeInImage
    src="{pic}"
    alt ="{$carouselName + ' ' + (i + 1)}"
    tailwindClass="w-full h-64 lg:w-auto lg:h-auto m-2 object-cover"
  />
  {/each}
</div>
