<script>
  import {
    currentLat,
    currentLong,
    searchString,
    selectedIndex
  } from "../store/store.js";

  export let name = "";
  export let address = "";
  export let rating = "";
  export let lat = "";
  export let long = "";
  export let key = "";
  export let distance = 0;
  export let selected = false;

  let listItem;

  $: if (listItem !== undefined && selected) {
    listItem.scrollIntoView({ block: "nearest" });
  }

  function selectToilet() {
    currentLat.set(lat);
    currentLong.set(long);
    searchString.set("");
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
        "<span class='text-teal-600 font-bold'>" +
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
  <div class="w-11/12">
    <p class="font-medium text-lg truncate">
      {@html highlightSearchString($searchString, name)}
    </p>
    <p class="font-light leading-tight truncate">
      {@html highlightSearchString($searchString, address)}
    </p>
  </div>
  <div class="w-1/12 text-center content-center">
    <p>{rating}⭐</p>
    <p>{(distance/1000).toFixed(1)}km</p>
  </div>
</button>
