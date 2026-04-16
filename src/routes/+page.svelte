<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import Tabset from '$lib/components/Tabset.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SelectActivity from '$lib/components/SelectActivity.svelte';
  import TestTable from '$lib/components/TestTable.svelte';
  import { onMount } from 'svelte';
  import { dataStore, activityStore } from '$lib/stores/dataStore';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  // modal visibility
  let showModal = writable(false);

  onMount(() => {
    // show modal when page loads
    showModal.set(true);
  });

  function closeModal() {
    showModal.set(false);
  }

  function closeAbout() {
    showModal.set(false);
    goto('/about');
  }

  onMount(async () => {
    
    // Initialise dataStore with study-level data
    const res = await fetch('/data/study_level_data.json');
    const jsonData = await res.json();
    dataStore.set(jsonData);      // store full dataset
    
    // Initialise activityStore with activity-level data
    const res1 = await fetch('/data/activity_level_data.json');
    const jsonData1 = await res1.json();
    activityStore.set(jsonData1);      // store full dataset
  });

</script>

<div class="flex h-screen">
  <!-- Sidebar -->
  <Sidebar/>

  <!-- Main content -->
  <div class="flex-1 flex flex-col overflow-auto">
    <Header />
    <TestTable />
    <SelectActivity />
    <Tabset />
  </div>
</div>

<Footer />


<!-- Modal -->
{#if $showModal}
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
      <button 
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        onclick={closeModal}
      >
        ✕
      </button>

      <h2 class="text-xl font-bold mb-2">Welcome to the CommUnity Prevention Initiative Dashboard (CUPID)!</h2>
      <p class="mb-4">
        This free, public resource helps community members, policy makers, and program managers find and understand research on how community action can impact alcohol and other drug (AOD) use, related harms and associated behaviours.
      </p>

    <div class="flex justify-center gap-4">
        <button
          class="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          onclick={closeModal}
        >
          🚀 Launch Dashboard
        </button>

        <button
          class="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-600 transition"
          onclick={closeAbout}
        >
          ❔About
        </button>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-white);
  }
</style>