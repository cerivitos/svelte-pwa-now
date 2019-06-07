<script>
  import { searchString } from "../store/store.js";
  import { toilets } from "../data/toilets.js";
  import PlaceListItem from './PlaceListItem.svelte';

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

<div class="w-full sm:w-1/2 overflow-auto mt-1 rounded-lg bg-gray-200 shadow"style="max-height:16rem">
  {#each filtered as place}
  <PlaceListItem name={place.name} address={place.address} rating={place.rating} lat={place.lat} long={place.long}/>
  {/each}
</div>
  

