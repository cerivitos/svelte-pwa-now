<script>
  import { toiletPics } from "../data/toilet_pics.js";
  import { ratingColors, ratingBackgroundRgba } from "../util.js";
  import {onMount} from "svelte";
  import ShareButton from "./ShareButton.svelte";
  import FadeInImage from "./FadeInImage.svelte";
  import Carousel from "./Carousel.svelte";
  import {
    currentLat,
    currentLong,
    homeLat,
    homeLong,
    geoPermissionGranted, showModal, showCarousel, carouselName, carouselPics
  } from "../store/store.js";

  let innerWidth, innerHeight, topDisplacement, modalHeight;
  let pics = [];
  let placeObj = {};
  let showWebShare = false;
  let toilets;

  onMount(() => {
    fetch("data/toilets.geojson")
      .then(response => response.json())
      .then(json => {
        toilets = json.features;
      });
  })
  
  $: if (toilets !== undefined) {
    toilets.forEach(toilet => {
    if ($currentLat === toilet.geometry.coordinates[1] && $currentLong === toilet.geometry.coordinates[0]) {
      placeObj = toilet;
      document.title = placeObj.properties.name + " | SGtoilet";
      pics = getPics(placeObj.properties.gallery_link);
    }
  });
  }

  //In mobile, scrolling up hides the address bar causing viewport height to change. Dynamically calculate the bottom offset including margin to ensure modal is always at the bottom without overflow
  $: topDisplacement = (innerHeight - modalHeight) * 0.0625 - 0.5;

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

  function getDirections(lat, long) {
    let link = "http://maps.google.com/maps?f=d&";
    if ($geoPermissionGranted) {
      return (
        link +
        "saddr=" +
        $homeLat +
        "," +
        $homeLong +
        "&daddr=" +
        lat +
        "," +
        long
      );
    } else {
      return link + "daddr=" + lat + "," + long;
    }
  }

  function triggerCarousel(visible, name, pics) {
    if (visible) {
      showCarousel.set(true);
      carouselName.set(name);
      carouselPics.set(pics);

      window.history.pushState(
        {
          lat: $currentLat,
          long: $currentLong,
          modal: $showModal,
          carousel: $showCarousel
        },
        null,
        "?lat=" + $currentLat + "&long=" + $currentLong
      );
    } else {
      showCarousel.set(false);
      carouselName.set('');
      carouselPics.set([]);
    }
  }
</script>

<svelte:window
  bind:innerWidth="{innerWidth}"
  bind:innerHeight="{innerHeight}"
/>

{#if Object.keys(placeObj).length > 0}
<div
  class="mx-2 fixed lg:w-1/3 left-0 right-0"
  style="top: {topDisplacement}rem"
>
  <div
    class="bg-backgroundColor overflow-hidden rounded-lg shadow-lg"
    bind:clientHeight="{modalHeight}"
  >
    {#if innerWidth < 1024 && pics}
    <div class="flex flex-row w-full overflow-auto">
      {#each pics as pic, i}
      <FadeInImage src="{pic}" alt="{placeObj.name + ' ' + (i + 1)}" index="i" tailwindClass="h-24 w-24 mr-1 object-cover" on:clicked="{(e) => triggerCarousel(true, placeObj.name, pics)}"/>
      {/each}
    </div>
    {:else} {#if pics && pics.length > 0}
    <div class="w-full overflow-hidden relative">
      <FadeInImage src="{pics[0]}" alt="{placeObj.name}" style="width: { innerWidth/3 }px" tailwindClass="object-cover h-64 w-full" on:clicked="{(e) => triggerCarousel(true, placeObj.name, pics)}"/>
      <div
        class="absolute rounded-full bg-gray-800 opacity-50 bottom-0 right-0 m-2 px-2 py-1 flex flex-row justify-end items-center"
      >
        <p class="text-white text-xs mr-1">
          {pics.length}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4 fill-current text-white"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
          ></path>
        </svg>
      </div>
    </div>
    {/if} {/if}
    <div class="px-4 pb-2">
      <h1 class="font-medium text-xl py-2">{placeObj.properties.name}</h1>
      <div class="flex flex-row items-baseline mt-2">
        <div class="mb-2 -ml-4 mr-2 pl-4 pr-2 rounded-r-full font-semibold text-lg" style="background: {ratingBackgroundRgba[placeObj.properties.rating - 1]}; color: {ratingColors[placeObj.properties.rating - 1]}">
          {createRating(placeObj.properties.rating)}
        </div>
        <div class="flex-grow-0 text-sm font-light text-gray-700 truncate">{placeObj.properties.address}</div>
      </div>
      <div class="flex h-full justify-end my-4">
        <ShareButton
          name="{placeObj.properties.name}"
          rating="{placeObj.properties.rating}"
        ></ShareButton>
        <button
          on:click="{() => window.open(getDirections(placeObj.geometry.coordinates[1], placeObj.geometry.coordinates[0]), '_blank')}"
          class="w-32 rounded bg-accentColor hover:bg-blue-500 hover:shadow no-underline text-white font-medium px-3 py-2 inline-flex items-center"
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
      </div>
    </div>
  </div>
</div>
{/if}