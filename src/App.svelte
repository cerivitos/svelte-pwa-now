<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Mapbox from "./components/Mapbox.svelte";
  import PlaceList from "./components/PlaceList.svelte";
  import InfoModal from "./components/InfoModal.svelte";
  import ModalWrapper from "./components/ModalWrapper.svelte";
  import Carousel from "./components/Carousel.svelte";
  import Menu from "./components/Menu.svelte";
  import MenuContent from "./components/MenuContent.svelte";
  import Router from "./components/Router.svelte";
  import {
    currentLat,
    currentLong,
    showModal,
    showCarousel, showMenu
  } from "./store/store.js";

  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
</script>

<style lang="postcss"></style>

<main class="overflow-hidden">
  <Router/>
  <PlaceList />
  <ModalWrapper transitionTrigger="{$showModal}">
    <div slot="background"><Mapbox /></div>
    <div slot="modal"
      ><InfoModal/></div>
  </ModalWrapper>
  {#if $showCarousel}
  <Carousel />
  {/if}
  {#if $showMenu} 
  <Menu><MenuContent/></Menu>
  {/if}
</main>
