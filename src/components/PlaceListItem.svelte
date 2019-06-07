<script>
  import {
    currentLat,
    currentLong,
    searchString,
    selectedIndex
  } from "../store/store.js";
  export let name = "";
  export let address = "";
  export let rating = "";
  export let lat = "";
  export let long = "";
  export let key = "";
  export let selected = false;

  function selectToilet() {
    currentLat.set(lat);
    currentLong.set(long);
    searchString.set("");
  }

  function hovering() {
    selectedIndex.set(key);
  }
</script>

<button
  class="{selected ? 'flex p-4 text-left start w-full bg-teal-600 text-white' : 'flex p-4 text-left start w-full bg-transparent text-gray-800'}"
  on:click="{selectToilet}"
  on:mouseenter="{hovering}"
>
  <div class="w-11/12">
    <p class="font-medium text-lg truncate">{name}</p>
    <p class="font-light leading-tight truncate">{address}</p>
  </div>
  <div class="w-1/12 text-center content-center">
    <p>{rating}⭐</p>
  </div>
</button>
