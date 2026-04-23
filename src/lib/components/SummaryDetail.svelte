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

  // --- SUMMARY ARRAYS ---
  let useSummary = $state([0, 0, 0, 0, 0]);
  let harmSummary = $state([0, 0, 0, 0, 0]);
  let behavSummary = $state([0, 0, 0, 0, 0]);
  let economicSummary = $state([0, 0, 0, 0, 0]);

  $effect(() => {
    useSummary = [
      classifyEvidence(alcoholUseFor, alcoholUseAgainst),
      classifyEvidence(nicotineUseFor, nicotineUseAgainst),
      classifyEvidence(cannabisUseFor, cannabisUseAgainst),
      classifyEvidence(illicitUseFor, illicitUseAgainst),
      classifyEvidence(unspecifiedUseFor, unspecifiedUseAgainst)
    ];

    harmSummary = [
      classifyEvidence(alcoholHarmFor, alcoholHarmAgainst),
      classifyEvidence(nicotineHarmFor, nicotineHarmAgainst),
      classifyEvidence(cannabisHarmFor, cannabisHarmAgainst),
      classifyEvidence(illicitHarmFor, illicitHarmAgainst),
      classifyEvidence(unspecifiedHarmFor, unspecifiedHarmAgainst)
    ];

    behavSummary = [
      classifyEvidence(alcoholBehavFor, alcoholBehavAgainst),
      classifyEvidence(nicotineBehavFor, nicotineBehavAgainst),
      classifyEvidence(cannabisBehavFor, cannabisBehavAgainst),
      classifyEvidence(illicitBehavFor, illicitBehavAgainst),
      classifyEvidence(unspecifiedBehavFor, unspecifiedBehavAgainst)
    ];

    economicSummary = [
      classifyEvidence(alcoholEconomicFor, alcoholEconomicAgainst),
      classifyEvidence(nicotineEconomicFor, nicotineEconomicAgainst),
      classifyEvidence(cannabisEconomicFor, cannabisEconomicAgainst),
      classifyEvidence(illicitEconomicFor, illicitEconomicAgainst),
      classifyEvidence(unspecifiedEconomicFor, unspecifiedEconomicAgainst)
    ];
  });

  let cards = ["Alcohol", "Nicotine", "Cannabis", "Other illicit drugs", "Unspecified drugs"]
  let useModals = $state([false, false, false, false, false])
  let harmModals = $state([false, false, false, false, false])
  let behavModals = $state([false, false, false, false, false])
  let economicModals = $state([false, false, false, false, false])
  
</script>

<div class="flex flex-row text-sm gap-4">
  {#each cards as card, i}
    <div class="flex flex-col flex-1 rounded-xl shadow w-64 h-42 p-4 mt-3 relative transition-colors duration-300">
      
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
            <b>Use</b> Examples of use outcomes include any use within a timeframe, frequency of use, volume of use, and sales data? 
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

  <Modal form bind:open={useModals[i]} size="md">
    <p>Use: {card}</p>
  </Modal>

  <Modal form bind:open={harmModals[i]} size="md">
    <p>Harm: {card}</p>
  </Modal>

  <Modal form bind:open={behavModals[i]} size="md">
    <p>Behaviour: {card}</p>
  </Modal>

  <Modal form bind:open={economicModals[i]} size="md">
    <p>Economic: {card}</p>
  </Modal>

  {/each}
</div>