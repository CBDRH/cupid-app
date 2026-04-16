<script lang="ts">
  import {
    Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, TableSearch
  } from "flowbite-svelte";
  import { filteredActivity, selectedLabel, selectedOption } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

  let total = $state(0)
  
  // Array of IDs (or indices) that are selected
  let selectedIds = $state([]);
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
    <Table color="custom" hoverable class="table w-full table-fixed">
        <TableHead class = "bg-gray-700 text-white">
        <TableHeadCell class="w-[10%]">Lead author</TableHeadCell>
        <TableHeadCell class="w-[10%]">Publication year</TableHeadCell>
        <TableHeadCell class="w-[70%]">Activity</TableHeadCell>
        <TableHeadCell class="w-[10%]">Rating</TableHeadCell>
        </TableHead>

        <TableBody>
        {#each filteredItems as row, i}
            <TableBodyRow 
            class={`
            ${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
            hover:bg-blue-50
            text-gray-700
            `}>
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
                {row.quality_rating}
            </TableBodyCell>

            </TableBodyRow>
        {/each}
        </TableBody>
    </Table>
    </div>
    </TableSearch>
</div>


