<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Map from './components/Map.svelte';
</script>

<style lang="postcss">

</style>

<main>
  <!--For global margin-->
  <div class="absolute p-4 w-full z-10">
    <Searchbar/>  
  </div>
  <Map/>
</main>