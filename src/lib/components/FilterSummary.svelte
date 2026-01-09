<script lang="ts">
    import { dataStore } from '$lib/stores/dataStore';
    import { filteredData } from '$lib/stores/filterStores';
    import { FilePdfSolid } from "flowbite-svelte-icons";

    $: total = $dataStore.length;
    $: selected = $filteredData.length;
    $: fraction = total > 0 ? selected / total : 0;

    $: isLow = selected < 10;

    console.log(isLow)

</script>

<div class="grid grid-cols-[auto_1fr] gap-4 mb-6 items-center max-h-[20vh]">

  <!-- Left: vertical bar -->
  <div class="w-6 h-full bg-gray-300 relative rounded">
    <div
      class={`w-full absolute bottom-0 rounded transition-all duration-500 ease-out
      ${isLow ? 'bg-red-600' : 'bg-gray-800'}`}
      style="height: {fraction * 100}%"
    ></div>
  </div>

  <!-- Right: text block -->
  <div class="flex flex-col justify-end gap-1 h-full">
    
    <!-- Top: big number with icon -->
    <div class={`flex items-center gap-2 text-6xl font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
      <FilePdfSolid class="font-normal h-12 w-12 shrink-0" />
      <span>{selected}</span>
    </div>
    

    <!-- Bottom: explanatory text -->
    <div class="text-sm text-gray-600">
      studies selected from a total of {total}
    </div>
  </div>

</div>
