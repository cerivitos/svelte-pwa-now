<script>
  import {
    currentLat,
    currentLong,
    searchString,
    showModal
  } from "../store/store.js";
  import { onMount, setContext } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { toilets } from "../data/toilets.js";

  let map;
  let toiletMarker;
  let markers = [];

  onMount(async () => {
    map = L.map("map", {
      maxBounds: L.latLngBounds([1.441954, 103.557297], [1.23743, 104.062741]),
      zoomControl: false,
      center: L.latLng(1.2834, 103.8607),
      zoom: 12
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    toilets.forEach(toilet => {
      const lat = toilet.lat;
      const long = toilet.long;
      toiletMarker = L.icon({
        iconUrl: "../assets/toilet_marker.png",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -12]
      });
      let marker = L.marker([lat, long], { icon: toiletMarker }).on(
        "click",
        e => {
          currentLat.set(e.latlng.lat);
          currentLong.set(e.latlng.lng);
          searchString.set("");
          showModal.set(true);
        }
      );

      marker.addTo(map);
      markers.push(marker);
    });

    setContext("mapContextKey", {
      getMap: () => map
    });
  });

  $: if (map !== undefined) {
    map.setView(L.latLng($currentLat, $currentLong), 15);

    const newMarker = L.icon({
      iconUrl: "../assets/toilet_marker.png",
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -12]
    });

    markers.forEach(marker => {
      if (
        marker.getLatLng().lat === $currentLat &&
        marker.getLatLng().lng === $currentLong
      ) {
        marker.setIcon(newMarker);
      } else {
        marker.setIcon(toiletMarker);
      }
    });
  }
</script>

<div id="map" class="w-screen h-screen"></div>
