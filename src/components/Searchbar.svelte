<script>
  import { currentLat, currentLong } from "../store/store.js";
  import { onDestroy } from "svelte";
  import { debounce } from "../util.js";

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handlePosition, handleError);
    } else {
      console.log("geolocation not supported");
    }
  }

  function handlePosition(currentPosition) {
    currentLat.set(currentPosition.coords.latitude);
    currentLong.set(currentPosition.coords.longitude);
    console.log(
      currentPosition.coords.latitude + " " + currentPosition.coords.longitude
    );
  }

  function handleError(error) {
    console.log(`Error: ${error.code}`);
  }

  async function getGeocode(searchLocation) {
    const encodedURI = encodeURI(
      "https://nominatim.openstreetmap.org/search/" +
        searchLocation +
        " singapore?format=json&addressdetails=1&limit=1"
    );

    let response = await fetch(encodedURI);
    let json = await response.json();
    console.log(JSON.stringify(json));

    currentLat.set(json[0].lat);
    currentLong.set(json[0].lon);
  }

  onDestroy(() => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch();
    }
  });
</script>

<div
  class="relative shadow bg-gray-200 appearance-none border h-auto mt-2 pr-12 rounded-full w-full sm:w-1/2"
>
  <input
    on:input="{input => debounce(2000, getGeocode(input.srcElement.value))}"
    placeholder="Where are you?"
    class="inline bg-transparent p-4 w-full outline-none"
    type="text"
  />
  <button
    class="absolute right-0 top-0 p-1 m-1 rounded-full items-center bg-transparent focus: outline-none hover:bg-gray-300"
    on:click="{getLocation}"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="stroke-current text-gray-500 inline-block w-10 h-10"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  </button>
</div>
