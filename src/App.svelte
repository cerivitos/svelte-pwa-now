<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Map from './components/Map.svelte';
  import PlaceList from './components/PlaceList.svelte';
  import InfoModal from './components/InfoModal.svelte';
</script>

<style lang="postcss">

</style>

<main class="overflow-hidden">
  <!--For global margin-->
  <div class="absolute p-4 w-full" style="z-index:1000" >
    <PlaceList/>
  </div>
  <Map/>
  <InfoModal/>
</main>