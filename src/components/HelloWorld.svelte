<script lang="typescript">
  import { count } from "../store/store";

  let startNumber: number = 1;

  function incrementCount(incrementBy: number) {
    count.update(n => n + incrementBy);
  }
</script>

<div class="flex items-center justify-center h-screen bg-gray-300 w-full">
  <button class="button" on:click={() => incrementCount(1)}>{$count}</button>
</div>
