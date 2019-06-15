<script>
  import FadeInImage from "./FadeInImage.svelte";
  import {fade} from 'svelte/transition';
  import {createEventDispatcher} from "svelte";

  export let pics = [];
  export let name = '';
  let innerWidth;

  const dispatch = createEventDispatcher();

  function dispatchClicked() {
    dispatch("clicked");
  }
</script>

<svelte:window bind:innerWidth="{innerWidth}" />

<div transition:fade
  class="fixed top-0 w-full h-full overflow-auto flex lg:flex-col items-center"
  style="background: rgba(0, 0, 0, 0.9)" on:click="{dispatchClicked}"
>
  {#each pics as pic, i}
  <FadeInImage
    src="{pic}"
    alt ="{name + ' ' + (i + 1)}"
    tailwindClass="w-full h-64 lg:w-auto lg:h-auto m-2 object-cover"
  />
  {/each}
</div>
