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
  import { inBounds } from "../util.js";

  const darkStyle = "mapbox://styles/mapbox/dark-v10?optimize=true";
  const lightStyle = "mapbox://styles/mapbox/streets-v9?optimize=true";

  let map;
  let toiletMarker;
  let markers = [];
  let markerClicked = false;
  const detailZoomLevel = 14;

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

    map.on("load", () => {
      map.addSource("toilets", {
        type: "geojson",
        data: "/data/toilets.geojson",
        cluster: true,
        clusterMaxZoom: detailZoomLevel,
        clusterRadius: 60
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "toilets",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#5bd1d7",
            20,
            "#248ea9",
            50,
            "#556fb5"
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 20, 40, 50, 60]
        }
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "toilets",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Roboto Medium", "Arial Unicode MS Bold"],
          "text-size": ["step", ["get", "point_count"], 14, 20, 18, 30, 24]
        },
        paint: {
          "text-color": "#ffffff"
        }
      });

      map.on("click", "clusters", e => {
        let features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"]
        });
        let clusterId = features[0].properties.cluster_id;
        map
          .getSource("toilets")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          });
      });

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });

      //Hide modal if clicking anywhere on map without a marker to help navigation on small screens
      map.on("click", () => {
        if ($showModal && !markerClicked) {
          showModal.set(false);
          document.title = "sgtoilet | Toilets in Singapore";
        } else {
          markerClicked = false;
        }
      });

      //Add marker for each toilet in data
      function updateMarkers() {
        markers.forEach(marker => marker.remove());
        markers = [];

        if (Math.floor(map.getZoom()) > detailZoomLevel) {
          toilets.forEach(toilet => {
            const mapBounds = map.getBounds();
            const markerPoint = {
              lng: toilet.long,
              lat: toilet.lat
            };

            if (inBounds(markerPoint, mapBounds)) {
              let marker = new mapboxgl.Marker()
                .setLngLat([toilet.long, toilet.lat])
                .addTo(map);
              marker.getElement().addEventListener("click", () => {
                markerClicked = true;

                currentLat.set(marker.getLngLat().lat);
                currentLong.set(marker.getLngLat().lng);
                searchString.set("");
                showModal.set(true);

                map.easeTo({
                  center: [$currentLong, $currentLat],
                  zoom: detailZoomLevel + 1
                });

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
            }
          });
        }
      }

      map.on("data", e => {
        if (e.sourceId !== "toilets" || !e.isSourceLoaded) return;
        map.on("move", updateMarkers);
        map.on("moveend", updateMarkers);
        updateMarkers();
      });
    });

    setContext("mapContextKey", {
      getMap: () => map
    });
  });

  $: if (map !== undefined) {
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
