<script>
  import { currentLat, currentLong } from "../store/store.js";
  import { onMount } from "svelte";
  import L from "leaflet";

  let map;

  onMount(async () => {
    map = L.map("map").setView([1.29027, 103.851959], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  });

  $: if (map !== undefined) {
    map.flyTo(new L.LatLng($currentLat, $currentLong), 14);
  }
</script>

<div id="map" class="w-screen h-screen" style="z-index: -1;"></div>
