<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Map from './components/Map.svelte';
  import PlaceList from './components/PlaceList.svelte';
  import InfoModal from './components/InfoModal.svelte';
  import Carousel from './components/Carousel.svelte';
  import ModalWrapper from './components/ModalWrapper.svelte';
  import {currentLat, currentLong, showModal} from './store/store.js';
</script>

<style lang="postcss">

</style>

<main class="overflow-hidden">
  <!--For global margin-->
  <div class="absolute px-2 py-4 w-full lg:w-1/3" style="z-index:1000" >
    <PlaceList/>
  </div>
  <ModalWrapper transitionTrigger={$showModal}>
    <div slot="background"><Map/></div>
    <div slot="modal"><InfoModal lat={$currentLat} long={$currentLong}/></div>
  </ModalWrapper>
</main>