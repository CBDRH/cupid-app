<script>
  import FilterAccordion from '$lib/components/FilterAccordion.svelte';
  import FilterSummary from './FilterSummary.svelte';
  import { Button } from "flowbite-svelte";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

  let collapseSidebar = $state(true);

</script>


<!-- Show when the sidebar is open -->
{#if ! collapseSidebar}
  <aside class="bg-gray-50 p-3 w-[20%] border border-gray-300">
    
    <div class="flex justify-end">
      <Button
        class="bg-transparent text-gray-950 text-xl transition-colors duration-300 cursor-pointer hover:text-2xl focus:ring-0"
        onclick={() => collapseSidebar = !collapseSidebar}>
      <FontAwesomeIcon icon={faAnglesLeft}/>
      </Button>
    </div>
    
    <FilterSummary/>
    <FilterAccordion/>
  </aside>
{/if}  

<!-- Show when the sidebar is collapsed -->
{#if collapseSidebar}
  <aside class="bg-gray-50 p-3 w-[4%] border border-gray-300">
    <div class="flex justify-start">
      <Button
        class="bg-transparent text-gray-950 text-xl transition-colors duration-300 cursor-pointer hover:text-2xl focus:ring-0"
        onclick={() => collapseSidebar = !collapseSidebar} 
      >
      <FontAwesomeIcon icon={faAnglesRight}/>
      </Button>
    </div>
  </aside>
{/if}
