<script>
  import FilterAccordion from '$lib/components/FilterAccordion.svelte';
  import FilterSummary from './FilterSummary.svelte';
  import { Button } from "flowbite-svelte";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

  let collapseSidebar = $state(true);

</script>


<aside
  class="bg-gray-50 border border-gray-300 transition-all duration-300 ease-in-out overflow-hidden"
  class:w-[4%]={collapseSidebar}
  class:w-[20%]={!collapseSidebar}
  // onmouseenter={() => collapseSidebar = !collapseSidebar}
  >
  <div class="flex justify-end">
    <Button
      class="bg-transparent text-slate-500 text-xl cursor-pointer hover:text-slate-800 focus:ring-0"
      onclick={() => collapseSidebar = !collapseSidebar}
    >

    {#key collapseSidebar}
      <FontAwesomeIcon
        icon={collapseSidebar ? faAnglesRight : faAnglesLeft}
        class="transition-transform duration-300"
      />
    {/key}

    </Button>
  </div>

  {#if !collapseSidebar}

  <div class="p-4">
    <FilterSummary />
    <FilterAccordion />
    </div>
  {/if}

</aside>