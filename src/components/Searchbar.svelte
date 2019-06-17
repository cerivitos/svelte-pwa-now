<script>
  import { currentLat, currentLong, homeLat, homeLong, searchString, geoPermissionGranted, showModal, showMenu } from "../store/store.js";
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
  <button class="my-2 ml-4 flex-grow-0 rounded-full items-center bg-transparent focus: outline-none" on:click="{() => showMenu.set(true)}">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-gray-500 hover:text-gray-600" viewBox="0 0 512 512">
      <path d="M491.318,235.318H20.682C9.26,235.318,0,244.577,0,256s9.26,20.682,20.682,20.682h470.636 c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z"/>
      <path d="M491.318,78.439H20.682C9.26,78.439,0,87.699,0,99.121c0,11.422,9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.26,20.682-20.682C512,87.699,502.741,78.439,491.318,78.439z"/>
      <path d="M491.318,392.197H20.682C9.26,392.197,0,401.456,0,412.879s9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.259,20.682-20.682S502.741,392.197,491.318,392.197z"/>
    </svg>
  </button>
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