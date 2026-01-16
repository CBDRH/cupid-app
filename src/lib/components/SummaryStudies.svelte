<script>
  import { slide } from "svelte/transition";
  import { Tooltip } from "flowbite-svelte";
  import { filteredData } from "$lib/stores/filterStores";

  //   Reactive counts for each category
  let total = $state(0);
  let supportive = $state(0);
  let mixed = $state(0);
  let noImpact = $state(0);
  let values = $state([0, 0, 0]);
  let widths = $state([0, 0, 0]);
  
  
    // Whenever filteredData changes, update counts
  $effect(() => {
    const data = $filteredData; // automatically reactive
    total = data.length;

    supportive = data.filter(d => d.study_summary === 1).length;
    mixed = data.filter(d => d.study_summary === 2).length;
    noImpact = data.filter(d => d.study_summary == 3).length;

    values = [supportive, mixed, noImpact]

    // Compute widths in %
    widths = [100 * supportive / total, 100 * mixed / total, 100 * noImpact / total];
    

  });
  
  
  let colors = ["green-500", "orange-400", "red-500"];
  let text = ["green-100", "orange-100", "red-100"];
  let message = ["were supportive", "had mixed results", "had no impact"];
  let legend = [
    { color: "green-500", label: "Supportive", hoverColor: "green-900", tooltip: "The selected activity had a statistically significant positive impact on at least one outcome" },
    { color: "orange-400", label: "Mixed", hoverColor: "pink-600", tooltip: "The selected activity did not have a statistically significant positive impact on any outcome" },
    { color: "red-500", label: "No Impact", hoverColor: "red-900", tooltip: "The selected activity had a statistically significant negative impact on at least one outcome" },
  ];

  
</script>

<h2>Previous community-wide studies</h2>
<div class="text-sm mb-3">
    <p>{supportive} out of {total} studies showed support for this initiative</p>
</div>


<div class="flex w-[100%] m-auto h-8 rounded overflow-hidden border border-gray-300">
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
        {value} out of {total} eligible studies {message[i]}
      </Tooltip>

    </div>
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