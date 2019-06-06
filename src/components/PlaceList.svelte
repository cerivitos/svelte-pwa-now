<script>
  import { placeJson } from "../store/store.js";
</script>

<ul>
  {#each $placeJson as place}
  <ul class="py-2 px-4 bg-gray-500">
    <h4>
      {place.address[Object.keys(place.address)[0]]}
    </h4>
    {#if place.address.road !== undefined}
    <p>{place.address.road}</p>
    {/if}
  </ul>
  {/each}
</ul>
