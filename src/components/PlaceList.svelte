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
  }

  $: if ($searchString.length > 0) {
    selectedIndex.set(0);

    filtered = toilets.filter(
      item =>
        item.name.toLowerCase().includes($searchString.toLowerCase()) ||
        item.address.toLowerCase().includes($searchString.toLowerCase())
    );

    filtered.sort((first, second) => second.rating - first.rating);
  } else {
    selectedIndex.set(0);
    filtered = [];
  }
</script>

<style>
  .searchList {
    max-height: 16rem;
  }

  @media screen and (min-width: 768px) {
    .searchList {
      max-height: 32rem;
    }
  }
</style>

<div>
  <Searchbar on:keyboard={e => receiveKeyPress(e)}/>
  <div
    class="searchList w-full sm:w-1/2 overflow-auto mt-1 rounded-lg bg-gray-200 shadow"
  >
    {#each filtered as place, i} <PlaceListItem name={place.name}
    address={place.address} rating={place.rating} lat={place.lat}
    long={place.long} key={i} selected={$selectedIndex === i ? true : false}/>
    {/each}
  </div>
</div>
