<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition"
    import { Tooltip} from "flowbite-svelte";
    import { derived } from "svelte/store";
    import { ChevronDoubleDownOutline, ChevronDoubleUpOutline, InfoCircleOutline } from "flowbite-svelte-icons";
    import { activityList } from "$lib/constants/activityList";
    import { selectedLabel, selectedOption, selectedActivity, filteredActivity } from "$lib/stores/filterStores.js"
  

    let open = false;
    let menuEl: HTMLDivElement | null = null;
    let buttonEl: HTMLButtonElement | null = null;

  // Function to close the menu if click is outside
    function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    if (menuEl && buttonEl && !menuEl.contains(target) && !buttonEl.contains(target)) {
        open = false;
    }
    }

  // Count number of activities 
  export const activityCounts = derived(filteredActivity, ($filteredActivity) => {
  const counts = {};

  $filteredActivity.forEach(item => {
    if (!counts[item.activity]) counts[item.activity] = 0;
    counts[item.activity] += 1;
  });

  return counts; // e.g. { "Alternative activities": 5, "Education": 3 }
});


  onMount(() => {
    // This only runs in the browser
    document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
});

</script>

<!-- Container -->
<div class="relative">

  <!-- Trigger button -->
  <button
    bind:this={buttonEl}
    class="w-full flex justify-left items-center gap-2 px-3 py-2 mb-6
           bg-gray-300 text-gray-700 rounded
           hover:bg-gray-700 hover:text-gray-300 text-xs font-semibold uppercase tracking-wide
           transition-colors cursor-pointer"
    onclick={() => open = !open}
  >

        <!-- Selected Option -->
    {#if ! open}
        <ChevronDoubleDownOutline class="w-5 h-5" />
    {:else}
        <ChevronDoubleUpOutline class="w-5 h-5" />
    {/if}  
    <span>Prevention activity:</span>
    {#if $selectedOption}
        <span class="font-semibold rounded-lg p-2 text-gray-50 bg-gray-700">{$selectedLabel}: {$selectedOption}</span>
    {/if} 
  </button>

  <!-- Sliding panel -->
  {#if open}
  
    <div
      bind:this={menuEl}
      class="absolute top-full left-0 w-full bg-gray-50 shadow-lg border border-gray-200
             z-20 overflow-hidden"
    >
      <div class="p-4 max-h-[500px] overflow-y-auto">

        <!-- Grouped selector -->
        <div class="columns-5 gap-6">
          {#each activityList as activity}
            <div class="mb-6 break-inside-avoid">
              <!-- Group header -->
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {activity.label}
              </div>

              <!-- Options -->
              <ul class="space-y-0">
                {#each activity.options as option, i}
                  <li class="flex">
                    <InfoCircleOutline 
                      class="cursor-pointer"
                      onclick={() => {
                        selectedOption.set(option);
                        selectedLabel.set(activity.label);
                        selectedActivity.set(activity.variable[i]);
                        open = false;
                        }} />
                    <Tooltip type="light" transition={slide}>
                      <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
                        {activity.definition[i]}
                      </div>
                    </Tooltip>

                    <button
                      class="w-full text-left text-xs px-2 py-1 rounded
                             cursor-pointer
                             hover:bg-gray-200
                             transition-colors duration-200"
                      class:bg-gray-400={$selectedOption === option}
                      onclick={() => {
                          [
                            [selectedOption, option],
                            [selectedLabel, activity.label],
                            [selectedActivity, activity.variable[i]]
                          ].forEach(([store, value]) => store.set(value));
                          open = false;
                        }}>
                    <span>{option}</span>
                    <span class="ml-2 text-xs font-semibold text-gray-500">
                      {$activityCounts[option] ?? 0}
                    </span>
                    </button> 
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
