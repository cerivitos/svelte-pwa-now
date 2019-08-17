<script lang="ts">
  let count: number = 0;

  function incrementCount() {
    count = count + 1;
  }
</script>

<style type="text/postcss">
  .button {
    @apply bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2;
  }
</style>

<div class="flex items-center justify-center h-screen bg-gray-300 w-full">
  <button class="button" on:click={() => incrementCount()}>{count}</button>
</div>
