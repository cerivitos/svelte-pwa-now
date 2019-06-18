<script>
  function moreInfo() {
    window.open("https://www.toilet.org.sg", "_blank");
  }
</script>

<div class="flex flex-col p-4 text-gray-800">
  <h1 class="text-6xl mb-2">sgtoilet</h1>
  <p class="mb-6">
    A collection of toilets in Singapore rated by the Restroom Association
    (Singapore).
  </p>
  <button class="py-4 inline-flex" on:click="{moreInfo}">
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
  <button class="py-4 inline-flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 fill-current mr-2"
      viewBox="0 0 523.854 523.854"
    >
      <path
        d="M506.51,347.083c-7.057-7.037-15.245-8.531-24.571-4.424c-25.031,11.597-50.968,17.398-77.81,17.398    c-33.673,0-64.726-8.292-93.165-24.914c-28.439-16.598-50.961-39.125-67.571-67.559c-16.609-28.434-24.915-59.493-24.915-93.166    c0-26.169,5.171-51.016,15.527-74.572c10.349-23.543,25.306-44.192,44.878-61.935c7.509-7.05,9.217-15.238,5.116-24.565    c-3.874-9.333-10.808-13.758-20.82-13.317c-34.811,1.371-67.797,9.156-98.966,23.379c-31.175,14.223-57.963,32.925-80.368,56.132    c-22.411,23.207-40.159,50.68-53.238,82.412c-13.072,31.732-19.608,65.006-19.608,99.811c0,35.502,6.94,69.401,20.82,101.697    c13.874,32.313,32.534,60.189,55.967,83.611c23.434,23.445,51.304,42.087,83.611,55.974    c32.301,13.861,66.206,20.808,101.696,20.808c50.962,0,98-13.825,141.115-41.457c43.109-27.65,75.361-64.56,96.751-110.735    c1.817-4.106,2.326-8.427,1.536-12.968C511.682,354.146,509.692,350.278,506.51,347.083z"
      />
    </svg>
    <span>Night mode</span>
  </button>
  <p class="fixed bottom-0 pb-4">
    Built with <a href="https://svelte.dev" target="_blank">Svelte</a> ·
    <a href="https://mapbox.com" target="_blank">Mapbox</a> ·
    <a href="https://tailwindcss.com" target="_blank">Tailwind</a> · Source code
    on <a href="https://github.com/INeedToilet" target="_blank">Github</a>
  </p>
</div>
