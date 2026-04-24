<script lang="ts">
  import { slide } from "svelte/transition";
  import { Tooltip, Modal, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell,
     Indicator, Button } from "flowbite-svelte";
  import { filteredData, selectedOption, filteredActivity } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
  import { InfoCircleSolid, StarSolid } from "flowbite-svelte-icons";
  import { studyDetails } from "$lib/constants/studyDetails.js";

  //   Reactive counts for each category
  let total = $state(0);
  let positive = $state(0);
  let none = $state(0);
  let negative = $state(0);
  let values = $state([0, 0, 0]);
  let widths = $state([0, 0, 0]);
  let studyModal = $state(false);
  

  // Whenever filteredData changes, update counts
  $effect(() => {
    const data = $filteredData; // automatically reactive
    total = data.length;

    positive = data.filter(d => d.study_summary === 1).length;
    none = data.filter(d => d.study_summary === 2).length;
    negative = data.filter(d => d.study_summary == 3).length;

    values = [positive, none, negative]

    // Compute widths in %
    widths = [100 * positive / total, 100 * none / total, 100 * negative / total];

  });

  let subset = $state(null); // The selected bar (positive/no impact/negative)
  function handleSegmentClick(i) { // The function that runs when the user clicks the bar
    subset = i + 1
    studyModal = true
  }

  
  let colors = ["green-500", "orange-400", "red-500"];
  let text = ["green-100", "orange-100", "red-100"];
  let message = ["had a positive impact", "had no impact", "had a negative impact"];
  let legend = [
    { color: "green-500", label: "Positive impact", hoverColor: "green-900", tooltip: "The selected activity had a statistically significant positive impact on at least one outcome" },
    { color: "orange-400", label: "No impact", hoverColor: "orange-900", tooltip: "The selected activity did not have a statistically significant positive impact on any outcome" },
    { color: "red-500", label: "Negative impact", hoverColor: "red-900", tooltip: "The selected activity had a statistically significant negative impact on at least one outcome" },
  ];

// Whenever selected activy changes update
let numActivities = $state(null);

$effect(() => {
  const data = $filteredActivity;
  numActivities = data.length
})

 // Handles clickable row in table
  let openRow: number | null | undefined = $state();

  const toggleRow = (i: number) => {
    openRow = openRow === i ? null : i;
  };

  // Handles text table search 
  let selectedIds = $state([]); // Array of IDs (or indices) that are selected
  let filteredRows = $state([]);

  $effect(() => {
    filteredRows = $filteredActivity
      .filter(row => selectedIds.includes(row.record_id))   // first: keep only selected rows
      .map(row => row.reference);                           // then: pick the `reference` property
  });

  $effect(() => {
    const data = $filteredActivity; // automatically reactive
    total = data.length;
  });

  let searchTerm = $state("");

  let filteredItems = $derived.by(() => $filteredActivity.filter((study) => !searchTerm || study.reference.toLowerCase().includes(searchTerm.toLowerCase())));
  
  let filteredBySubset = $derived( // The subset of the filtered data that matches the users click
    filteredItems.filter(study => study.study_summary === subset)
  );

</script>

