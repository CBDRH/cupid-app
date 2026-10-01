<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition"
    import { Tooltip} from "flowbite-svelte";
    import { ChevronDoubleDownOutline, ChevronDoubleUpOutline, InfoCircleOutline } from "flowbite-svelte-icons";
    import { activityList } from "$lib/constants/activityList";
    import { selectedLabel, selectedOption, selectedOption2, selectedActivity} from "$lib/stores/filterStores.js"
    import { activityStore } from "$lib/stores/dataStore.js";




    let open = $state(false);
    let menuEl = $state<HTMLDivElement | null>(null);
    let buttonEl: HTMLButtonElement | null = null;
    type ActivityOption = {
      label: string;
      variable: string;
      definition: string;
      positive: number;
      null: number;
      negative: number;
    };

    type EnrichedActivity = {
      label: string;
      options: ActivityOption[];
      options2: string[];
      variable: string[];
      definition: string[];
    };

    let activities = $state<EnrichedActivity[]>([]); // This is the placehoder for the augmented activity list that includes the evidence

  // Function to close the menu if click is outside
    function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    if (menuEl && buttonEl && !menuEl.contains(target) && !buttonEl.contains(target)) {
        open = false;
    }
    }

  onMount(() => {
    // This only runs in the browser
    document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
});

// Code to add the activity evidence from activity-level-data.json to the activityList data structure
// Thank the lord for copilot

// Function to normalise strings
const normalizeKey = (s: string) =>
  s.trim().toLowerCase();

$effect(() => {
  const data = $activityStore;

  if (!data.length) {
    activities = [];
    return;
  }

  const normalizeActivity = (activity: string) =>
    activity.replace(/^\d+(\.\d+)*\s*/, "").trim();

  const collapsed = data.reduce(
    (acc: Record<string, { positive: number; null: number; negative: number }>, row: any) => {
      const key = normalizeActivity(row.activity);

      if (!acc[key]) {
        acc[key] = {
          positive: row.positive ?? 0,
          null: row.null ?? 0,
          negative: row.negative ?? 0
        };
      }

      return acc;
    },
    {}
  );

  activities = activityList.map(group => ({
    ...group,
    options: group.options.map((option, i) => ({
      label: option,
      variable: group.variable[i],
      definition: group.definition[i],
      positive: collapsed[option]?.positive ?? 0,
      null: collapsed[option]?.null ?? 0,
      negative: collapsed[option]?.negative ?? 0
    }))
  }));
});


</script>

<!-- Container -->
<div class="relative">

  <!-- Trigger button -->
  <button
    bind:this={buttonEl}
    class="w-full flex justify-left items-center gap-2 px-3 py-4 mb-6
           bg-gradient-to-r from-slate-400 to-slate-200 text-slate-800 rounded
           hover:bg-gradient-to-l hover:from-slate-700 hover:to-slate-800 hover:text-slate-300 text-base font-semibold uppercase tracking-wide text-sm
           transition-colors cursor-pointer"
    onclick={() => open = !open}
  >

        <!-- Selected Option -->
    {#if ! open}
      <ChevronDoubleDownOutline class="pointer-events-none w-5 h-5" />
    {:else}
      <ChevronDoubleUpOutline class="pointer-events-none w-5 h-5"/>
    {/if}  
    <span>Prevention activity:</span>
    {#if $selectedOption}
        <span class="font-semibold rounded-lg p-2 text-gray-50 bg-slate-800">{$selectedLabel}: {$selectedOption}</span>
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
          {#each activities as activity}
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
                        selectedOption.set(option.label);
                        selectedOption2.set(activity.options2[i]);
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
                             transition-colors duration-300"
                      class:bg-gray-400={$selectedOption === option.label}
                      onclick={() => {
                          selectedOption.set(option.label);
                          selectedOption2.set(activity.options2[i]);
                          selectedLabel.set(activity.label);
                          selectedActivity.set(activity.variable[i]);
                          open = false;
                        }}>
                    
                    <span>{option.label}</span>
                    
                    <div class="bg-gray-100 mt-1 text-xs text-center rounded w-16">
                      <span class="text-green-500">{option.positive}</span> | 
                      <span class="text-orange-400">{option.null}</span> |
                      <span class="text-red-500">{option.negative}</span>
                    </div>
                    
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
