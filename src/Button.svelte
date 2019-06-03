<script>
  let clicks = 0;

  const handleClick = () => (clicks += 1);
</script>

<button
  class="color space border-none bg-purple-700 hover:bg-blue-400  rounded"
  on:click="{handleClick}"
>
  Clicked {clicks} {clicks === 1 ? 'time' : 'times'}
</button>
