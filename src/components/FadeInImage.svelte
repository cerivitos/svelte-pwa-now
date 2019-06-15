<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let src;
  export let alt;
  export let tailwindClass;
  export let duration = 150;

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
/>
