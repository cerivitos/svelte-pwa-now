<script>
  import { currentLat, currentLong, searchString, geoPermissionGranted } from "../store/store.js";
  import { onDestroy } from "svelte";
  import { debounce } from "../util.js";
  import {createEventDispatcher, onMount} from 'svelte';

  const dispatch = createEventDispatcher();
  let style = "color: #cbd5e0";

  onMount(() => {
    navigator.permissions && navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
    if (PermissionStatus.state == 'granted'){
      geoPermissionGranted.set(true);
      getLocation();
      style = "color: #319795";
    }
})
  })

  function getLocation() {
    if (navigator.geolocation) {
      geoPermissionGranted.set(true);
      style = "color: #319795";
      searchString.set("");
      navigator.geolocation.watchPosition(handlePosition, handleError);
    } else {
      console.log("geolocation not supported");
    }
  }

  function handlePosition(currentPosition) {
    currentLat.set(currentPosition.coords.latitude);
    currentLong.set(currentPosition.coords.longitude);
  }

  function handleError(error) {
    console.log(`Error: ${error.code}`);
  }

  function dispatchKey(key) {
    dispatch('keyboard', {
      key: key
    });
  }

  $: if ($currentLat !== 1.29027 && $currentLong !== 103.851959) {
    //check that it is not the default lat long
    document.getElementById("input").value = "";
  }

  onDestroy(() => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch();
    }
  });
</script>

<div
  class="relative shadow bg-gray-200 appearance-none border h-auto mt-2 pr-12 rounded-full w-full sm:w-1/3"
  on:keydown={e => dispatchKey(e.key)}
>
  <input
    on:input="{input => searchString.set(input.srcElement.value)}"
    placeholder="Where are you?"
    class="inline bg-transparent p-4 w-full outline-none"
    type="search"
    id="input"
  />
  <button
    class="absolute right-0 top-0 p-1 m-1 rounded-full items-center bg-transparent focus: outline-none hover:text-teal-600"
    {style}
    on:click="{getLocation}"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="stroke-current inline-block w-10 h-10"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  </button>
</div>