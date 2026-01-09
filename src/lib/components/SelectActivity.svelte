<script lang="ts">
    import { onMount } from "svelte";
    import { ChevronDoubleDownOutline, ChevronDoubleUpOutline } from "flowbite-svelte-icons";

    let open = false;
    let menuEl: HTMLDivElement | null = null;
    let buttonEl: HTMLButtonElement | null = null;

  // Function to close the menu if click is outside
    function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    if (menuEl && buttonEl && !menuEl.contains(target) && !buttonEl.contains(target)) {
        open = false;
    }
    }


onMount(() => {
  // This only runs in the browser
  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
});


  let selectedLabel = "Mobilisation";
  let selectedOption = "Alternative activities";

  const groups = [
    {
      label: "Mobilisation",
      options: [
        "Alternative activities",
        "Dry events",
        "Building community support"
      ]
    },
    {
      label: "Community coalitions",
      options: [
        "Establishing a coalition and building its capacity",
        "Community education",
        "Coordinating coalition activities"
      ]
    },
    {
      label: "Community-level policy",
      options: [
        "Banning production",
        "Limiting sales",
        "Licensed premises outlet density",
        "Licensed premises outlet operating hours",
        "Legal purchasing age",
        "Product strength",
        "Advertising / marketing restrictions",
        "Price regulation",
        "Location bans",
        "Health warning labels"
      ]
    },
    {
      label: "School-based",
      options: [
        "School curriculum change (community-wide)",
        "School curriculum change (individual school[s])",
        "School non-curriculum sessions or activities",
        "School environment policy",
        "Education and training for teachers"
      ]
    },
    {
      label: "Parenting",
      options: [
        "Parent arm to school-based initiative",
        "Parenting"
      ]
    },
    {
      label: "Police / local authorities",
      options: [
        "Punishment",
        "Presence",
        "Information dissemination",
        "Roadside checkpoints",
        "Compliance checking"
      ]
    },
    {
      label: "Licensed premises / vendor / retail outlet",
      options: [
        "Responsible service training",
        "Policy change (individual vendor, voluntary)",
        "Environmental safety (individual vendor[s])",
        "Restrictions for high risk patrons"
      ]
    },
    {
      label: "Media campaign",
      options: [
        "Community-wide (radio, television, etc.)",
        "Targeted (social media, event specific, etc.)"
      ]
    },
    {
      label: "Workplace",
      options: [
        "Workplace policies",
        "Workplace support and education"
      ]
    },
    {
      label: "Health service",
      options: [
        "Remotely delivered services",
        "Staff upskilling",
        "New health services",
        "Offering additional services",
        "Mobile health services"
      ]
    },
    {
      label: "Environmental / Infrastructure",
      options: [
        "Risk assessment and environment improvement",
        "Transport options"
      ]
    }
  ];
</script>

<!-- Container -->
<div class="relative">

  <!-- Trigger button -->
  <button
    bind:this={buttonEl}
    class="w-full flex justify-left items-center gap-2 px-3 py-2 mb-6
           bg-gray-300 text-gray-500 rounded
           hover:bg-gray-700 hover:text-gray-300 text-xs font-semibold uppercase tracking-wide
           transition-colors"
    on:click={() => open = !open}
  >

        <!-- Selected Option -->
    {#if ! open}
        <ChevronDoubleDownOutline class="w-5 h-5" />
    {:else}
        <ChevronDoubleUpOutline class="w-5 h-5" />
    {/if}  
    <span>Prevention activity:</span>
    {#if selectedOption}
        <span class="font-bold">{selectedLabel} - {selectedOption}</span>
    {/if} 
  </button>

  <!-- Sliding panel -->
  {#if open}
    <div
      bind:this={menuEl}
      class="absolute top-full left-0 w-full bg-gray-50 shadow-lg border border-gray-200
             z-20 overflow-hidden"
    >
      <div class="p-4 max-h-[500px] overflow-y-auto">

        <!-- Grouped selector -->
        <div class="columns-5 gap-6">
          {#each groups as group}
            <div class="mb-6 break-inside-avoid">
              <!-- Group header -->
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {group.label}
              </div>

              <!-- Options -->
              <ul class="space-y-0">
                {#each group.options as option}
                  <li>
                    <button
                      class="w-full text-left text-xs px-2 py-1 rounded
                             cursor-pointer
                             hover:bg-gray-200
                             transition-colors duration-200"
                      class:bg-gray-400={selectedOption === option}
                      on:click={() => {
                        selectedOption = option;
                        selectedLabel = group.label;
                        }}>
                      {option}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
