<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import Tabset from '$lib/components/Tabset.svelte';
  import SelectActivity from '$lib/components/SelectActivity.svelte';
  import { onMount } from 'svelte';
  import { dataStore } from '$lib/stores/dataStore';
  import { filteredData } from '$lib/stores/filterStores';

  onMount(async () => {
    const res = await fetch('/data/study_level_data.json');
    const jsonData = await res.json();
    dataStore.set(jsonData);      // store full dataset
    filteredData.set(jsonData);  // initialize filtered data
  });

</script>

<div class="flex h-screen">
  <!-- Sidebar -->
  <Sidebar/>

  <!-- Main content -->
  <div class="flex-1 flex flex-col overflow-auto">
    <Header />
    <SelectActivity />
    <Tabset />
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-white);
  }
</style>