<script>
  import { count } from "../store/store.js";

  /**
   * Increases the count variable from the store by 1
   */
  function incrementCount() {
    count.set($count + 1);
  }
</script>

<div class="flex items-center justify-center h-screen">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click="{() => incrementCount()}"
  >
    Count is {$count}
  </button>
</div>
