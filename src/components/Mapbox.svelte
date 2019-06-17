<script>
  import mapboxgl from "mapbox-gl";
  import {
    currentLat,
    currentLong,
    searchString,
    showModal
  } from "../store/store.js";
  import { onMount, setContext } from "svelte";
  import { toilets } from "../data/toilets.js";

  let map;
  let toiletMarker;
  let markers = [];

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2VyaXZpdG9zIiwiYSI6ImNqeDBpZG9iajAwNmU0NXJ0eTN2dTQwdzkifQ.8jRT1m32i4Du88MTmgBWAQ";
    map = new mapboxgl.Map({
      container: "map",
      style:
        "https://api.maptiler.com/maps/59b64a7f-b9dc-45e1-b342-ac323f3c54eb/style.json?key=A7rAp9M6drW14qgIcf7Y",
      zoom: 12,
      center: [103.817467, 1.354498],
      maxBounds: new mapboxgl.LngLatBounds(
        [103.552401, 1.166388],
        [104.031162, 1.50694]
      )
    });

    toilets.forEach(toilet => {
      const lat = toilet.lat;
      const long = toilet.long;

      let marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
      marker.getElement().addEventListener("click", () => {
        currentLat.set(marker.getLngLat().lat);
        currentLong.set(marker.getLngLat().lng);
        searchString.set("");
        showModal.set(true);
      });

      markers.push(marker);
    });

    setContext("mapContextKey", {
      getMap: () => map
    });
  });

  $: if (map !== undefined) {
    map.easeTo({
      center: [$currentLong, $currentLat],
      zoom: 15
    });

    // const newMarker = L.icon({
    //   iconUrl: "../assets/toilet_marker.png",
    //   iconSize: [48, 48],
    //   iconAnchor: [24, 48],
    //   popupAnchor: [0, -12]
    // });

    markers.forEach(marker => {
      if (
        marker.getLngLat().lat === $currentLat &&
        marker.getLngLat().lng === $currentLong
      ) {
        //Disgusting hack because Mapbox doesn't expose function to set color of marker
        marker
          .getElement()
          .firstChild.firstChild.children[1].setAttribute("fill", "#ff4d4d");
      } else {
        marker
          .getElement()
          .firstChild.firstChild.children[1].setAttribute("fill", "#3FB1CE");
      }
    });
  }
</script>

<svelte:head>
  <link
    href="https://api.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css"
    rel="stylesheet"
  />
</svelte:head>

<div id="map" class="w-screen h-screen"></div>
