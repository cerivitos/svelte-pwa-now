<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Map from './components/Map.svelte';
  import PlaceList from './components/PlaceList.svelte';
  import InfoModal from './components/InfoModal.svelte';
  import ModalWrapper from './components/ModalWrapper.svelte';
  import Carousel from './components/Carousel.svelte';
  import {currentLat, currentLong, showModal, showCarousel} from './store/store.js';
</script>

<style lang="postcss">

</style>

<main class="overflow-hidden">
  <PlaceList/>
  <ModalWrapper transitionTrigger={$showModal}>
    <div slot="background"><Map/></div>
    <div slot="modal"><InfoModal lat={$currentLat} long={$currentLong}/></div>
  </ModalWrapper>
  {#if $showCarousel}
  <Carousel/>
  {/if}
</main>