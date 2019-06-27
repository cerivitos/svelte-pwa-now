<script>
  import { showMenu } from "../store/store.js";

  function moreInfo() {
    window.open("https://www.toilet.org.sg", "_blank");
    showMenu.set(false);
  }
</script>

<div class="flex flex-col text-gray-800">
  <div class="w-full h-1 bg-primaryColor"></div>
  <div class="flex flex-row items-center px-4 pt-8 pb-2">
    <img src="assets/android-chrome-512x512.png" class="w-12 h-12" />
    <span
      class="flex text-3xl text-white bg-red-700 w-12 h-12 rounded-full items-center ml-4 p-1"
      >SG</span
    >
    <p class="text-4xl pl-1 text-red-700 font-medium">
      toilet
    </p>
  </div>
  <p class="mb-6 px-4 text-gray-600">
    An unofficial listing of toilets rated by the Restroom Association
    (Singapore)
  </p>
  <button
    class="p-4 inline-flex text-lg hover:bg-gray-400"
    on:click="{moreInfo}"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 mr-2 fill-current"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
      />
    </svg>
    <span>Find out more</span>
  </button>
  <div class="absolute bottom-0 p-4 bg-gray-300 w-full text-center">
    <p>
      Built with
      <a href="https://svelte.dev" rel="noreferrer" target="_blank">Svelte</a> ·
      <a href="https://mapbox.com" rel="noreferrer" target="_blank">Mapbox</a> ·
      <a href="https://tailwindcss.com" rel="noreferrer" target="_blank"
        >Tailwind</a
      ><br />Source on
      <a
        href="https://github.com/cerivitos/INeedToilet"
        rel="noreferrer"
        target="_blank"
        >Github</a
      >
    </p>
  </div>
</div>
