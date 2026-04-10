<script lang="ts">
  import {
    Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell,
    Checkbox, Button
  } from "flowbite-svelte";
  import { ClipboardCleanSolid, CheckOutline } from "flowbite-svelte-icons";
  import { filteredData } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowUpRightFromSquare, faSquareCheck, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

  let total = $state(0)
  
  // Array of IDs (or indices) that are selected
  let selectedIds = $state([]);
  let filteredRows = $state([]);

  function selectAllRows() {
    selectedIds = $filteredData.map(d => d.record_id);
  }

  function deselectAllRows() {
    selectedIds = [];
  }

  $effect(() => {
    filteredRows = $filteredData
      .filter(row => selectedIds.includes(row.record_id))   // first: keep only selected rows
      .map(row => row.reference);                           // then: pick the `reference` property
  });

  $effect(() => {
    const data = $filteredData; // automatically reactive
    total = data.length;
  });

    // Reactive state for button
  let copied = $state(false);

  // Copy function
  function copyToClipboard() {
    const text = filteredRows.join("\n\n"); // join array into one string
    navigator.clipboard.writeText(text).then(() => {
      copied = true;

      // Reset after 5 seconds
      setTimeout(() => copied = false, 1000);
    });
  }

</script>

<h2>
  Details of the {total} studies that match your search criteria:
</h2>

<div class="text-sm mb-3 text-gray-700">
    This table shows all studies that matched your search criteria. If you want to copy the fully citation to your clipboard you can tick the checkbox next to studies of interest then click on copy.
</div>

<div class="flex flex-row gap-2 mb-2">
    <Button class="w-42 gap-2 cursor-pointer" size = "sm" color="alternative" onclick={() => (selectAllRows())}>
      <FontAwesomeIcon icon={faSquareCheck} />
      Select all
    </Button>

    <Button class="w-42 gap-2 cursor-pointer" color="alternative" onclick={() => (deselectAllRows())}>
      <FontAwesomeIcon icon={faSquareMinus}  />
      Deselect all
    </Button>

    <Button
      class="w-42 gap-2 cursor-pointer" 
      color="alternative"
      onclick={copyToClipboard}
      disabled={filteredRows.length === 0}
    >
      {#if copied}
        <CheckOutline /> Copied!
      {:else}
        <ClipboardCleanSolid /> Copy
      {/if}
    </Button>

</div>

<div class="max-h-screen overflow-y-auto">
  <Table hoverable class="table w-full text-xs">
    <TableHead>
      <TableHeadCell>Cite</TableHeadCell>
      <TableHeadCell>Reference</TableHeadCell>
      <TableHeadCell>Study URL</TableHeadCell>
    </TableHead>

    <TableBody>
      {#each $filteredData as row}
        <TableBodyRow>

          <TableBodyCell class="whitespace-normal break-words max-w-md">
            <Checkbox bind:group={selectedIds} value={row.record_id}  />
          </TableBodyCell>

          <TableBodyCell class="whitespace-normal break-words max-w-md">
            {row.reference}
          </TableBodyCell>

          <TableBodyCell class="whitespace-normal break-all max-w-sm">
            <a
              href={row.study_url}
              class="inline-flex gap-1 underline hover:text-blue-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              {row.study_url}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} class="w-5 h-5 opacity-70" />
            </a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>



