<script lang="ts">

import { AccordionItem, Accordion, Checkbox, Listgroup, Tooltip } from "flowbite-svelte";
import { AdjustmentsHorizontalSolid, InfoCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
import { slide } from "svelte/transition";
import { drugChoices, sexChoices, lifestagesChoices, priorityChoices, continentChoices, urbanicityChoices, settingChoices } from "$lib/constants/filterChoices.js";
import { drugStore, sexStore, lifestagesStore, priorityStore, continentStore, urbanicityStore, settingStore } from "$lib/stores/filterStores";
import { derived } from 'svelte/store';

let selectedDrug = $state([]);
let selectedSex = $state([]);
let selectedLifestages = $state([]);
let selectedPriority = $state([]);
let selectedContinent = $state([]);
let selectedUrbanicity = $state([]);
let selectedSetting = $state([]);

// Update the store based on the values of selected checkboxes
$effect(() => {
  drugStore.set(selectedDrug);
  sexStore.set(selectedSex);
  lifestagesStore.set(selectedLifestages);
  priorityStore.set(selectedPriority);
  continentStore.set(selectedContinent);
  urbanicityStore.set(selectedUrbanicity);
  settingStore.set(selectedSetting);
});

export const combinedFiltersArrayStore = derived(
  [
    drugStore,
    sexStore,
    lifestagesStore,
    priorityStore,
    continentStore,
    urbanicityStore,
    settingStore
  ],
  (stores) =>
    stores
      .filter(Array.isArray)   // guards against null
      .flat()                  // concatenates all arrays
);

// This function removes filter items from the arrays
function removeFromArray(arr, value) {
  return Array.isArray(arr)
    ? arr.filter(item => item !== value)
    : arr;
}

// This function runs removeFromStore across all Stores
function removeFilterItem(value) {
  selectedDrug = removeFromArray(selectedDrug, value);
  selectedSex = removeFromArray(selectedSex, value);
  selectedLifestages = removeFromArray(selectedLifestages, value);
  selectedPriority = removeFromArray(selectedPriority, value);
  selectedContinent = removeFromArray(selectedContinent, value);
  selectedUrbanicity = removeFromArray(selectedUrbanicity, value);
  selectedSetting = removeFromArray(selectedSetting, value);
}




</script>

<!-- <p>{JSON.stringify($sexStore)}</p> -->



  {#if ($combinedFiltersArrayStore).length > 0}
    
    <div class="w-full border border-blue-950 rounded-lg p-2 mb-1">
      <div class="flex flex-row gap-1">
        <AdjustmentsHorizontalSolid />
        Selected Filters        
      </div>
    
      <div class="flex flex-wrap items-center gap-2 p-2">
        {#each $combinedFiltersArrayStore as item}
          <div class = "flex flex-row bg-gray-300 rounded-lg text-gray-600 gap-1">
            {item}
            <CloseCircleSolid 
            class="inline-block align-text-bottom ml-1 hover:text-gray-900 cursor-pointer"
            onclick={() => removeFilterItem(item)}
            />
          </div>
        {/each}
      </div>
    </div>
  {/if}


<Accordion 
  class = "h-screen overflow-y-auto text-sm"
  activeClass="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
  inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
>
  
  <!-- Intervention -->
  <AccordionItem open>
    {#snippet header()}    
      <div class="flex items-center gap-2">
        <AdjustmentsHorizontalSolid />
        <span>Target drugs</span>
      </div>
    {/snippet}
    
    <label class="font-semibold flex items-center gap-1">
      <span>Filter drug type</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          Click to filter results to specific drug types. Nicotine includes tobacco,
          smokeless tobacco, and vaping. Other drugs includes methamphetamine,
          ecstasy, cocaine, inhalants, opioids, caffeine, pharmaceuticals,
          nitrous oxide, and any unspecified substance.
        </div>
      </Tooltip>
    </label>

    <!-- Drug type -->
     
    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedDrug} choices={drugChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

  </AccordionItem>

  <!-- Participants -->
  <AccordionItem  open={false}>
    {#snippet header()}    
      <div class="flex items-center gap-2">
        <AdjustmentsHorizontalSolid />
        <span>Participants</span>
      </div>
    {/snippet}
    
    <!-- Sex -->
    <label class="font-semibold flex items-center gap-1">
      <span>Sex</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          Filters to activities that were specific to a particularly sex
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedSex} choices={sexChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

    <!-- Lifestage -->
    <label class="my-2 font-semibold flex items-center gap-1">
      <span>Lifestage</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          The age range in which the activity is designed to have the greatest influence
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedLifestages} choices={lifestagesChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

    <!-- Priority populations -->
    <label class="my-2 font-semibold flex items-center gap-1">
      <span>Priority populations</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          The populations in which the activity is designed to have the greatest influence
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedPriority} choices={priorityChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

  </AccordionItem>



  <!-- Community context -->
  <AccordionItem  open={false}>
    {#snippet header()}    
      <div class="flex items-center gap-2">
        <AdjustmentsHorizontalSolid />
        <span>Community context</span>
      </div>
    {/snippet}
    
    <!-- Continent -->
    <label class="font-semibold flex items-center gap-1">
      <span>Continent</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          The continent where the activity took place
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedContinent} choices={continentChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 


    <!-- Urbanicity -->
    <label class="font-semibold flex items-center gap-1">
      <span>Urbanicity</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          The 'urbanicity' or geographical classification of the community
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedUrbanicity} choices={urbanicityChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 


    <!-- Setting -->
    <label class="font-semibold flex items-center gap-1">
      <span>Setting</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          The primary setting where the activity took place
        </div>
      </Tooltip>
    </label>

    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedSetting} choices={settingChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 


  
  
  
  </AccordionItem>
</Accordion>  

