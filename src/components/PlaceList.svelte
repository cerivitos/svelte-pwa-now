<script>
  import {
    currentLat,
    currentLong,
    searchString,
    selectedIndex
  } from "../store/store.js";
  import { toilets } from "../data/toilets.js";
  import PlaceListItem from "./PlaceListItem.svelte";
  import Searchbar from "./Searchbar.svelte";

  let filtered = [];

  function receiveKeyPress(event) {
    const key = event.detail.key;

    if ($selectedIndex < filtered.length - 1 && key === "ArrowDown") {
      selectedIndex.update(selectedIndex => selectedIndex + 1);
    } else if ($selectedIndex > 0 && key === "ArrowUp") {
      selectedIndex.update(selectedIndex => selectedIndex - 1);
    } else if (filtered.length > 0 && key === "Enter") {
      currentLat.set(filtered[$selectedIndex].lat);
      currentLong.set(filtered[$selectedIndex].long);
      searchString.set("");
    }

    console.log($selectedIndex);
  }

  $: if ($searchString.length > 0) {
    selectedIndex.set(0);

    filtered = toilets.filter(
      item =>
        item.name.toLowerCase().includes($searchString.toLowerCase()) ||
        item.address.toLowerCase().includes($searchString.toLowerCase())
    );
  } else {
    selectedIndex.set(0);
    filtered = [];
  }
</script>

<div>
  <Searchbar on:keyboard={e => receiveKeyPress(e)}/>
  <div
    class="w-full sm:w-1/2 overflow-auto mt-1 rounded-lg bg-gray-200 shadow"
    style="max-height:16rem"
  >
    {#each filtered as place, i} <PlaceListItem name={place.name}
    address={place.address} rating={place.rating} lat={place.lat}
    long={place.long} key={i} selected={$selectedIndex === i ? true : false}/>
    {/each}
  </div>
</div>
