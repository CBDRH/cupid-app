<script>
  import SummaryStudies from '$lib/components/SummaryStudies.svelte';
  import ManuscriptsTable from './ManuscriptsTable.svelte';
  import Bibliography from './Bibliography.svelte';

  let activeTab = 0;
  const tabs = ["Evidence Summary", "Manuscripts", "Bibliography"];
</script>

<div>
  <div class="flex gap-0">
    {#each tabs as tab, i}
      <button
        on:click={() => activeTab = i}
        class={`px-3 py-1 text-gray-700 rounded w-48
                ${activeTab === i ? 'font-semibold border-b-4 border-blue-950' : 'font-normal border border-gray-200'}`}>
        {tab}
      </button>
    {/each}
  </div>


  <div class="mt-4 p-4 border border-gray-300">
    {#if activeTab === 0}
      <SummaryStudies/>
    {:else if activeTab === 1}
      <ManuscriptsTable />
    {:else}
      <Bibliography />
    {/if}
  </div>

</div>
