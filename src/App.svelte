<script>
  import Searchbar from "./components/Searchbar.svelte";
  import Map from './components/Map.svelte';
  import PlaceList from './components/PlaceList.svelte';
  import InfoModal from './components/InfoModal.svelte';
  import Carousel from './components/Carousel.svelte';
  import ModalWrapper from './components/ModalWrapper.svelte';
  import {currentLat, currentLong, showModal} from './store/store.js';
  // import { tweened } from 'svelte/motion';
  // import { cubicOut } from 'svelte/easing';
  // import { writable } from 'svelte/store';
  
  // let yPos = writable(200);
  // yPos = tweened(0, {
  //   duration: 500,
  //   easing: cubicOut
  // })

  // $: if ($showModal) {
  //   yPos.set(0);
  // } else {
  //   yPos.set(200);
  // }
</script>

<style lang="postcss">

</style>

<main class="overflow-hidden">
  <!--For global margin-->
  <div class="absolute p-4 w-full" style="z-index:1000" >
    <PlaceList/>
  </div>
  <ModalWrapper transitionTrigger={$showModal}>
    <div slot="background"><Map/></div>
    <div slot="modal"><InfoModal lat={$currentLat} long={$currentLong}/></div>
  </ModalWrapper>
</main>