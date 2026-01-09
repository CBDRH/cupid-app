<script lang="ts">
  import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell
  } from "flowbite-svelte";

  import { filteredData } from "$lib/stores/filterStores";
  import { ArrowTopRightOnSquareIcon } from "heroicons-svelte/24/solid";


  let items = $state<{ reference: string; study_url: string }[]>([]);
  let total = $state(0)

  $effect(() => {
    items = $filteredData.map(({ reference, study_url }) => ({
      reference,
      study_url
    }));
    
    const data = $filteredData; // automatically reactive
    total = data.length;
  });

</script>

<div class="text-sm mb-3 font-semibold text-gray-700">
    Details of the {total} studies that match your search criteria:
</div>

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
            <ArrowTopRightOnSquareIcon class="w-4 h-4 opacity-70" />
          </a>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
