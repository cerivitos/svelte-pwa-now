<script>
  import mapboxgl from "mapbox-gl";
  import {
    currentLat,
    currentLong,
    searchString,
    showModal,
    darkMode
  } from "../store/store.js";
  import { onMount, setContext } from "svelte";
  import { toilets } from "../data/toilets.js";
  import { mapBoxKey } from "../keys.js";

  const darkStyle = "mapbox://styles/mapbox/dark-v10?optimize=true";
  const lightStyle = "mapbox://styles/mapbox/streets-v9?optimize=true";

  let map;
  let toiletMarker;
  let markers = [];

  onMount(() => {
    mapboxgl.accessToken = mapBoxKey;
    map = new mapboxgl.Map({
      container: "map",
      style: $darkMode ? darkStyle : lightStyle,
      zoom: 12,
      center: [$currentLong, $currentLat],
      maxBounds: new mapboxgl.LngLatBounds(
        [103.552401, 1.166388],
        [104.031162, 1.50694]
      )
    });

    map.on("click", () => {
      if ($showModal) showModal.set(false);
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

        window.history.pushState(
          {
            lat: $currentLat,
            long: $currentLong,
            modal: $showModal
          },
          null,
          "?lat=" + $currentLat + "&long=" + $currentLong
        );
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
      zoom: 12
    });

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

  $: if (map !== undefined) {
    $darkMode ? map.setStyle(darkStyle) : map.setStyle(lightStyle);
  }
</script>

<svelte:head>
  <link
    href="https://api.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css"
    rel="stylesheet"
  />
</svelte:head>

<div id="map" class="w-screen h-screen"></div>
