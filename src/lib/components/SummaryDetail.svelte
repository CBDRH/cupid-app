<script>
  import { filteredData } from "$lib/stores/filterStores";
  import { classifyEvidence } from "$lib/utils/classifyEvidence";
  import { evidenceLevels } from "$lib/constants/evidenceLevels";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { Modal, Tooltip } from "flowbite-svelte";
  import { slide } from "svelte/transition";
  import {
    faPersonFallingBurst,
    faGaugeHigh,
    faUserGroup,
    faDollarSign
  } from "@fortawesome/free-solid-svg-icons";
  import { faWineBottle, faSmoking, faCannabis, faPills, faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";
  import { selectedLabel, selectedOption} from "$lib/stores/filterStores.js"

  // --- USE ---
  let alcoholUseFor = $state(0);
  let alcoholUseAgainst = $state(0);
  let nicotineUseFor = $state(0);
  let nicotineUseAgainst = $state(0);
  let cannabisUseFor = $state(0);
  let cannabisUseAgainst = $state(0);
  let illicitUseFor = $state(0);
  let illicitUseAgainst = $state(0);
  let unspecifiedUseFor = $state(0);
  let unspecifiedUseAgainst = $state(0);

  // --- HARM ---
  let alcoholHarmFor = $state(0);
  let alcoholHarmAgainst = $state(0);
  let nicotineHarmFor = $state(0);
  let nicotineHarmAgainst = $state(0);
  let cannabisHarmFor = $state(0);
  let cannabisHarmAgainst = $state(0);
  let illicitHarmFor = $state(0);
  let illicitHarmAgainst = $state(0);
  let unspecifiedHarmFor = $state(0);
  let unspecifiedHarmAgainst = $state(0);

  // --- BEHAV ---
  let alcoholBehavFor = $state(0);
  let alcoholBehavAgainst = $state(0);
  let nicotineBehavFor = $state(0);
  let nicotineBehavAgainst = $state(0);
  let cannabisBehavFor = $state(0);
  let cannabisBehavAgainst = $state(0);
  let illicitBehavFor = $state(0);
  let illicitBehavAgainst = $state(0);
  let unspecifiedBehavFor = $state(0);
  let unspecifiedBehavAgainst = $state(0);

  // --- ECONOMIC ---
  let alcoholEconomicFor = $state(0);
  let alcoholEconomicAgainst = $state(0);
  let nicotineEconomicFor = $state(0);
  let nicotineEconomicAgainst = $state(0);
  let cannabisEconomicFor = $state(0);
  let cannabisEconomicAgainst = $state(0);
  let illicitEconomicFor = $state(0);
  let illicitEconomicAgainst = $state(0);
  let unspecifiedEconomicFor = $state(0);
  let unspecifiedEconomicAgainst = $state(0);

  // --- COUNTS ---
  $effect(() => {
    // USE
    alcoholUseFor = $filteredData.map(d => d.use_summary_2).filter(d => d != null && (d === 1 || d === 2)).length;
    alcoholUseAgainst = $filteredData.map(d => d.use_summary_2).filter(d => d != null && d >= 3).length;

    nicotineUseFor = $filteredData.map(d => d.use_summary_nicotine).filter(d => d != null && (d === 1 || d === 2)).length;
    nicotineUseAgainst = $filteredData.map(d => d.use_summary_nicotine).filter(d => d != null && d >= 3).length;

    cannabisUseFor = $filteredData.map(d => d.use_summary_cannabis).filter(d => d != null && (d === 1 || d === 2)).length;
    cannabisUseAgainst = $filteredData.map(d => d.use_summary_cannabis).filter(d => d != null && d >= 3).length;

    illicitUseFor = $filteredData.map(d => d.use_summary_illicit).filter(d => d != null && (d === 1 || d === 2)).length;
    illicitUseAgainst = $filteredData.map(d => d.use_summary_illicit).filter(d => d != null && d >= 3).length;

    unspecifiedUseFor = $filteredData.map(d => d.use_summary_1).filter(d => d != null && (d === 1 || d === 2)).length;
    unspecifiedUseAgainst = $filteredData.map(d => d.use_summary_1).filter(d => d != null && d >= 3).length;

    // HARM
    alcoholHarmFor = $filteredData.map(d => d.harm_summary_alcohol).filter(d => d != null && (d === 1 || d === 2)).length;
    alcoholHarmAgainst = $filteredData.map(d => d.harm_summary_alcohol).filter(d => d != null && d >= 3).length;

    nicotineHarmFor = $filteredData.map(d => d.harm_summary_nicotine).filter(d => d != null && (d === 1 || d === 2)).length;
    nicotineHarmAgainst = $filteredData.map(d => d.harm_summary_nicotine).filter(d => d != null && d >= 3).length;

    cannabisHarmFor = $filteredData.map(d => d.harm_summary_cannabis).filter(d => d != null && (d === 1 || d === 2)).length;
    cannabisHarmAgainst = $filteredData.map(d => d.harm_summary_cannabis).filter(d => d != null && d >= 3).length;

    illicitHarmFor = $filteredData.map(d => d.harm_summary_illicit).filter(d => d != null && (d === 1 || d === 2)).length;
    illicitHarmAgainst = $filteredData.map(d => d.harm_summary_illicit).filter(d => d != null && d >= 3).length;

    unspecifiedHarmFor = $filteredData.map(d => d.harm_summary_unspecified).filter(d => d != null && (d === 1 || d === 2)).length;
    unspecifiedHarmAgainst = $filteredData.map(d => d.harm_summary_unspecified).filter(d => d != null && d >= 3).length;

    // BEHAV
    alcoholBehavFor = $filteredData.map(d => d.behav_summary_alcohol).filter(d => d != null && (d === 1 || d === 2)).length;
    alcoholBehavAgainst = $filteredData.map(d => d.behav_summary_alcohol).filter(d => d != null && d >= 3).length;

    nicotineBehavFor = $filteredData.map(d => d.behav_summary_nicotine).filter(d => d != null && (d === 1 || d === 2)).length;
    nicotineBehavAgainst = $filteredData.map(d => d.behav_summary_nicotine).filter(d => d != null && d >= 3).length;

    cannabisBehavFor = $filteredData.map(d => d.behav_summary_cannabis).filter(d => d != null && (d === 1 || d === 2)).length;
    cannabisBehavAgainst = $filteredData.map(d => d.behav_summary_cannabis).filter(d => d != null && d >= 3).length;

    illicitBehavFor = $filteredData.map(d => d.behav_summary_illicit).filter(d => d != null && (d === 1 || d === 2)).length;
    illicitBehavAgainst = $filteredData.map(d => d.behav_summary_illicit).filter(d => d != null && d >= 3).length;
    
    unspecifiedBehavFor = $filteredData.map(d => d.behav_summary_unspecified).filter(d => d != null && (d === 1 || d === 2)).length;
    unspecifiedBehavAgainst = $filteredData.map(d => d.behav_summary_unspecified).filter(d => d != null && d >= 3).length;
    
    // ECONOMIC
    alcoholEconomicFor = $filteredData.map(d => d.economic_alcohol).filter(d => d != null && (d === 1 || d === 2)).length;
    alcoholEconomicAgainst = $filteredData.map(d => d.economic_alcohol).filter(d => d != null && d >= 3).length;

    nicotineEconomicFor = $filteredData.map(d => d.economic_nicotine).filter(d => d != null && (d === 1 || d === 2)).length;
    nicotineEconomicAgainst = $filteredData.map(d => d.economic_nicotine).filter(d => d != null && d >= 3).length;

    cannabisEconomicFor = $filteredData.map(d => d.economic_cannabis).filter(d => d != null && (d === 1 || d === 2)).length;
    cannabisEconomicAgainst = $filteredData.map(d => d.economic_cannabis).filter(d => d != null && d >= 3).length;

    illicitEconomicFor = $filteredData.map(d => d.economic_illicit).filter(d => d != null && (d === 1 || d === 2)).length;
    illicitEconomicAgainst = $filteredData.map(d => d.economic_illicit).filter(d => d != null && d >= 3).length;

    unspecifiedEconomicFor = $filteredData.map(d => d.economic_unspecified).filter(d => d != null && (d === 1 || d === 2)).length;
    unspecifiedEconomicAgainst = $filteredData.map(d => d.economic_unspecified).filter(d => d != null && d >= 3).length;
  });

  // The summary arrays hold the numeric value that equates to the evidence level for each drug and outcome type, which is used to determine the colour and label of the summary cards
  let useSummary = $state([0, 0, 0, 0, 0]);
  let harmSummary = $state([0, 0, 0, 0, 0]);
  let behavSummary = $state([0, 0, 0, 0, 0]);
  let economicSummary = $state([0, 0, 0, 0, 0]);

  // The data arrays hold the raw counts of for/against studies for each drug and outcome type, which is used to populate the modals when the user clicks on the summary cards
  let useData = $state([ [0, 0], [0, 0], [0, 0], [0, 0], [0, 0] ]);
  let harmData = $state([ [0, 0], [0, 0], [0, 0], [0, 0], [0, 0] ]);
  let behavData = $state([ [0, 0], [0, 0], [0, 0], [0, 0], [0, 0] ]);
  let economicData = $state([ [0, 0], [0, 0], [0, 0], [0, 0], [0, 0] ]);

  $effect(() => {
    useSummary = [
      classifyEvidence(alcoholUseFor, alcoholUseAgainst),
      classifyEvidence(nicotineUseFor, nicotineUseAgainst),
      classifyEvidence(cannabisUseFor, cannabisUseAgainst),
      classifyEvidence(illicitUseFor, illicitUseAgainst),
      classifyEvidence(unspecifiedUseFor, unspecifiedUseAgainst)
    ];

    useData = [
      [alcoholUseFor, alcoholUseAgainst],
      [nicotineUseFor, nicotineUseAgainst],
      [cannabisUseFor, cannabisUseAgainst],
      [illicitUseFor, illicitUseAgainst],
      [unspecifiedUseFor, unspecifiedUseAgainst]
    ];

    harmSummary = [
      classifyEvidence(alcoholHarmFor, alcoholHarmAgainst),
      classifyEvidence(nicotineHarmFor, nicotineHarmAgainst),
      classifyEvidence(cannabisHarmFor, cannabisHarmAgainst),
      classifyEvidence(illicitHarmFor, illicitHarmAgainst),
      classifyEvidence(unspecifiedHarmFor, unspecifiedHarmAgainst)
    ];

    harmData = [
      [alcoholHarmFor, alcoholHarmAgainst],
      [nicotineHarmFor, nicotineHarmAgainst],
      [cannabisHarmFor, cannabisHarmAgainst],
      [illicitHarmFor, illicitHarmAgainst],
      [unspecifiedHarmFor, unspecifiedHarmAgainst]
    ];

    behavSummary = [
      classifyEvidence(alcoholBehavFor, alcoholBehavAgainst),
      classifyEvidence(nicotineBehavFor, nicotineBehavAgainst),
      classifyEvidence(cannabisBehavFor, cannabisBehavAgainst),
      classifyEvidence(illicitBehavFor, illicitBehavAgainst),
      classifyEvidence(unspecifiedBehavFor, unspecifiedBehavAgainst)
    ];

    behavData = [
      [alcoholBehavFor, alcoholBehavAgainst],
      [nicotineBehavFor, nicotineBehavAgainst],
      [cannabisBehavFor, cannabisBehavAgainst],
      [illicitBehavFor, illicitBehavAgainst],
      [unspecifiedBehavFor, unspecifiedBehavAgainst]
    ];

    economicSummary = [
      classifyEvidence(alcoholEconomicFor, alcoholEconomicAgainst),
      classifyEvidence(nicotineEconomicFor, nicotineEconomicAgainst),
      classifyEvidence(cannabisEconomicFor, cannabisEconomicAgainst),
      classifyEvidence(illicitEconomicFor, illicitEconomicAgainst),
      classifyEvidence(unspecifiedEconomicFor, unspecifiedEconomicAgainst)
    ];

    economicData = [
      [alcoholEconomicFor, alcoholEconomicAgainst],
      [nicotineEconomicFor, nicotineEconomicAgainst],
      [cannabisEconomicFor, cannabisEconomicAgainst],
      [illicitEconomicFor, illicitEconomicAgainst],
      [unspecifiedEconomicFor, unspecifiedEconomicAgainst]
    ];

  });

  // There is one card for each drug type, and the summary for each drug type 
  let cards = ["Alcohol", "Nicotine", "Cannabis", "Other illicit drugs", "Unspecified drugs"]
  let iconList = [faWineBottle, faSmoking, faCannabis, faPills, faPrescriptionBottle]

  // The modals are indexed in the same order as the cards and summary arrays, so use the same index to determine which modal to open when a card is clicked and which data to display in the modal     
  let useModals = $state([false, false, false, false, false])
  let harmModals = $state([false, false, false, false, false])
  let behavModals = $state([false, false, false, false, false])
  let economicModals = $state([false, false, false, false, false])


</script>

<div class="flex flex-row text-sm gap-4">
  {#each cards as card, i}
    <div class="flex flex-col flex-1 rounded-xl shadow w-64 h-40 p-4 mt-3 relative transition-colors duration-300">
      
      <!-- USE -->
      <div class="flex items-baseline mb-1">
        <div class="w-20 flex items-baseline gap-2 cursor-help">
          <FontAwesomeIcon 
            icon={faGaugeHigh} 
            style="width: 1rem; height: 1rem"  />
          <span class="font-semibold">Use</span>
        </div>
        <Tooltip placement="right" type="light" transition={slide}>
          <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
            <b>Use</b> Examples of use outcomes include any use within a timeframe, frequency of use, volume of use, and sales data 
          </div>
        </Tooltip>
        <button 
          class={`ml-6 w-32 border rounded-lg py-1 text-left pl-6 cursor-pointer ${evidenceLevels[useSummary[i]].bgColor} ${evidenceLevels[useSummary[i]].labelColor}`}
          onclick={() => useModals[i] = true}
          >
          {#key useSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[useSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[useSummary[i]].label}
      </button>
      </div>

      <!-- HARM -->
      <div class="flex items-baseline mb-1">
        <div class="w-20 flex items-baseline gap-2 cursor-help">
          <FontAwesomeIcon 
            style="width: 1rem; height: 1rem"  
            icon={faPersonFallingBurst} />
          <span class="font-semibold">Harm</span>
        </div>
        <Tooltip placement="right" type="light" transition={slide}>
          <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
            <b>Harm</b> Examples of harm outcomes include substance-related injuries, related health conditions, related deaths, and related crimes 
          </div>
        </Tooltip>
        <button 
          class={`ml-6 w-32 border rounded-lg py-1 text-left pl-6 cursor-pointer ${evidenceLevels[harmSummary[i]].bgColor} ${evidenceLevels[harmSummary[i]].labelColor}`}
          onclick={() => harmModals[i] = true}
          >
          {#key harmSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[harmSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[harmSummary[i]].label}
      </button>
      </div>

      <!-- BEHAV -->
      <div class="flex items-baseline mb-1">
        <div class="w-20 flex items-baseline gap-2 cursor-help">
          <FontAwesomeIcon
            style="width: 1rem; height: 1rem"  
            icon={faUserGroup} />
          <span class="font-semibold">Behaviour</span>
        </div>
        <Tooltip placement="right" type="light" transition={slide}>
          <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
            <b>Behaviour</b> Examples of behaviour outcomes include unlawful supply, unlafwul access, intentions and attitudes, and desire to quit  
          </div>
        </Tooltip>
        <button 
          class={`ml-6 w-32 border rounded-lg py-1 text-left pl-6 cursor-pointer ${evidenceLevels[behavSummary[i]].bgColor} ${evidenceLevels[behavSummary[i]].labelColor}`}
          onclick={() => behavModals[i] = true}
          >
          {#key behavSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[behavSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[behavSummary[i]].label}
      </button>
      </div>

      <!-- ECONOMIC -->
      <div class="flex items-baseline">
        <div class="w-20 flex items-baseline gap-2 cursor-help">
          <FontAwesomeIcon
            style="width: 1rem; height: 1rem"  
            icon={faDollarSign} />
          <span class="font-semibold">Economic</span>
        </div>
        <Tooltip placement="right" type="light" transition={slide}>
          <div class="max-w-sm font-normal leading-relaxed whitespace-normal">
            <b>Economic</b> Economic outcomes refer to cost-effectiveness, i.e. whether there is a net financial benefit to the community as compared to what it would cost if the community    
          </div>
        </Tooltip>
        <button 
          class={`ml-6 w-32 border rounded-lg py-1 text-left pl-6 cursor-pointer ${evidenceLevels[economicSummary[i]].bgColor} ${evidenceLevels[economicSummary[i]].labelColor}`}
          onclick={() => economicModals[i] = true}
          >
          {#key economicSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[economicSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[economicSummary[i]].label}
      </button>
      </div>

    </div>

  <!-- Modal for use outcomes   -->
  <Modal bind:open={useModals[i]} dismissable class="max-w-[30rem]">
    <h1 class="text-xl font-bold mb-2 text-gray-100 uppercase tracking-wide">{$selectedLabel}: {$selectedOption}</h1>
    
    <div class="flex items-baseline gap-2 mb-4">
      <h3 class="text-md font-normal uppercase">{cards[i]}</h3>
      <FontAwesomeIcon icon={iconList[i]} style="width: 1rem; height: 1rem"/>
    </div>

    <div class="flex flex-row  mb-1 gap-4">
      <h2 class="text-lg font-semibold text-gray-100">Impact on use</h2>

      <div class={`flex items-center justify-center w-24 gap-1 rounded-lg ${evidenceLevels[useSummary[i]].bgColor} ${evidenceLevels[useSummary[i]].labelColor}`}>
          {#key useSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[useSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[useSummary[i]].label}
      </div>
    </div>

    <p>
     {useData[i][0]} {useData[i][0] === 1 ? 'study' : 'studies'} had a statistically significant positive effect and {useData[i][1]} {useData[i][1] === 1 ? 'study' : 'studies'} had a null effect or statistically significant negative effect.
    </p>
  </Modal>


  <!-- Modal for harm outcomes   -->
  <Modal bind:open={harmModals[i]} dismissable class="max-w-[30rem]">
    <h1 class="text-xl font-bold mb-2 text-gray-100 uppercase tracking-wide">{$selectedLabel}: {$selectedOption}</h1>
    
    <div class="flex items-baseline gap-2 mb-4">
      <h3 class="text-md font-normal uppercase">{cards[i]}</h3>
      <FontAwesomeIcon icon={iconList[i]} style="width: 1rem; height: 1rem"/>
    </div>

    <div class="flex flex-row  mb-1 gap-4">
      <h2 class="text-lg font-semibold text-gray-100">Impact on harm</h2>

      <div class={`flex items-center justify-center w-24 gap-1 rounded-lg ${evidenceLevels[harmSummary[i]].bgColor} ${evidenceLevels[harmSummary[i]].labelColor}`}>
          {#key harmSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[harmSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[harmSummary[i]].label}
      </div>
    </div>

    <p>
     {harmData[i][0]} {harmData[i][0] === 1 ? 'study' : 'studies'} had a statistically significant positive effect and {harmData[i][1]} {harmData[i][1] === 1 ? 'study' : 'studies'} had a null effect or statistically significant negative effect.
    </p>
  </Modal>


  <!-- Modal for behaviour outcomes   -->
  <Modal bind:open={behavModals[i]} dismissable class="max-w-[30rem]">
    <h1 class="text-xl font-bold mb-2 text-gray-100 uppercase tracking-wide">{$selectedLabel}: {$selectedOption}</h1>
    
    <div class="flex items-baseline gap-2 mb-4">
      <h3 class="text-md font-normal uppercase">{cards[i]}</h3>
      <FontAwesomeIcon icon={iconList[i]} style="width: 1rem; height: 1rem"/>
    </div>

    <div class="flex flex-row  mb-1 gap-4">
      <h2 class="text-lg font-semibold text-gray-100">Impact on behaviour</h2>

      <div class={`flex items-center justify-center w-24 gap-1 rounded-lg ${evidenceLevels[behavSummary[i]].bgColor} ${evidenceLevels[behavSummary[i]].labelColor}`}>
          {#key behavSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[behavSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[behavSummary[i]].label}
      </div>
    </div>

    <p>
     {behavData[i][0]} {behavData[i][0] === 1 ? 'study' : 'studies'} had a statistically significant positive effect and {behavData[i][1]} {behavData[i][1] === 1 ? 'study' : 'studies'} had a null effect or statistically significant negative effect.
    </p>
  </Modal>


  <!-- Modal for economic outcomes   -->
  <Modal bind:open={economicModals[i]} dismissable class="max-w-[30rem]">
    <h1 class="text-xl font-bold mb-2 text-gray-100 uppercase tracking-wide">{$selectedLabel}: {$selectedOption}</h1>
    
    <div class="flex items-baseline gap-2 mb-4">
      <h3 class="text-md font-normal uppercase">{cards[i]}</h3>
      <FontAwesomeIcon icon={iconList[i]} style="width: 1rem; height: 1rem"/>
    </div>

    <div class="flex flex-row  mb-1 gap-4">
      <h2 class="text-lg font-semibold text-gray-100">Impact on economic outcomes</h2>

      <div class={`flex items-center justify-center w-24 gap-1 rounded-lg ${evidenceLevels[economicSummary[i]].bgColor} ${evidenceLevels[economicSummary[i]].labelColor}`}>
          {#key economicSummary[i]}
            <FontAwesomeIcon
              style="width: 1rem; height: 1rem"
              icon={evidenceLevels[economicSummary[i]].icon}
            />
          {/key}
          {evidenceLevels[economicSummary[i]].label}
      </div>
    </div>

    <p>
     {economicData[i][0]} {economicData[i][0] === 1 ? 'study' : 'studies'} had a statistically significant positive effect and {economicData[i][1]} {economicData[i][1] === 1 ? 'study' : 'studies'} had a null effect or statistically significant negative effect.
    </p>
  </Modal>

  {/each}
</div>