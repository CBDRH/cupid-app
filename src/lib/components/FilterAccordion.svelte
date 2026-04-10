<script lang="ts">

import { AccordionItem, Accordion, Checkbox, Listgroup, Tooltip } from "flowbite-svelte";
import { AdjustmentsHorizontalSolid, InfoCircleSolid } from "flowbite-svelte-icons";
import { slide } from "svelte/transition";
import { drugChoices, genderChoices, lifestagesChoices, priorityChoices, continentChoices, urbanicityChoices, settingChoices } from "$lib/constants/filterChoices.js";
import { drugStore, genderStore, lifestagesStore, priorityStore, continentStore, urbanicityStore, settingStore } from "$lib/stores/filterStores";

let selectedDrug = $state([]);
let allDrug = $state(false);

let selectedGender = $state([]);
let allGender = $state(true);

let selectedLifestages = $state([]);
let allLifestages = $state(true);

let selectedPriority = $state([]);
let allPriority = $state(true);

let selectedContinent = $state([]);
let allContinent = $state(true);

let selectedUrbanicity = $state([]);
let allUrbanicity = $state(true);

let selectedSetting = $state([]);
let allSetting = $state(true);


// When allDrug checkbox is ticked, select all drugs
$effect(() => {
  if (allDrug) {selectedDrug = drugChoices.map(d => d.value);}
  if (allGender) {selectedGender = genderChoices.map(d => d.value);}
  if (allLifestages) {selectedLifestages = lifestagesChoices.map(d => d.value);}
  if (allPriority) {selectedPriority = priorityChoices.map(d => d.value);}
  if (allContinent) {selectedContinent = continentChoices.map(d => d.value);}
  if (allUrbanicity) {selectedUrbanicity = urbanicityChoices.map(d => d.value);}
  if (allSetting) {selectedSetting = settingChoices.map(d => d.value);}
});

// If any drug is unticked, unticked the allDrug checkbox
$effect(() => {
    if (allDrug===true && selectedDrug.length != drugChoices.length) {allDrug = false;}
    if (allGender===true && selectedGender.length != genderChoices.length) {allGender = false;}
    if (allLifestages===true && selectedLifestages.length != lifestagesChoices.length) {allLifestages = false;}
    if (allPriority===true && selectedPriority.length != priorityChoices.length) {allPriority = false;}
    if (allContinent===true && selectedContinent.length != continentChoices.length) {allContinent = false;}
    if (allUrbanicity===true && selectedUrbanicity.length != urbanicityChoices.length) {allUrbanicity = false;}
    if (allSetting===true && selectedSetting.length != settingChoices.length) {allSetting = false;}
});

// If all drugs are ticked then tick the allDrug checkbox
$effect(() => {if (selectedDrug.length === drugChoices.length) {allDrug = true;}});
$effect(() => {if (selectedGender.length === genderChoices.length) {allGender = true;}});
$effect(() => {if (selectedLifestages.length === lifestagesChoices.length) {allLifestages = true;}});
$effect(() => {if (selectedPriority.length === priorityChoices.length) {allPriority = true;}});
$effect(() => {if (selectedContinent.length === continentChoices.length) {allContinent = true;}});
$effect(() => {if (selectedUrbanicity.length === urbanicityChoices.length) {allUrbanicity = true;}});
$effect(() => {if (selectedSetting.length === settingChoices.length) {allSetting = true;}});

// Update the store based on the values of selected checkboxes
$effect(() => {
  drugStore.set(selectedDrug);
  genderStore.set(selectedGender);
  lifestagesStore.set(selectedLifestages);
  priorityStore.set(selectedPriority);
  continentStore.set(selectedContinent);
  urbanicityStore.set(selectedUrbanicity);
  settingStore.set(selectedSetting);
});

</script>

<!-- <p>{JSON.stringify($genderStore)}</p>

<p>{allGender}</p> -->

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
    <!-- <label class="flex items-center pl-2 pb-2 text-sm text-blue-950">
      <Checkbox bind:checked={allDrug} color="green" class="scale-100"/>
      Select all
    </label> -->
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
    
    <!-- Gender -->
    <label class="font-semibold flex items-center gap-1">
      <span>Gender</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          Filters to activities that were specific to a particularly gender
        </div>
      </Tooltip>
    </label>

    <label class="flex items-center pl-2 pb-2 text-sm text-blue-950">
      <Checkbox bind:checked={allGender} color="green" class="scale-100"/>
      Select all
    </label>
    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedGender} choices={genderChoices} color="green" classes={{ div: "p-2"}} />
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

    <label class="flex items-center pl-2 pb-2 text-sm text-blue-950">
      <Checkbox bind:checked={allLifestages} color="green" class="scale-100"/>
      Select all
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

    <label class="flex items-center pl-2 pb-2 text-sm text-blue-950">
      <Checkbox bind:checked={allPriority} color="green" class="scale-100"/>
      Select all
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

    <label class="flex items-center pl-2 pb-2 text-sm text-blue-950">
      <Checkbox bind:checked={allContinent} color="green" class="scale-100"/>
      Select all
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

    <label class="flex items-center pl-2 pb-2 text-sm text-blue-950">
      <Checkbox bind:checked={allUrbanicity} color="green" class="scale-100"/>
      Select all
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

    <label class="flex items-center pl-2 pb-2 text-sm text-blue-950">
      <Checkbox bind:checked={allSetting} color="green" class="scale-100"/>
      Select all
    </label>
    <Listgroup class="mb-6">
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedSetting} choices={settingChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 


  
  
  
  </AccordionItem>
</Accordion>  

