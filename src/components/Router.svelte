<script>
  //Renderless component to act as a simple router using the History API
  import {
    currentLat,
    currentLong,
    showModal,
    showMenu,
    showCarousel
  } from "../store/store.js";

  window.onload = function() {
    let state = {};
    if (window.location.search.length > 0) {
      const params = window.location.search.substr(1);
      params.split("&").forEach(param => {
        const key = param.split("=")[0];
        //Param parsed from url must be coerced back into number for consistency with json data
        const value = parseFloat(param.split("=")[1]);
        state[key] = value;
      });

      state["modal"] = true;
      updateStore(state);
    }
  };

  function updateStore(state) {
    currentLat.set(state.lat);
    currentLong.set(state.long);
    state.modal !== undefined
      ? showModal.set(state.modal)
      : showModal.set(false);
    state.menu !== undefined ? showMenu.set(state.menu) : showMenu.set(false);
    state.carousel !== undefined
      ? showCarousel.set(state.carousel)
      : showCarousel.set(false);
  }

  window.onpopstate = function(event) {
    if (event.state) {
      updateStore(event.state);
    }
  };
</script>