<h2 class="flex gap-1 items-baseline ">
  Evidence from previous community-wide studies
    <InfoCircleSolid class="hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide} class="shadow-lg border border-blue-950">
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          <h2>Interpreting the overall study impact</h2>
          
          <div class="flex w-[100%] m-auto h-2 rounded overflow-hidden">
          {#each values as value, i}
            <div 
              class={`h-full flex items-center justify-center bg-${colors[i]}`}
              style="width: {widths[i]}%"
            >
          </div>
          {/each}
          </div>
          This bar shows the strenth of evidence based on the {total} studies that match your selected activities and filter settings.
          <br>
          <b>Positive impact</b> means that the evaluation study found that the included activities had a statistically significant positive impact on at least one outcome.
          <br>
          <b>No impact</b> means that the evaluation study did not find that the included activities had a statistically significant positive impact on any outcome.
          <br>
          <b>Negative impact</b> means that the evaluation study found that the included activities had a statistically significant negative impact on at least one outcome
        </div>
      </Tooltip>
</h2>

<div class="text-sm mb-3">
    <p>{positive} out of {total} studies showed support for this initiative</p>
</div>

<div 
  class="flex w-[100%] m-auto h-8 rounded overflow-hidden border border-gray-300 cursor-pointer"
  >
  {#each values as value, i}
    <button 
      class={`h-full flex items-center justify-center border-0 hover:border-2  hover:border-${colors[i]} cursor-pointer text-${text[i]} font-bold bg-${colors[i]}`}
      style="width: {widths[i]}%"
      onclick={() => handleSegmentClick(i)}
    >

      <!-- Trigger element must wrap the part you want hover on -->
      <div id={"segment-" + i} class="w-full h-full flex items-center justify-center">
        {value === 0 ? null : value}
      </div>

      <!-- Must be placed right after the trigger -->
      <Tooltip type="light" transition={slide}
        triggeredBy={"#segment-" + i}
        placement="top"
        class="max-w-sm font-normal leading-relaxed whitespace-normal"
      >
        {value} out of {total} eligible studies {message[i]}<br><span class="text-gray-700">Click bar for more</span>
      </Tooltip>

    </button>
  {/each}
  </div>

<!-- Legend -->
<div class="flex gap-4 mt-4 justify-center">
  {#each legend as item}
    <div class="flex items-center gap-2">
      <!-- Colored box -->
      <div class={`w-4 h-4 bg-${item.color} rounded-sm cursor-pointer hover:border hover:border-gray-300`}></div>
      <!-- Tooltip -->
      <Tooltip type="light" transition={slide} placement="bottom" >
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">{item.tooltip}</div>  
      </Tooltip>

      <!-- Label -->
      <span class="text-gray-700 text-sm">{item.label}</span>
    </div>
  {/each}
</div>

<!-- Launch a modal dialogue with more info if the summary bar is clicked -->
<Modal bind:open={studyModal} size="xl">

  <h3 class="text-md font-semibold tracking-widest uppercase text-center text-gray-200">
    Activity summary:{$selectedOption} 
  </h3>
  <p>
    Details of {values[subset-1]} studies that {message[subset-1]}
  </p>


    <div class="max-h-screen overflow-y-auto">
    <Table color="custom" hoverable={false} class="table w-full table-fixed">
        <TableHead class = "bg-gray-700 text-white">
        <TableHeadCell class="w-[10%]">Lead author</TableHeadCell>
        <TableHeadCell class="w-[10%]">Publication year</TableHeadCell>
        <TableHeadCell class="w-[60%]">Activity</TableHeadCell>
        <TableHeadCell class="w-[10%]">Rating</TableHeadCell>
        <TableHeadCell class="w-[10%]">Details</TableHeadCell>
        </TableHead>

        <TableBody class="bg-gray-50">
        {#each filteredBySubset as row, i}
            <TableBodyRow class="text-gray-800">
            <TableBodyCell class="whitespace-normal break-words max-w-md">
                <a
                    href={row.study_url}
                    class="inline-flex gap-1 cursor-pointer hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"    
                    >
                {row.study_author} <FontAwesomeIcon icon={faArrowUpRightFromSquare} class="w-5 h-5 opacity-70" />
                </a>
            </TableBodyCell>

            <TableBodyCell class="whitespace-normal break-all">
                {row.study_year}
            </TableBodyCell>

            <TableBodyCell class="whitespace-normal break-normal max-w-sm">
                {row.activity_script_v1_1}
            </TableBodyCell>

            <TableBodyCell class="whitespace-normal break-all max-w-sm">  
                
                    <div class="flex gap-1">
                        {#each Array(4) as _, i}
                        <StarSolid class={`h-5 w-5 ${i < row.rating_star ? 'text-yellow-400' : 'text-gray-300'}`}/>
                        {/each}
                    </div>

            </TableBodyCell>

            <TableBodyCell class="whitespace-normal break-all max-w-sm">

                    <Button    
                        onclick={() => {
                            if (row.extraInfo > 0) {
                                toggleRow(i);
                            }
                        }}
                        class="relative cursor-pointer bg-gray-800 hover:bg-gray-500
                                disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                        size="sm" 
                        disabled={row.extraInfo === 0} >
                        <InfoCircleSolid class="text-white dark:text-white" />
                        
                        <Indicator color="blue" border size="xl" placement="top-right" class="text-xs font-bold">
                            {row.extraInfo}
                        </Indicator>
                    </Button>

            </TableBodyCell> 

            </TableBodyRow>
            <!-- Here is the optionally expanding row -->
            {#if openRow === i} 
            <TableBodyRow class="text-gray-600">
                <TableBodyCell colspan="5" class="p-0"> 
                <!-- Expanded content goes here -->
                <Table class="w-full table-fixed" color="custom">

                    {#each studyDetails as item, i}

                        {#if row[item.variable] != null && row[item.variable] !== ''} 
                                <TableBodyRow class="align-top">
                                    <TableBodyCell class="w-[10%] uppercase text-xs"></TableBodyCell>
                                    <TableBodyCell class="w-[10%] uppercase text-xs">{item.label}</TableBodyCell>
                                    <TableBodyCell class="w-[60%] whitespace-normal break-normal max-w-sm">{row[item.variable]}</TableBodyCell>
                                    <TableBodyCell class="w-[20%] whitespace-normal break-normal max-w-sm"></TableBodyCell>
                                </TableBodyRow>

                        {/if}   

                    {/each}
                    
                </Table>
                </TableBodyCell>
            </TableBodyRow>
            {/if}  
        {/each}
        </TableBody>
    </Table> 
    </div>

</Modal>
