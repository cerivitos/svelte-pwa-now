<script>
  export let pics = [];
  export let index = 0;
  let innerWidth;
</script>

<svelte:window bind:innerWidth="{innerWidth}" />

<div class="w-full h-full bg-black opacity-75">
  {#if innerWidth < 1024}
  <div class="overflow-auto">
    {#each pics as pic}
    <img src="{pic}" class="w-full" />
    {/each}
  </div>
  {/if}
</div>
