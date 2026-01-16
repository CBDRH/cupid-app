<script>
  import { slide } from "svelte/transition";
  import { Tooltip } from "flowbite-svelte";
  import { filteredData } from "$lib/stores/filterStores";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faWineBottle, faSmoking, faCannabis, faPills } from "@fortawesome/free-solid-svg-icons";
  import { InfoCircleSolid } from "flowbite-svelte-icons";


  //   Reactive counts for each category
  let alcoholFor = $state(0);
  let alcoholAgainst = $state(0);
  let nicotineFor = $state(0);
  let nicotineAgainst = $state(0);
  let cannabisFor = $state(0);
  let cannabisAgainst = $state(0);
  let illicitFor = $state(0);
  let illicitAgainst = $state(0);

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

export function classifyEvidence(forValue, againstValue) {

  const total = forValue + againstValue

  // Case 0: no studies
  if (total === 0) return 0;

  // Case 1: 1–2 studies
  if (total === 1 || total === 2) return 1;

  // Cases according to thresholds
  const ratio = forValue / againstValue
  if (forValue === 0) return 2;                          // no positive/mixed
  if (ratio > 0 && ratio < 0.85) return 3;               // <46% positive/mixed
  if (ratio >= 0.85 && ratio <= 1.5) return 4;           // ~50% positive/mixed
  if (ratio > 1.5 && ratio < 2) return 5;                // ≥60% positive/mixed
  if (ratio >= 2) return 6;  
  
  // fallback
  return 0;
}
 
  //   Reactive codes for each drug type
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

  const label = ["Unknown", "Limited", "Warning", "Unlikely", "Potential", "Probable", "Likely"];
  const colors = ["bg-gray-50", "bg-gray-100", "bg-red-500", "bg-orange-500", "bg-yellow-300", "bg-green-200", "bg-green-500"];
  const textColors = ["text-gray-300", "text-gray-500", "text-red-100", "text-orange-100", "text-yellow-700", "text-green-500", "text-green-50"];
  const labelColors = ["text-gray-200", "text-gray-400", "text-red-300", "text-orange-300", "text-yellow-50", "text-green-50", "text-green-100"];
  const hoverMessage = [
    "<b>Unknown</b> No studies that met your search criteria have evaluated this activity",
    "<b>Limited</b> Only one or two studies that met your search criteria have evaluated this activity",
    "<b>Warning</b> At least three studies that met your search criteria have evaluated this activity but no studies have reported a positive or mixed impact on outcomes ",
    "<b>Unlikely</b> At least three studies that met your search criteria have evaluated this activity and at least one study but less than half of these studies (less than 46%) report a positive or mixed impact on outcomes (a ratio greater than 0 but less than 0.85:1)",
    "<b>Potential</b> At least three studies that met your search criteria have evaluated this activity and approximately half of these studies (between 45.9% to 59.9%) report a positive or mixed impact on outcomes (a ratio between 0.85:1 and 1.5:1)",
    "<b>Probable</b> At least three studies that met your search criteria have evaluated this activity and most studies (at least 60%) report a positive or mixed impact on outcomes (a ratio between 1.5:1 and 2:1)",
    "<b>Likely</b> At least three studies that met your search criteria have evaluated this activity and a ratio of at least two to one of these studies report a positive or mixed impact on outcomes (it is at least twice as likely that a study will support this activity)",
  ]


</script>

<h2>
  <span>Potential Impact</span>
  <span class="text-sm font-normal ml-2">

  </span>
</h2>


<div class="flex flex-row gap-4"> 
    {#each cards as card, i} 
    
    <div class={`flex flex-col flex-1 rounded-xl shadow w-64 h-40 p-4 mt-3 relative ${colors[summaryArray[i]]} transition-colors duration-300`}> 
    
    <!-- Box title and info icon -->
    <label class="my-2 flex items-baseline gap-1">
      <h3 class={`text-4xl ${textColors[summaryArray[i]]} text-left`}>
          {label[summaryArray[i]]}
        </h3>
      <InfoCircleSolid class={`${textColors[summaryArray[i]]} hover:text-gray-600 cursor-pointer`}/>
      <Tooltip placement="right" type="light" transition={slide}>
        <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
          {@html hoverMessage[summaryArray[i]]}
        </div>
      </Tooltip>
    </label>

      <!-- Background icon -->
      <FontAwesomeIcon
        icon={card.icon}
        class={`absolute right-3 bottom-5 text-7xl ${textColors[summaryArray[i]]} pointer-events-none`}
      /> 

      <!-- Footer -->
      <p class={`mt-auto text-lg ${labelColors[summaryArray[i]]} text-left font-semibold`}>
        {card.label}
      </p> 

    </div>
    {/each}
</div>    


