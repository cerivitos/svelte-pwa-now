<script>
  import { searchString } from "../store/store.js";
  import { toilets } from "../data/toilets.js";

  let filtered = [];

  $: if ($searchString.length > 0) {
    filtered = toilets.filter(
      item =>
        item.name.toLowerCase().includes($searchString.toLowerCase()) ||
        item.address.toLowerCase().includes($searchString.toLowerCase())
    );
  } else {
    filtered = [];
  }
</script>

<ul class="h-64 w-full sm:w-1/2 overflow-auto m-1 rounded-lg">
  {#each filtered as place}
  <ul class="py-2 px-4 bg-gray-500">
    <h4>
      {place.name}
    </h4>
    <p>{place.address}</p>
  </ul>
  {/each}
</ul>
