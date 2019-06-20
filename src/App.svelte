<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Map from "./components/Map.svelte";
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
</script>

<style lang="postcss"></style>

<svelte:head><link href="https://fonts.googleapis.com/css?family=Oswald|Roboto&display=swap" rel="stylesheet">
</svelte:head>

  <main class="overflow-hidden">
    <Router/>
    <PlaceList />
    <ModalWrapper transitionTrigger="{$showModal}">
      <div slot="background"><Mapbox /></div>
      <div slot="modal"
        ><InfoModal lat="{$currentLat}" long="{$currentLong}"
      /></div>
    </ModalWrapper>
    {#if $showCarousel}
    <Carousel />
    {/if}
    {#if $showMenu} 
    <Menu><MenuContent/></Menu>
    {/if}
  </main>
