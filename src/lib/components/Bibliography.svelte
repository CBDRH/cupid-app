<script lang="ts">
  import {
    Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, TableSearch,
     Indicator, Button, Popover, Clipboard } from "flowbite-svelte";
  import { activityStore } from '$lib/stores/dataStore';
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
  import { InfoCircleSolid, StarSolid, QuoteSolid, CheckOutline, ClipboardCleanSolid } from "flowbite-svelte-icons";
  import { studyDetails } from "$lib/constants/studyDetails.js";
  import { impactLevels } from "$lib/constants/impactLevels";
  import { impactCodes } from "$lib/constants/impactLevels.js";
  import { outcomes } from "$lib/constants/outcomeLevels.js";


  let total = $state(0)
  let success = $state(false);


  // Handles clickable row in table
  let openRow: number | null | undefined = $state();

  const toggleRow = (i: number) => {
    openRow = openRow === i ? null : i;
  };

  // Handles text table search 
  let selectedIds = $state([]); // Array of IDs (or indices) that are selected
  let filteredRows = $state([]);

  $effect(() => {
    filteredRows = $activityStore
      .filter(row => selectedIds.includes(row.record_id))   // first: keep only selected rows
      .map(row => row.reference);                           // then: pick the `reference` property
  });

  $effect(() => {
    const data = $activityStore; // automatically reactive
    total = data.length;
  });

    let searchTerm = $state("");
    let filteredItems = $derived.by(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) return $activityStore;

        return $activityStore.filter((study) =>
            Object.values(study).some((value) =>
                String(value ?? "").toLowerCase().includes(query)
            )
        );
    });
    const pageSize = 50;
    let currentPage = $state(1);
    let totalPages = $derived(Math.max(1, Math.ceil(filteredItems.length / pageSize)));
    let visiblePage = $derived(Math.min(currentPage, totalPages));
    let pageStart = $derived((visiblePage - 1) * pageSize);
    let paginatedItems = $derived(filteredItems.slice(pageStart, pageStart + pageSize));

    $effect(() => {
        searchTerm;
        currentPage = 1;
    });
