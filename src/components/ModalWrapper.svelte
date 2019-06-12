<script>
  import { fly } from "svelte/transition";
  import { showModal } from "../store/store.js";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { writable } from "svelte/store";

  export let transitionTrigger = false;
  export let duration = 500;
  export let distance = 800;
  export let dimBackground = false;

  let yPos = writable(200);
  yPos = tweened(0, {
    duration: duration,
    easing: cubicOut
  });

  $: if (transitionTrigger) {
    yPos.set(0);
  } else {
    yPos.set(distance);
  }

  let bgClass;

  function setBackground(dimBackground) {
    if (dimBackground) {
      bgClass = "bg-black opacity-50";
    } else {
      bgClass = "";
    }

    return bgClass;
  }
</script>

<!--Need to keep background and modal in the same css stacking context-->
<div
  style="transform: translateY({$yPos}px)"
  class="{setBackground(dimBackground)}"
>
  <!--Do opposite translation on background to maintain its position-->
  <div style="transform: translateY({$yPos * -1}px)">
    <slot name="background"></slot>
  </div>
  <slot name="modal"></slot>
</div>
