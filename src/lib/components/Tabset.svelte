<script>
  import SummaryStudies from '$lib/components/SummaryStudies.svelte';
  import ManuscriptsTable from './ManuscriptsTable.svelte';
  import Bibliography from './Bibliography.svelte';
  import SummaryDrugs from './SummaryDrugs.svelte';
  import SummaryDetail from './SummaryDetail.svelte';
  import SummaryTable from './SummaryTable.svelte';
  import { dataStore } from '$lib/stores/dataStore';
  import { filteredData } from "$lib/stores/filterStores";

  let activeTab = $state(0);

  let total = $derived($dataStore.length);
  let selected = $derived($filteredData.length);

</script>

<div>
  <div class="flex gap-2">
    {#each ["Evidence Summary", `Filtered study list (n=${selected})`, `CUPID study list (n=${total})`] as tab, i}
      <button
        onclick={() => activeTab = i}
        class={`px-3 py-1 rounded w-56 cursor-pointer
                ${activeTab === i ? 'font-semibold border-b-4 border-border' : 'font-normal border-b-1 border-border'}`}>
        {tab}
      </button>
    {/each}
  </div>


  <div class="mt-4 p-4">
    {#if activeTab === 0}
      <div class="rounded-lg p-4">
        <SummaryStudies />
      </div>
      <div class="mt-4 rounded-lg p-4 mb-16">
        <SummaryDrugs />
        <SummaryDetail />
      </div>
      
    {:else if activeTab === 1}
      <SummaryTable />
    {:else}
      <Bibliography />
    {/if}
  </div>

</div>
