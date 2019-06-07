<script>
  export let name = "";
  export let address = "";
  export let rating = "";
</script>

<li class="flex p-4 list-inside">
  <div class="w-11/12">
    <p class="font-medium text-lg text-gray-800 truncate">{name}</p>
    <p class="font-light text-gray-800 leading-tight truncate">{address}</p>
  </div>
  <div class="w-1/12 content-center">
    <p>{rating}⭐</p>
  </div>
</li>
