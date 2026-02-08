<script>
  import { slide } from "svelte/transition";
  import { Tooltip } from "flowbite-svelte";
  import { filteredData } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faWineBottle, faSmoking, faCannabis, faPills } from "@fortawesome/free-solid-svg-icons";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { classifyEvidence } from "$lib/utils/classifyEvidence";
  import { evidenceLevels } from "$lib/constants/evidenceLevels";


  //   Reactive counts for each category
  let alcoholFor = $state(0);
  let alcoholAgainst = $state(0);
  let nicotineFor = $state(0);
  let nicotineAgainst = $state(0);
  let cannabisFor = $state(0);
  let cannabisAgainst = $state(0);
  let illicitFor = $state(0);
  let illicitAgainst = $state(0);

  // Update evidence based on filtered studies
  $effect(() => {
    alcoholFor = $filteredData.map(d => d.alcohol_summary).filter(d => d != null && d == 1 || d == 2).length;
    alcoholAgainst = $filteredData.map(d => d.alcohol_summary).filter(d => d != null && d >= 3).length;
    nicotineFor = $filteredData.map(d => d.nicotine_summary).filter(d => d != null && d == 1 || d == 2).length;
    nicotineAgainst = $filteredData.map(d => d.nicotine_summary).filter(d => d != null && d >= 3).length;
    cannabisFor = $filteredData.map(d => d.cannabis_summary).filter(d => d != null && d == 1 || d == 2).length;
    cannabisAgainst = $filteredData.map(d => d.cannabis_summary).filter(d => d != null && d >= 3).length;
    illicitFor = $filteredData.map(d => d.illicit_summary).filter(d => d != null && d == 1 || d == 2).length;
    illicitAgainst = $filteredData.map(d => d.illicit_summary).filter(d => d != null && d >= 3).length;
  })

  //   Reactive summary for each drug type
  let alcoholSummary = $state(0);
  let nicotineSummary = $state(0);
  let cannabisSummary = $state(0);
  let illicitSummary = $state(0);
  let summaryArray = $state([0, 0, 0, 0])

  $effect(() => {
    alcoholSummary = classifyEvidence(alcoholFor, alcoholAgainst);
    nicotineSummary = classifyEvidence(nicotineFor, nicotineAgainst);
    cannabisSummary = classifyEvidence(cannabisFor, cannabisAgainst);
    illicitSummary = classifyEvidence(illicitFor, illicitAgainst);
    summaryArray = [alcoholSummary, nicotineSummary, cannabisSummary, illicitSummary]
  })

  const cards = [
    { key: "alcohol", label: "ALCOHOL", icon: faWineBottle},
    { key: "nicotine", label: "NICOTINE", icon: faSmoking},
    { key: "cannabis", label: "CANNABIS", icon: faCannabis},
    { key: "illicit", label: "ILLICIT DRUGS", icon: faPills},
  ];

</script>

<h2>
  <span>Potential Impact</span>
  <span class="text-sm font-normal ml-2">

  </span>
</h2>


<div class="flex flex-row gap-4"> 
    {#each cards as card, i} 
    
    <div class={`flex flex-col flex-1 rounded-xl shadow w-64 h-40 p-4 mt-3 relative ${evidenceLevels[summaryArray[i]].bgColor} transition-colors duration-300`}> 
    
    <!-- Box title and info icon -->
    <label class="my-2 flex items-baseline gap-1">
      <h3 class={`text-4xl ${evidenceLevels[summaryArray[i]].textColor} text-left`}>
          {evidenceLevels[summaryArray[i]].label}
        </h3>
      <InfoCircleSolid class={`${evidenceLevels[summaryArray[i]].textColor} hover:text-gray-600 cursor-pointer`}/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          {@html evidenceLevels[summaryArray[i]].hoverMessage}
        </div>
      </Tooltip>
    </label>

      <!-- Background icon -->
      <FontAwesomeIcon
        icon={card.icon}
        style="width: 5rem; height: 5rem"
        class={`absolute right-3 bottom-5 ${evidenceLevels[summaryArray[i]].textColor} pointer-events-none`}
      /> 

      <!-- Footer -->
      <p class={`mt-auto text-lg ${evidenceLevels[summaryArray[i]].labelColor} text-left font-semibold`}>
        {card.label}
      </p> 

    </div>
    {/each}
</div>    


