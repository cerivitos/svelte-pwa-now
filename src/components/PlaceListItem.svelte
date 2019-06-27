<script>
  import {
    currentLat,
    currentLong,
    searchString,
    selectedIndex,
    showModal
  } from "../store/store.js";
  import { ratingColors } from "../util.js";

  export let placeObj;
  export let key = "";
  export let selected = false;

  let listItem;
  let ratingClass;

  $: if (listItem !== undefined && selected) {
    listItem.scrollIntoView({ block: "nearest" });
  }

  function selectToilet() {
    currentLat.set(placeObj.lat);
    currentLong.set(placeObj.long);
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
  }

  function hovering() {
    selectedIndex.set(key);
  }

  function highlightSearchString(searchString, textToHighlight) {
    const startIndex = textToHighlight
      .toLowerCase()
      .indexOf(searchString.toLowerCase());

    if (startIndex > -1) {
      const preString = textToHighlight.substring(0, startIndex);
      const highlightedString = textToHighlight.substring(
        startIndex,
        startIndex + searchString.length
      );
      const postString = textToHighlight.substring(
        startIndex + searchString.length
      );

      return (
        preString +
        "<span class='text-secondaryColor font-bold'>" +
        highlightedString +
        "</span>" +
        postString
      );
    } else {
      return textToHighlight;
    }
  }
</script>

<button
  class="{selected ? 'flex p-4 text-left start w-full bg-gray-400 text-gray-800' : 'flex p-4 text-left start w-full bg-transparent text-gray-800'}"
  on:click="{selectToilet}"
  on:mouseenter="{hovering}"
  bind:this="{listItem}"
>
  <div class="w-11/12 text-gray-800 pr-1">
    <h1 class="font-medium text-lg truncate">
      {@html highlightSearchString($searchString, placeObj.name)}
    </h1>
    <p class="font-light text-sm text-gray-600 leading-tight truncate">
      {@html highlightSearchString($searchString, placeObj.address)}
    </p>
  </div>
  <div class="w-1/12 text-center">
    <span
      class="rounded-full px-1 text-white text-xs"
      style="background:{ratingColors[placeObj.rating - 1]}"
      >{placeObj.rating}★</span
    >
    <span class="text-xs"
      >{placeObj.distance > 1000 ? Math.round(placeObj.distance/1000) :
      (placeObj.distance).toFixed(1)}km</span
    >
  </div>
</button>
