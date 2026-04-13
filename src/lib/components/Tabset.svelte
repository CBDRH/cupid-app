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
  <div class="flex gap-0">
    {#each ["Evidence Summary", `Filtered study list (n=${selected})`, `CUPID study list (n=${total})`] as tab, i}
      <button
        onclick={() => activeTab = i}
        class={`px-3 py-1 text-gray-700 rounded w-48
                ${activeTab === i ? 'font-semibold border-b-4 border-blue-950' : 'font-normal border border-gray-200'}`}>
        {tab}
      </button>
    {/each}
  </div>


  <div class="mt-4 p-4 border border-gray-300">
    {#if activeTab === 0}
      <SummaryStudies />
      <SummaryDrugs />
      <SummaryDetail />
      <SummaryTable />
    {:else if activeTab === 1}
      <ManuscriptsTable />
    {:else}
      <Bibliography />
    {/if}
  </div>

</div>
