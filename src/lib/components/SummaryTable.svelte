<script lang="ts">
  import {
    Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, TableSearch,
     Indicator, Button
  } from "flowbite-svelte";
  import { filteredActivity, selectedLabel, selectedOption } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
  import { InfoCircleSolid, StarSolid } from "flowbite-svelte-icons";
  import { studyDetails } from "$lib/constants/studyDetails.js";

  let total = $state(0)
  

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
</script>

<div class="mt-12">
    <h2 class="mb-4">
    Details of the {total} studies that evaluated the impact of 
    <span class="font-semibold text-xs rounded-lg p-2 text-gray-50 bg-gray-700 uppercase tracking-wide">
        {$selectedLabel}: {$selectedOption}
    </span>
    </h2>

    
    <TableSearch placeholder="Search by study title or authors" hoverable bind:inputValue={searchTerm}>
    <div class="max-h-screen overflow-y-auto">
    <Table color="custom" hoverable={false} class="table w-full table-fixed">
        <TableHead class = "bg-gray-700 text-white">
        <TableHeadCell class="w-[10%]">Lead author</TableHeadCell>
        <TableHeadCell class="w-[10%]">Publication year</TableHeadCell>
        <TableHeadCell class="w-[60%]">Activity</TableHeadCell>
        <TableHeadCell class="w-[10%]">Rating</TableHeadCell>
        <TableHeadCell class="w-[10%]">Details</TableHeadCell>
        </TableHead>

        <TableBody>
        {#each filteredItems as row, i}
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

                <!-- <Table class="w-full table-fixed" color="custom" hoverable={false}>
                    <TableHead>
                    <TableHeadCell>Facilitators</TableHeadCell>
                    <TableHeadCell>Barriers</TableHeadCell>
                    <TableHeadCell>Risks</TableHeadCell>
                    <TableHeadCell>Participation</TableHeadCell>
                    <TableHeadCell>Satisfaction</TableHeadCell>
                    </TableHead>
                    <TableBody>
                    <TableBodyRow>
                        <TableBodyCell class="whitespace-normal break-normal max-w-sm">{row.facilitators_v1_1_v2}</TableBodyCell>
                        <TableBodyCell class="whitespace-normal break-normal max-w-sm">{row.barriers_v1_1_v2}</TableBodyCell>
                        <TableBodyCell class="whitespace-normal break-normal max-w-sm">{row.risks_v1_1_v2}</TableBodyCell>
                        <TableBodyCell class="whitespace-normal break-normal max-w-sm">{row.participation_v1_1_v2}</TableBodyCell>
                        <TableBodyCell class="whitespace-normal break-normal max-w-sm">{row.satistfaction_v1_1_v2}</TableBodyCell>
                    </TableBodyRow>
                    </TableBody>
                </Table> -->
                </TableBodyCell>
            </TableBodyRow>
            {/if}
        {/each}
        </TableBody>
    </Table>
    </div>
    </TableSearch>
</div>


