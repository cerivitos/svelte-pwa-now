<script>
  import { currentLat, currentLong, homeLat, homeLong, searchString, geoPermissionGranted, showModal } from "../store/store.js";
  import {createEventDispatcher, onMount} from 'svelte';

  const dispatch = createEventDispatcher();
  let style = "color: #cbd5e0";

  onMount(() => {
    navigator.permissions && navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
      if (PermissionStatus.state == 'granted'){
        geoPermissionGranted.set(true);
        getLocation(true);
        style = "color: #319795";
      }
    })
  })

  function getLocation() {
    if (navigator.geolocation && $geoPermissionGranted) {
      geoPermissionGranted.set(true);
      style = "color: #319795";
      searchString.set("");
      showModal.set(false);
      navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    } else {
      geoPermissionGranted.set(false);
      style = "color: #cbd5e0";
      console.log("geolocation not supported");
    }
  }

  function handlePosition(currentPosition) {
    currentLat.set(currentPosition.coords.latitude);
    currentLong.set(currentPosition.coords.longitude);
    homeLat.set(currentPosition.coords.latitude);
    homeLong.set(currentPosition.coords.longitude);
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
</script>

<div
  class="flex justify-end shadow bg-gray-200 appearance-none border mt-2 rounded-lg"
  on:keydown={e => dispatchKey(e.key)}
>
  <input
    on:input="{(input) => {
      searchString.set(input.srcElement.value); 
      showModal.set(false);
    }}"
    on:focus="{(focus) => {
      showModal.set(false);
    }}"
    placeholder="Where are you?"
    class="flex-grow bg-transparent p-4 outline-none"
    type="search"
    id="input"
  />
  <button
    class="my-2 mr-4 flex-grow-0 rounded-full items-center bg-transparent focus: outline-none hover:text-teal-600"
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
      class="stroke-current inline-block w-8 h-8"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  </button>
</div>