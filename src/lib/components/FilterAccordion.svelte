<script lang="ts">

import { AccordionItem, Accordion, Checkbox, Listgroup, Tooltip } from "flowbite-svelte";
import { AdjustmentsHorizontalSolid, InfoCircleSolid } from "flowbite-svelte-icons";
import { slide } from "svelte/transition";
import { drugChoices, genderChoices } from "$lib/constants/filterChoices.js";
import { drugStore, genderStore } from "$lib/stores/filterStores";

let selectedDrugs = $state([]);
let allDrugs = $state(true)

// When allDrugs checkbox is ticked, select all drugs
$effect(() => {
  allDrugs ? selectedDrugs = drugChoices.map(d => d.value) : selectedDrugs = selectedDrugs;
});

// If any drug is unticked, unticked the allDrugs checkbox
$effect(() => {
  selectedDrugs.length < drugChoices.length ? allDrugs = false : allDrugs = true;
});

// Update the store based on the values of selected checkboxes
$effect(() => {
  drugStore.set(selectedDrugs);
});

</script>

<!-- <p>{JSON.stringify(selectedDrugs)}</p> -->


<Accordion 
  class = "h-screen overflow-y-auto text-sm"
  activeClass="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
  inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
>
  
  <!-- Drug type -->
  <AccordionItem open>
    {#snippet header()}    
      <div class="flex items-center gap-2">
        <AdjustmentsHorizontalSolid />
        <span>Intervention</span>
      </div>
    {/snippet}
    
    <label class="my-2 font-semibold flex items-center gap-1">
      <span>Drug type</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          Select one or more drug types. Nicotine includes tobacco,
          smokeless tobacco, and vaping. Other drugs includes methamphetamine,
          ecstasy, cocaine, inhalants, opioids, caffeine, pharmaceuticals,
          nitrous oxide, and any unspecified substance.
        </div>
      </Tooltip>
    </label>

    <label class="flex items-center pl-2 pb-1 text-sm text-blue-950">
      <Checkbox bind:checked={allDrugs} color="green" class="scale-90"/>
      Select all
    </label>

    <Listgroup>
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={selectedDrugs} choices={drugChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

  </AccordionItem>

  <!-- Participants -->
  <AccordionItem>
    {#snippet header()}    
      <div class="flex items-center gap-2">
        <AdjustmentsHorizontalSolid />
        <span>Participants</span>
      </div>
    {/snippet}
    
    <label class="my-2 font-semibold flex items-center gap-1">
      <span>Gender</span>
      <InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          The gender of participants involved in the intervention (if applicable)
        </div>
      </Tooltip>
    </label>

    <Listgroup>
      <!-- Directly bind the Checkbox group to the store -->
      <Checkbox bind:group={$genderStore} choices={genderChoices} color="green" classes={{ div: "p-2"}} />
    </Listgroup> 

  </AccordionItem>
  
</Accordion>  


