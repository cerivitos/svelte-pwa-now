<script>
  import { currentLat, currentLong, searchString } from "../store/store.js";
  export let name = "";
  export let address = "";
  export let rating = "";
  export let lat = "";
  export let long = "";

  function selectToilet() {
    currentLat.set(lat);
    currentLong.set(long);
    searchString.set("");
  }
</script>

<button
  class="flex p-4 text-left start w-full bg-transparent text-gray-800 hover:bg-teal-600 hover:text-white"
  on:click="{selectToilet}"
>
  <div class="w-11/12">
    <p class="font-medium text-lg truncate">{name}</p>
    <p class="font-light leading-tight truncate">{address}</p>
  </div>
  <div class="w-1/12 text-center content-center">
    <p>{rating}⭐</p>
  </div>
</button>
