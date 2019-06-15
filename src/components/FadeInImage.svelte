<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { createEventDispatcher } from "svelte";

  export let src;
  export let alt;
  export let tailwindClass;
  export let index = 0;
  export let duration = 150;

  const dispatch = createEventDispatcher();

  function dispatchClicked() {
    dispatch("clicked", {
      index: index
    });
  }

  const opacityTween = tweened(0, {
    duration: duration,
    easing: cubicOut
  });

  function fadeIn() {
    if ($opacityTween > 0) {
      opacityTween.set(0);
      setTimeout(() => {
        opacityTween.set(1);
      }, duration);
    } else {
      opacityTween.set(1);
    }
  }
</script>

<img
  {src}
  {alt}
  class="{tailwindClass}"
  style="opacity: {$opacityTween}"
  on:load="{fadeIn}"
  on:click="{dispatchClicked}"
/>
