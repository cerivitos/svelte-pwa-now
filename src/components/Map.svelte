<script>
  import { currentLat, currentLong } from "../store/store.js";
  import { onMount } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { toilets } from "../data/toilets.js";

  let map;

  onMount(async () => {
    map = L.map("map", {
      zoomControl: false,
      center: L.latLng(1.29027, 103.851959),
      zoom: 12
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    toilets.forEach(toilet => {
      const lat = toilet.lat;
      const long = toilet.long;
      let toiletMarker = L.icon({
        iconUrl: "../assets/toilet_marker.png",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });
      let marker = L.marker([lat, long], { icon: toiletMarker });
      marker
        .bindPopup("<b>" + toilet.name + "</b><br>" + toilet.address)
        .openPopup();
      marker.addTo(map);
    });
  });

  $: if (map !== undefined) {
    map.flyTo(L.latLng($currentLat, $currentLong), 14);
  }
</script>

<div id="map" class="w-screen h-screen"></div>
