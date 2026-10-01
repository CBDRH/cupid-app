<script lang="ts">

import { AccordionItem, Accordion, Checkbox, Listgroup, Tooltip, Input } from "flowbite-svelte";
import { AdjustmentsHorizontalSolid, InfoCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
import { slide } from "svelte/transition";
import { drugChoices, sexChoices, lifestagesChoices, priorityChoices, continentChoices, urbanicityChoices, settingChoices } from "$lib/constants/filterChoices.js";
import { drugStore, minYearStore, maxYearStore, sexStore, lifestagesStore, priorityStore, continentStore, urbanicityStore, settingStore } from "$lib/stores/filterStores";
import { derived } from 'svelte/store';

export const combinedFiltersArrayStore = derived(
  [
    drugStore,
    minYearStore,
    maxYearStore,
    sexStore,
    lifestagesStore,
    priorityStore,
    continentStore,
    urbanicityStore,
    settingStore
  ],
  ([
    drug,
    minYear,
    maxYear,
    sex,
    lifestages,
    priority,
    continent,
    urbanicity,
    setting
  ]) => {
    return [
      ...drug,
      ...(minYear != null && minYear != "1970" ? [`Min: ${minYear}`] : []),
      ...(maxYear != null && maxYear != "2026" ? [`Max: ${maxYear}`] : []),
      ...sex,
      ...lifestages,
      ...priority,
      ...continent,
      ...urbanicity,
      ...setting
    ];
  }
);

// This function removes filter items from the arrays
function removeFromArray(arr, value) {
  return Array.isArray(arr)
    ? arr.filter(item => item !== value)
    : arr;
}

// This function runs removeFromStore across all Stores
function removeFilterItem(value) {
  $drugStore = removeFromArray($drugStore, value);
  
  if (value.startsWith("Min:")) $minYearStore = "1970";
  if (value.startsWith("Max:")) $maxYearStore = "2026";

  $sexStore = removeFromArray($sexStore, value);
  $lifestagesStore = removeFromArray($lifestagesStore, value);
  $priorityStore = removeFromArray($priorityStore, value);
  $continentStore = removeFromArray($continentStore, value);
  $urbanicityStore = removeFromArray($urbanicityStore, value);
  $settingStore = removeFromArray($settingStore, value);
}

// Store current year
const currentYear = new Date().getFullYear();

</script>

<!-- <p>{$combinedFiltersArrayStore.length}</p> -->

  {#if ($combinedFiltersArrayStore).length > 0}
    
    <div class="mb-3 w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm">

      <div class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
        <AdjustmentsHorizontalSolid class="h-4 w-4 text-slate-700" />
        <span>Selected filters</span>
        <span class="ml-auto rounded-full bg-slate-50 px-2 py-0.5 text-slate-800">{$combinedFiltersArrayStore.length}</span>
      </div>
    
      <div class="flex flex-wrap items-center gap-2">
      
        {#each $combinedFiltersArrayStore as item}
          <div class="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-1 pl-3 pr-1 text-xs font-medium text-slate-700">
            {item}
            <button
              type="button"
              class="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
              aria-label={`Remove ${item} filter`}
              title={`Remove ${item}`}
              onclick={() => removeFilterItem(item)}
            >
              <CloseCircleSolid class="h-4 w-4" />
            </button>
          </div>
        {/each}

      </div>
    </div>

  {/if}


<Accordion
  class="space-y-1 text-sm"
  activeClass="bg-slate-50 text-slate-900 focus:ring-2 focus:ring-slate-200"
  inactiveClass="text-slate-700 hover:bg-slate-50"
>
  
  <!-- Intervention -->
  <AccordionItem open class="!border-0 overflow-hidden bg-white">
    {#snippet header()}    
      <div class="flex items-center gap-2 font-semibold text-base">
        <AdjustmentsHorizontalSolid class="h-4 w-4 text-slate-700" />
        <span>Target drugs</span>
      </div>
    {/snippet}
    
    <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
      <span>Filter drug type</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
          Click to filter results to specific drug types. Nicotine includes tobacco,
          smokeless tobacco, and vaping. Other drugs includes methamphetamine,
          ecstasy, cocaine, inhalants, opioids, caffeine, pharmaceuticals,
          nitrous oxide, and any unspecified substance.
        </div>
      </Tooltip>
    </label>

    <!-- Drug type -->
     
    <Listgroup class="mb-4">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$drugStore} choices={drugChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 
  
  </AccordionItem>

  <!-- Study details -->
   <AccordionItem open={false} class="overflow-hidden bg-white shadow-sm">
    {#snippet header()}    
      <div class="flex items-center gap-2 font-semibold text-base">
        <AdjustmentsHorizontalSolid class="h-4 w-4 text-slate-700" />
        <span>Study details</span>
      </div>
    {/snippet}

        <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
      <span>Study year</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700 dark:hover:text-slate-400"/>
    <Tooltip placement="right" type="light" transition={slide}>
      <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
        Publication year range of the study. Use this filter to limit results to a specific time period.
      </div>
    </Tooltip>
  </label>

    <div class="relative mb-4 flex items-center gap-2">

      <Input bind:value={$minYearStore} type="number" id="quantity-input" aria-describedby="helper-text-explanation" min="1970" max={currentYear} placeholder="1970" step="1" required class="w-18! text-center" />
      <div class="text-slate-400">to</div>
      <Input bind:value={$maxYearStore} type="number" id="quantity-input" aria-describedby="helper-text-explanation" min="{$minYearStore}" max={currentYear} placeholder="2026" step="1" required class="w-18! text-center" />

  </div>

  </AccordionItem>


  <!-- Participants -->
  <AccordionItem open={false} class="overflow-hidden bg-white shadow-sm">
    {#snippet header()}    
      <div class="flex items-center gap-2 font-semibold text-base">
        <AdjustmentsHorizontalSolid class="h-4 w-4 text-slate-700 dark:text-slate-400" />
        <span>Participants</span>
      </div>
    {/snippet}
    
    <!-- Sex -->
    <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
      <span>Sex</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700 dark:hover:text-slate-400"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
          Filters to activities that were specific to a particularly sex
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-4">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$sexStore} choices={sexChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

    <!-- Lifestage -->
    <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
      <span>Lifestage</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700 dark:hover:text-slate-400"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
          The age range in which the activity is designed to have the greatest influence
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-4">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$lifestagesStore} choices={lifestagesChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

    <!-- Priority populations -->
    <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
      <span>Priority populations</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700 dark:hover:text-slate-400"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
          The populations in which the activity is designed to have the greatest influence
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-4">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$priorityStore} choices={priorityChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

  </AccordionItem>



  <!-- Community context -->
  <AccordionItem open={false} class="overflow-hidden bg-white shadow-sm">
    {#snippet header()}    
      <div class="flex items-center gap-2 font-semibold text-base">
        <AdjustmentsHorizontalSolid class="h-4 w-4 text-slate-700 dark:text-slate-400" />
        <span>Community context</span>
      </div>
    {/snippet}
    
    <!-- Continent -->
    <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
      <span>Continent</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700 dark:hover:text-slate-400"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
          The continent where the activity took place
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-4">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$continentStore} choices={continentChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 


    <!-- Urbanicity -->
    <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
      <span>Urbanicity</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700 dark:hover:text-slate-400"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
          The 'urbanicity' or geographical classification of the community
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-4">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$urbanicityStore} choices={urbanicityChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 


    <!-- Setting -->
    <label class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
      <span>Setting</span>
      <InfoCircleSolid class="h-4 w-4 cursor-help text-slate-400 hover:text-slate-700 dark:hover:text-slate-400"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal normal-case">
          The primary setting where the activity took place
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-4">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$settingStore} choices={settingChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

  
  </AccordionItem>
</Accordion>  

