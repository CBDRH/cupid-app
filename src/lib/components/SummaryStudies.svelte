<script>
  import { slide, fly } from "svelte/transition";
  import { Tooltip, Modal, Card } from "flowbite-svelte";
  import { FilePdfSolid } from "flowbite-svelte-icons";
  import { filteredData, selectedOption, filteredActivity } from "$lib/stores/filterStores";
  import {
    Table, TableHead, TableHeadCell,
    TableBody, TableBodyRow, TableBodyCell
  } from "flowbite-svelte";

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

  
  let colors = ["green-500", "orange-400", "red-500"];
  let text = ["green-100", "orange-100", "red-100"];
  let message = ["had a positive impact", "had no impact", "had a negative impact"];
  let legend = [
    { color: "green-500", label: "Positive impact", hoverColor: "green-900", tooltip: "The selected activity had a statistically significant positive impact on at least one outcome" },
    { color: "orange-400", label: "No impact", hoverColor: "pink-600", tooltip: "The selected activity did not have a statistically significant positive impact on any outcome" },
    { color: "red-500", label: "Negative impact", hoverColor: "red-900", tooltip: "The selected activity had a statistically significant negative impact on at least one outcome" },
  ];

// Whenever selected activy changes update
let numActivities = $state(null);

$effect(() => {
  const data = $filteredActivity;
  numActivities = data.length
})

// Columns of the data
const columns = [
  { key: "study_author", label: "Author", width: "100px"  },
  { key: "study_year", label: "Year", width: "100px"  },
  { key: "activity_script_v1_1", label: "Activity", width: "max-w-[140px]"  },
  { key: "facilitators_v1_1_v2", label: "Facilitators", width: "max-w-[140px]"  },
  { key: "barriers_v1_1_v2", label: "Barriers", width: "max-w-[140px]"  },
  { key: "risks_v1_1_v2", label: "Risks", width: "max-w-[140px]"  },
  { key: "participation_v1_1_v2", label: "Participation", width: "max-w-[140px]"  },
  { key: "satisfaction_v1_1_v2", label: "Satisfaction", width: "max-w-[140px]"  }
];


let expandedRows = $state(new Set());

function toggleRow(index) {
  if (expandedRows.has(index)) {
    expandedRows.delete(index);
  } else {
    expandedRows.add(index);
  }
  // Trigger Svelte update
  expandedRows = new Set(expandedRows);
}



</script>

<!-- <pre>{JSON.stringify($filteredActivity.slice(0, 5), null, 2)}</pre> -->

<h2>Previous community-wide studies</h2>

<div class="text-sm mb-3">
    <p>{positive} out of {total} studies showed support for this initiative</p>
</div>

<button 
  class="flex w-[100%] m-auto h-8 rounded overflow-hidden border border-gray-300 cursor-pointer"
  onclick={() => studyModal = !studyModal}>
  {#each values as value, i}
    <div 
      class={`h-full flex items-center justify-center cursor-pointer text-${text[i]} font-bold bg-${colors[i]}`}
      style="width: {widths[i]}%">

      <!-- Trigger element must wrap the part you want hover on -->
      <div id={"segment-" + i} class="w-full h-full flex items-center justify-center">
        {value}
      </div>

      <!-- Must be placed right after the trigger -->
      <Tooltip type="light" transition={slide}
        triggeredBy={"#segment-" + i}
        placement="top"
        class="max-w-sm font-normal leading-relaxed whitespace-normal"
      >
        {value} out of {total} eligible studies {message[i]}<br><span class="text-gray-400">Click bar for more</span>
      </Tooltip>

    </div>
  {/each}
  </button>

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
    Activity summary:{$selectedOption} ({numActivities} Studies)
  </h3>


<div class="max-h-[60vh] overflow-y-auto">
  <table class="w-full text-sm table-fixed border-collapse">
    <!-- Column widths -->
    <colgroup>
      {#each columns as col}
        <col style={`width: ${col.width}`} />
      {/each}
    </colgroup>

    <!-- Header -->
    <thead class="bg-gray-50 sticky top-0">
      <tr>
        {#each columns as col}
          <th class="px-3 py-2 text-left font-medium text-blue-950">
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>

    <!-- Body -->
    <tbody>
      {#each $filteredActivity as study, i}
        <tr
          class="border-t hover:bg-gray-50 hover:text-blue-950 transition-colors cursor-pointer"
          onclick={() => toggleRow(i)}
        >
          {#each columns as col}
            <td class="px-3 py-2 align-top">
              <div
                class={`overflow-hidden transition-all duration-300 ${
                  expandedRows.has(i) ? "max-h-[1000px]" : "max-h-[9rem]"
                } whitespace-normal break-words`}
              >
                {study[col.key] ?? "—"}
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>

  </table>
</div>

</Modal>
