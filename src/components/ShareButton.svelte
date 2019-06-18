<script>
  import { fade, draw } from "svelte/transition";

  export let name;
  export let rating;

  let copySuccessful = false;
  let showWebShare = false;

  function handleShare(name, rating) {
    if (navigator.share) {
      navigator
        .share({
          url: shareUrl,
          title: name,
          text: rating
        })
        .catch(error => {
          showWebShare = true;
        });
    } else {
      showWebShare = true;
    }
  }

  function getUrl() {
    let url = document.location.href;
    const canonicalElement = document.querySelector("link[rel=canonical]");
    if (canonicalElement !== null) {
      url = canonicalElement.href;
    }

    return url;
  }

  function createShareText(name, rating, type) {
    const url = getUrl();
    let shareText;

    if (type === 0 || type === 2) {
      shareText =
        "Check out this " + rating + " star toilet at " + name + "\n" + url;
    } else {
      shareText = url;
    }

    const variables = [
      "https://api.whatsapp.com/send?text=",
      "https://www.facebook.com/sharer/sharer.php?u=",
      "https://twitter.com/intent/tweet?text="
    ];

    return encodeURI(variables[type] + shareText);
  }

  function copyUrl() {
    const url = getUrl();

    const el = document.createElement("textarea");
    el.value = url;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    copySuccessful = true;
  }
</script>

{#if !showWebShare}
<button
  class="w-32 rounded bg-backgroundColor hover:bg-gray-300 text-accentColor font-medium px-5 py-2 mr-2 inline-flex items-center"
  on:click="{handleShare}"
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
{:else}
<div class="flex justify-around align-middle mr-2">
  <a
    transition:fade="{{delay: 50 * 3}}"
    class="flex bg-backgroundColor hover:bg-gray-300 px-2 rounded-full items-center"
    href="{createShareText(name, rating, 0)}"
    target="_blank"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 58 58"
      class="w-6 h-6"
    >
      <path
        style="fill:#2CB742;"
        d="M0,58l4.988-14.963C2.457,38.78,1,33.812,1,28.5C1,12.76,13.76,0,29.5,0S58,12.76,58,28.5   S45.24,57,29.5,57c-4.789,0-9.299-1.187-13.26-3.273L0,58z"
      />
      <path
        style="fill:#FFFFFF;"
        d="M47.683,37.985c-1.316-2.487-6.169-5.331-6.169-5.331c-1.098-0.626-2.423-0.696-3.049,0.42   c0,0-1.577,1.891-1.978,2.163c-1.832,1.241-3.529,1.193-5.242-0.52l-3.981-3.981l-3.981-3.981c-1.713-1.713-1.761-3.41-0.52-5.242   c0.272-0.401,2.163-1.978,2.163-1.978c1.116-0.627,1.046-1.951,0.42-3.049c0,0-2.844-4.853-5.331-6.169   c-1.058-0.56-2.357-0.364-3.203,0.482l-1.758,1.758c-5.577,5.577-2.831,11.873,2.746,17.45l5.097,5.097l5.097,5.097   c5.577,5.577,11.873,8.323,17.45,2.746l1.758-1.758C48.048,40.341,48.243,39.042,47.683,37.985z"
      />
    </svg>
  </a>
  <a
    transition:fade="{{delay: 50 * 2}}"
    class="flex bg-backgroundColor hover:bg-gray-300 px-2 rounded-full items-center"
    href="{createShareText(name, rating, 1)}"
    target="_blank"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      viewBox="0 0 408.788 408.788"
    >
      <path
        style="fill:#475993;"
        d="M353.701,0H55.087C24.665,0,0.002,24.662,0.002,55.085v298.616c0,30.423,24.662,55.085,55.085,55.085  h147.275l0.251-146.078h-37.951c-4.932,0-8.935-3.988-8.954-8.92l-0.182-47.087c-0.019-4.959,3.996-8.989,8.955-8.989h37.882  v-45.498c0-52.8,32.247-81.55,79.348-81.55h38.65c4.945,0,8.955,4.009,8.955,8.955v39.704c0,4.944-4.007,8.952-8.95,8.955  l-23.719,0.011c-25.615,0-30.575,12.172-30.575,30.035v39.389h56.285c5.363,0,9.524,4.683,8.892,10.009l-5.581,47.087  c-0.534,4.506-4.355,7.901-8.892,7.901h-50.453l-0.251,146.078h87.631c30.422,0,55.084-24.662,55.084-55.084V55.085  C408.786,24.662,384.124,0,353.701,0z"
      />
    </svg>
  </a>
  <a
    transition:fade="{{delay: 50}}"
    href="{createShareText(name, rating, 2)}"
    target="_blank"
    class="flex bg-backgroundColor hover:bg-gray-300 px-2 rounded-full items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      viewBox="0 0 612 612"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        style="fill:#55ACEE;"
        d="M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411    c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513    c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101    c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104    c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194    c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485    c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z"
      />
    </svg>
  </a>
  <button
    transition:fade
    class="relative bg-backgroundColor hover:bg-gray-300 px-2 rounded-full"
    on:click="{copyUrl}"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      style="fill:darkslategrey;"
      viewBox="0 0 561 561"
    >
      <path
        d="M459,51H351.9c-10.2-30.6-38.25-51-71.4-51c-33.15,0-61.2,20.4-71.4,51H102c-28.05,0-51,22.95-51,51v408    c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V102C510,73.95,487.05,51,459,51z M280.5,51c15.3,0,25.5,10.2,25.5,25.5    S295.8,102,280.5,102S255,91.8,255,76.5S265.2,51,280.5,51z M459,510H102V102h51v76.5h255V102h51V510z"
      />
    </svg>
    {#if copySuccessful}
    <svg
      transition:fade="{{duration:150}}"
      on:introend="{() => copySuccessful = false}"
      class="absolute w-6 h-6 fill-current text-secondaryColor"
      style="transform: translate(0%, -100%);"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 426.667 426.667"
    >
      <path
        d="M213.333,0C95.518,0,0,95.514,0,213.333s95.518,213.333,213.333,213.333  c117.828,0,213.333-95.514,213.333-213.333S331.157,0,213.333,0z M174.199,322.918l-93.935-93.931l31.309-31.309l62.626,62.622  l140.894-140.898l31.309,31.309L174.199,322.918z"
      />
    </svg>
    {/if}
  </button>
</div>
{/if}
