<script>
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

    supportive = data.filter(d => d.setting === "Schools").length;
    mixed = data.filter(d => d.setting === "Medium community").length;
    noImpact = data.filter(d => d.setting != "Schools" && d.setting != "Medium community").length;

    values = [supportive, mixed, noImpact]

    // Compute widths in %
    widths = [100 * supportive / total, 100 * mixed / total, 100 * noImpact / total];
    

  });
  
  
  let colors = ["green-500", "orange-400", "red-500"];
  let text = ["green-100", "orange-100", "red-100"];
  let message = ["were supportive", "had mixed results", "had no impact"];
  let legend = [
    { color: "green-500", label: "Supportive" },
    { color: "orange-400", label: "Mixed" },
    { color: "red-500", label: "No Impact" },
  ];

  
</script>

<h2>Previous community-wide studies</h2>
<div class="text-sm mb-3">
    <p>{supportive} out of {total} studies showed support for this initiative</p>
</div>


<div class="flex w-[95%] m-auto h-8 rounded overflow-hidden border border-gray-300">
  {#each values as value, i}
    <div 
      class={`h-full flex items-center justify-center cursor-pointer text-${text[i]} font-bold bg-${colors[i]}`}
      style="width: {widths[i]}%">

      <!-- Trigger element must wrap the part you want hover on -->
      <div id={"segment-" + i} class="w-full h-full flex items-center justify-center">
        {value}
      </div>

      <!-- Must be placed right after the trigger -->
      <Tooltip
        triggeredBy={"#segment-" + i}
        placement="top"
        class="bg-gray-800 text-white text-sm px-2 py-1 rounded"
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
      <div class={`w-4 h-4 bg-${item.color} rounded-sm`}></div>
      <!-- Label -->
      <span class="text-gray-700 text-sm">{item.label}</span>
    </div>
  {/each}
</div>