</script>

    <div class="mt-12">
        <h2 class="mb-4">
            Details of the {total} activities included in CUPID
        </h2>

    
    <div class="max-h-screen mb-16">
    <div class="mb-4 flex items-center justify-between gap-4 text-sm text-gray-600">
        <span>
            Showing {filteredItems.length ? pageStart + 1 : 0}-{Math.min(pageStart + pageSize, filteredItems.length)} of {filteredItems.length}
        </span>
        <div class="flex items-center gap-2">
            <button
                type="button"
                class="rounded border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={visiblePage === 1}
                onclick={() => currentPage = Math.max(1, visiblePage - 1)}
            >
                Previous
            </button>
            <span>Page {visiblePage} of {totalPages}</span>
            <button
                type="button"
                class="rounded border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={visiblePage === totalPages}
                onclick={() => currentPage = Math.min(totalPages, visiblePage + 1)}
            >
                Next
            </button>
        </div>
    </div>
    <TableSearch placeholder="Search by study title or authors" hoverable bind:inputValue={searchTerm}>
    <Table color="custom" hoverable={false} class="table w-full table-fixed mb-18">
        <TableHead class = "bg-gray-700 text-white">
        <TableHeadCell class="w-[15%]">Study</TableHeadCell>
        <TableHeadCell class="w-[5%]">Cite</TableHeadCell>
        <TableHeadCell class="w-[50%]">Activity</TableHeadCell>
        <TableHeadCell class="w-[10%]">Outcomes</TableHeadCell>
        <TableHeadCell class="w-[10%]">Rating</TableHeadCell>
        <TableHeadCell class="w-[10%]">Details</TableHeadCell>
        </TableHead>

        <TableBody>
        {#each paginatedItems as row, i}

        {@const count = outcomes.filter(o => row[o.variable] == 1).length}

            <TableBodyRow class="text-gray-800 align-top">
            <TableBodyCell class="whitespace-normal break-words max-w-md">
                <a
                    href={row.study_url}
                    class="inline-flex gap-1 cursor-pointer hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"    
                    >
                <span class="text-left">{row.study_author} <span class="!italic">et al</span> ({row.study_year})</span> <FontAwesomeIcon icon={faArrowUpRightFromSquare} class="w-5 h-5 opacity-70" />
                </a>
            </TableBodyCell>

            <!-- Cite -->
            <TableBodyCell>
                <!-- Quotation mark that shows the study reference on hover -->
                <QuoteSolid />
                <Popover
                    class="whitespace-normal break-words max-w-sm"
                    title="Study Reference">
                    
                    <div class="flex flex-col">
                    
                        <div>
                            <a
                                href={row.study_url}
                                class="inline-flex gap-1 cursor-pointer hover:underline"
                                target="_blank"
                                rel="noopener noreferrer">
                                <span>
                                    {row.reference}
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} class="inline w-5 h-5 opacity-70" />
                                </span>
                            </a>
                        </div>

                        <Clipboard
                            value={row.reference}
                            bind:success
                            size="xs"
                            class="mt-2 w-[40%] bg-slate-600 cursor-pointer"
                            >
                            {#if success}
                                <CheckOutline class="w-4 h-4" /> Copied
                            {:else}
                                <ClipboardCleanSolid class="w-4 h-4" /> Copy Reference
                            {/if}
                        </Clipboard>

                    </div>
                </Popover>

            </TableBodyCell>

            <!-- The actual activity -->
            <TableBodyCell class="whitespace-normal break-normal max-w-sm">
                {row.activity_script_v1_1}

                <!-- Here are the impact tags -->
                <div class="flex flex-row gap-2 mt-1">
                    {#each impactLevels as item}
                    {#if row[item.variable] != null && row[item.variable] !== ''}
                        <span class={`text-xs capitalize rounded-full px-2 py-1 cursor-help ${impactCodes[Number(row[item.variable]) - 1]?.bgColor} ${impactCodes[Number(row[item.variable]) - 1]?.textColor}`}>
                            <FontAwesomeIcon icon={item.icon} class="w-5 h-5 opacity-70" /> 
                            {item.outcome}
                            <FontAwesomeIcon icon={impactCodes[Number(row[item.variable]) - 1]?.icon} class="w-5 h-5 opacity-70" /> 
                        </span>
                        <Popover
                        class="w-64 text-md font-light border-2 !border-slate-600 "
                        title={`${row.study_author} et al (${row.study_year})`}
                        >
                        <FontAwesomeIcon icon={item.icon} class="w-5 h-5 opacity-70" /> 
                        <span class="italic">
                            Activities that targeted <span class="lowercase font-semibold">{item.drug}</span> were found to have a <span class="lowercase font-semibold">{impactCodes[Number(row[item.variable]) - 1]?.impact}</span> impact on {item.outcome} outcomes in this study.
                        </span>
                        </Popover>
                    {/if}
                    {/each}
                </div>
                            
            </TableBodyCell>
            
            <!-- The hoverable button that shows the number of outcomes -->
            <TableBodyCell class="whitespace-normal break-all max-w-sm">
                <Button    
                    class="relative cursor-pointer bg-slate-600 hover:bg-slate-800"
                    size="sm">
                    <InfoCircleSolid class="text-white dark:text-white" />
                    
                    <Indicator color="blue" border size="xl" placement="top-right" class="text-xs font-bold">
                        {count}
                    </Indicator>

                </Button>
                    <Popover
                        class="w-216 text-sm font-light border-2 !border-slate-600 "
                        title={`${row.study_author} et al (${row.study_year}): Study Outcomes`}
                        >

                    <!-- Table of outcomes examined -->
                    <Table color="custom" hoverable={true} class="table w-full table-fixed">
                        <TableHead class = "bg-slate-600 text-slate-100 hover:text-slate-800">
                            <TableHeadCell class="w-[20%]">Outcome Type</TableHeadCell>
                            <TableHeadCell class="w-[20%]">Target Drug</TableHeadCell>
                            <TableHeadCell class="w-[60%]">Description</TableHeadCell>
                        </TableHead>
                        <TableBody>
                            {#each outcomes as outcome, i}
                            {#if row[outcome.variable] === 1}
                                <TableBodyRow class="text-slate-300 hover:text-slate-800 align-top">

                                    <TableBodyCell class="whitespace-normal break-words max-w-md capitalize py-1">
                                    {outcome.outcome}
                                    </TableBodyCell>
                                    
                                    <TableBodyCell class="whitespace-normal break-words max-w-md capitalize py-1">
                                    {outcome.drug}
                                    </TableBodyCell>
                                    
                                    <TableBodyCell class="whitespace-normal break-words max-w-md py-1">
                                    {outcome.definition}
                                    </TableBodyCell>

                                </TableBodyRow>
                                {/if}
                            {/each}
                        </TableBody>
                    </Table> 

                    </Popover>
            </TableBodyCell>      

            <!-- Star Rating -->
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
                                disabled:bg-gray-500 disabled:cursor-not-allowed"
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
                            <!-- <div class=""> -->
                                <TableBodyRow class="align-top">
                                    <TableBodyCell class="w-[10%] uppercase text-xs"></TableBodyCell>
                                    <TableBodyCell class="w-[10%] uppercase text-xs">{item.label}</TableBodyCell>
                                    <TableBodyCell class="w-[60%] whitespace-normal break-normal max-w-sm">{row[item.variable]}</TableBodyCell>
                                    <TableBodyCell class="w-[20%] whitespace-normal break-normal max-w-sm"></TableBodyCell>
                                </TableBodyRow>
                            <!-- </div> -->

                        {/if}   

                    {/each}
                    
                </Table>
                </TableBodyCell>
            </TableBodyRow>
            {/if}
        {/each}
        </TableBody>
    </Table>

    </TableSearch>
   </div> 
</div>


