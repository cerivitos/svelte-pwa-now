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
</script>

<style lang="postcss"></style>

<svelte:head>
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="sgtoilet">
  <link rel="apple-touch-icon" href="/assets/apple-icon-512x512.png">
  <meta name="description" content="An unofficial listing of toilets rated by the Restroom Association (Singapore)">
  <meta name="theme-color" content="#5bd1d7" />
  <link href="https://fonts.googleapis.com/css?family=Oswald|Roboto&display=swap" rel="stylesheet">
  <title>sgtoilet | Toilets in Singapore</title>
</svelte:head>

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
