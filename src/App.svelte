<script lang="ts">
  import HelloWorld from "./components/HelloWorld.svelte";
  import Router from "./components/Router.svelte";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
</script>

<main class="overflow-hidden">
  <HelloWorld />
</main>
