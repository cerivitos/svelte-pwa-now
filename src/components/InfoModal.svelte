<script>
  import { toiletPics } from "../data/toilet_pics.js";
  import { onMount } from "svelte";
  import { ratingColors } from "../util.js";
  import { toilets } from "../data/toilets.js";

  export let lat, long;
  let innerWidth;
  let pics = [];
  let placeObj = {};

  onMount(() => {
    console.log(pics);
    pics = toilets.forEach(toilet => {
      if (lat === toilet.lat && long === toilet.long) {
        placeObj = toilet;
        return getPics(placeObj.name);
      }
    });
  });

  $: toilets.forEach(toilet => {
    if (lat === toilet.lat && long === toilet.long) {
      placeObj = toilet;
      pics = getPics(placeObj.name);
    }
  });

  function getPics(name) {
    let requiredPics = [];

    toiletPics.forEach(object => {
      if (object.gallery_link === name) {
        requiredPics.push("https://www.toilet.org.sg/" + object.pics);
      }
    });

    return requiredPics;
  }

  function createRating(rating) {
    let ratingText = "";
    for (let i = 0; i < 6; i++) {
      if (i < rating) {
        ratingText = ratingText + "★";
      } else {
        ratingText = ratingText + "☆";
      }
    }
    return ratingText;
  }

  function createRatingClass(rating) {
    const baseClass = "mb-2 mr-1 font-semibold text-lg";
    return baseClass + " text" + ratingColors[rating - 1];
  }
</script>

<svelte:window bind:innerWidth="{innerWidth}" />

<div class="p-2 w-full absolute bottom-0 " style="z-index:1000">
  <div class="bg-gray-200 overflow-hidden rounded-lg shadow-lg w-full lg:w-1/3">
    {#if innerWidth < 1024 && pics}
    <div class="flex flex-row w-full overflow-auto">
      {#each pics as pic} <img src="{pic}" class="h-24 mr-1" /> {/each}
    </div>
    {:else} {#if pics && pics.length > 0}
    <div class="w-full overflow-hidden relative">
      <img
        src="{pics[0]}"
        class="object-cover h-64"
        style="width: { innerWidth/3 }px"
      />
      <div
        class="absolute rounded-full bg-gray-800 opacity-50 bottom-0 right-0 m-2 px-2 py-1 flex flex-row justify-end items-center"
      >
        <p class="text-white font-bold">
          {pics.length}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-8 w-8 fill-current text-white"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
          ></path>
        </svg>
      </div>
    </div>
    {/if} {/if}
    <div class="px-4 py-2">
      <p class="font-bold text-lg">{placeObj.name}</p>
      <div class="flex flex-row items-baseline mt-2">
        <p class="{createRatingClass(placeObj.rating)}">
          {createRating(placeObj.rating)}
        </p>
        <div class="bg-gray-500 text-white rounded-full px-2 ml-1">
          <p class="text-sm">{placeObj.type}</p>
        </div>
      </div>
      <div class="flex h-full justify-around align-center my-4">
        <button
          class="rounded bg-blue-600 hover:bg-blue-500 hover:shadow text-white font-medium pl-4 pr-5 py-2 inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current w-6 h-6 mr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <span>Directions</span>
        </button>
        <button
          class="rounded border border-blue-600 bg-gray-200 hover:bg-gray-300 hover:shadow text-blue-600 font-medium pl-4 pr-5 py-2 inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current w-6 h6 mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
            />
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  </div>
</div>
