<script lang="ts">
  import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell
  } from "flowbite-svelte";

  import { dataStore } from "$lib/stores/dataStore";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";


  let items = $state<{ reference: string; study_url: string }[]>([]);
  let total = $state(0)
  
  $effect(() => {
    // unwrap store with $dataStore
    items = $dataStore.map(({ reference, study_url }) => ({
      reference,
      study_url
    }));

    const data = $dataStore; // automatically reactive
    total = data.length; 
  });
</script>

<h2>
    Details of the {total} studies included in the CUPID study
</h2>

<div class="text-sm mb-3 text-gray-700">
    This table lists all of the studies that are included in CUPID.
</div>

<div class="max-h-screen overflow-y-auto">
  <Table hoverable class="table-fixed w-full text-xs">
    <TableHead>
      <TableHeadCell>Reference</TableHeadCell>
      <TableHeadCell>Study URL</TableHeadCell>
    </TableHead>

    <TableBody>
      {#each items as row}
        <TableBodyRow>

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