<script>
  import { slide } from "svelte/transition";
  import { Tooltip } from "flowbite-svelte";
  import { filteredData } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faWineBottle, faSmoking, faCannabis, faPills, faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";
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
  let unspecifiedFor = $state(0);
  let unspecifiedAgainst = $state(0);
  let drugInfo = [
    "<b>Alcohol</b> includes all types of standard alcoholic beverages",
    "<b>Nicotene</b> includes cigarattes, smokeless tobacco, vapes, and second-hand smoke",
    "<b>Cannabis</b> includes smoked cannabis, vaporised cannabis, and edibles",
    "<b>Illicit drugs</b> includes methamphetamines, cocaine, inhalents, opioids, performance enhancers, hallucinogens, depressants and phamaceuticals (used outside of prescription)",
    "<b>Unspecified</b> includes studies where the target substance was general or unspecified"
  ]

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
    unspecifiedFor = $filteredData.map(d => d.unspecified_summary).filter(d => d != null && d == 1 || d == 2).length;
    unspecifiedAgainst = $filteredData.map(d => d.unspecified_summary).filter(d => d != null && d >= 3).length;
  })

  //   Reactive summary for each drug type
  let alcoholSummary = $state(0);
  let nicotineSummary = $state(0);
  let cannabisSummary = $state(0);
  let illicitSummary = $state(0);
  let unspecifiedSummary = $state(0);
  let summaryArray = $state([0, 0, 0, 0, 0])

  $effect(() => {
    alcoholSummary = classifyEvidence(alcoholFor, alcoholAgainst);
    nicotineSummary = classifyEvidence(nicotineFor, nicotineAgainst);
    cannabisSummary = classifyEvidence(cannabisFor, cannabisAgainst);
    illicitSummary = classifyEvidence(illicitFor, illicitAgainst);
    unspecifiedSummary = classifyEvidence(unspecifiedFor, unspecifiedAgainst);
    summaryArray = [alcoholSummary, nicotineSummary, cannabisSummary, illicitSummary, unspecifiedSummary]
  })

  const cards = [
    { key: "alcohol", label: "ALCOHOL", icon: faWineBottle},
    { key: "nicotine", label: "NICOTINE", icon: faSmoking},
    { key: "cannabis", label: "CANNABIS", icon: faCannabis},
    { key: "illicit", label: "ILLICIT DRUGS", icon: faPills},
    { key: "unspecified", label: "UNSPECIFIED DRUGS", icon: faPrescriptionBottle}
  ];

// This controls the information revealed in the info box for the potential impact on specific drugs
let infoReveal = $state(""); 

</script>

<div class="mt-6">

<h2 class="flex gap-1 items-baseline ">
  Potential impact on specific drugs

    <div class="relative inline-block group">
      <InfoCircleSolid class="hover:text-gray-600 cursor-pointer"/>
        <Tooltip placement="right" type="light" transition={slide} trigger="hover" class="shadow-lg border border-blue-950" 
                onclose={() => infoReveal = null}>

          <div class="max-w-sm font-normal leading-relaxed whitespace-normal pointer-events-auto ">
            <h2>Interpreting the impact on specific drugs</h2>
              <div class="flex gap-2">

                {#each cards as card, i}
                  <div class={`flex flex-col flex-1 rounded-l shadow w-12 h-8 p-4 items-center justify-center ${evidenceLevels[summaryArray[i]].bgColor}`}>
                    {#key summaryArray[i]}
                      <FontAwesomeIcon
                        icon={card.icon}
                        style="width: 1rem; height: 1rem"
                        class={`${evidenceLevels[summaryArray[i]].textColor} pointer-events-none`}
                      />
                      {/key}   
                  </div>
                {/each}
              </div>
              

          <div class="w-64 px-1 py-2">
            For each substance category, we aggregate the evidence for all the studies 
            that meet your search criteria to assign an overall potential impact from
            <span class="bg-green-500 text-green-50 text-xs font-bold px-2 py-1 rounded">Likely</span> to 
            <span class="bg-red-500 text-red-50 text-xs font-bold px-2 py-1 rounded">Warning</span>
          </div>

          <div class="w-64 px-1 py-2 bg-green-50 text-green-700">
            Click on the buttons below to learn more about each definition
          </div>

            <div class = "overflow-y-auto">
              
            {#each [...evidenceLevels].reverse() as level, i}
              <button
                class={`flex flex-wrap mx-auto w-64 my-2 border rounded cursor-pointer
                        ${level.textColor} ${level.bgColor}`}
                onclick={() =>
                  infoReveal = infoReveal === level.label ? null : level.label
                }
              >
                  <!-- Fixed-width icon column -->
                  <span class="flex flex-column gap-2 ml-3">
                    <InfoCircleSolid />
                    {level.label}
                  </span>
              </button>
                
                {#if infoReveal === level.label}
                  <div class="mx-auto w-64 my-2 text-gray-600 bg-gray-50 p-1 rounded cursor-pointer">
                    {@html level.hoverMessage}
                  </div>
                {/if}
            {/each}
            
            </div>
          </div>  
        </Tooltip>  
      </div>
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
        {#key summaryArray[i]}
          <FontAwesomeIcon
            icon={card.icon}
            style="width: 3rem; height: 3rem"
            class={`absolute right-3 bottom-5 ${evidenceLevels[summaryArray[i]].textColor} pointer-events-none`}
          />
        {/key}

        <!-- Footer -->
        <span class={`inline-flex gap-1 mt-auto text-lg ${evidenceLevels[summaryArray[i]].labelColor} text-left text-sm font-normal font-semibold`}>
            {card.label}
            <InfoCircleSolid class={`${evidenceLevels[summaryArray[i]].textColor} hover:text-gray-600 cursor-pointer`}/>
            <Tooltip placement="right" type="light" transition={slide}>
            <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
              {@html drugInfo[i]}
            </div>
          </Tooltip>
        </span>

      </div>
      {/each}
  </div>    
</div>

