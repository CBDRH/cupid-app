<script>
  import FilterAccordion from '$lib/components/FilterAccordion.svelte';
  import FilterSummary from './FilterSummary.svelte';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

  let collapseSidebar = $state(true);
</script>

<aside
  class="flex min-h-screen shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-background text-foreground shadow-sm transition-[width] duration-300 ease-in-out dark:border-slate-700"
  class:w-16={collapseSidebar}
  class:w-72={!collapseSidebar}
>
  <div
    class="flex min-h-16 items-center border-b border-slate-200 dark:border-slate-700"
    class:justify-center={collapseSidebar}
    class:justify-between={!collapseSidebar}
    class:px-3={!collapseSidebar}
  >
    {#if !collapseSidebar}
      <div class="min-w-0">
        <h2 class="truncate text-sm font-semibold tracking-wide">Study filters</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">Refine the dashboard</p>
      </div>
    {/if}

    <button
      type="button"
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-400 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      aria-label={collapseSidebar ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!collapseSidebar}
      title={collapseSidebar ? 'Expand sidebar' : 'Collapse sidebar'}
      onclick={() => (collapseSidebar = !collapseSidebar)}
    >
      <FontAwesomeIcon
        icon={collapseSidebar ? faAnglesRight : faAnglesLeft}
        class="text-base"
      />
    </button>
  </div>

  {#if !collapseSidebar}
    <div class="flex-1 space-y-5 overflow-y-auto p-4">
      <FilterSummary />
      <div class="border-t border-slate-200 dark:border-slate-700"></div>
      <FilterAccordion />
    </div>
  {/if}
</aside>