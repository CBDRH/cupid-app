<script>
  import { slide } from "svelte/transition";
  import { Tooltip, Modal } from "flowbite-svelte";
  import { filteredData, selectedOption, filteredActivity } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
  import { InfoCircleSolid } from "flowbite-svelte-icons";

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

let filteredBySubset = $derived( // The subset of the filtered data that matche th users click
  $filteredData.filter(study => study.study_summary === subset)
);




  
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

<h2 class="flex gap-1 items-baseline ">
  Evidence from previous community-wide studies
    <InfoCircleSolid class="hover:text-gray-600 cursor-pointer"/>
      <Tooltip placement="right" type="light" transition={slide}>
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
      {#each filteredBySubset as study, i}
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

                {#if col.key === "study_author"}
                  <a
                    href={study.study_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline"
                  >
                    {study[col.key] ?? "—"} 
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} class="w-5 h-5 opacity-70" />
                  </a>
                {:else}
                {study[col.key] ?? "—"}
                {/if}
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>

  </table>
</div>

</Modal>
