<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Map from './components/Map.svelte';
  import PlaceList from './components/PlaceList.svelte';
</script>

<style lang="postcss">

</style>

<main >
  <!--For global margin-->
  <div class="absolute p-4 w-full" style="z-index:1000" >
    <Searchbar/>  
    <PlaceList/>
  </div>
  <Map/>
</main>