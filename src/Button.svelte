<script>
  let clicks = 0

  const handleClick = () => (clicks += 1);
</script>
<style>
.space{
  @apply px-4 py-2;
}
.color{
  @apply text-white;
}
</style>
<button
  class="color space border-none bg-blue-700 hover:bg-blue-400  rounded"
  on:click={handleClick}>
  Clicked {clicks} {clicks === 1 ? 'time' : 'times'}
</button>
