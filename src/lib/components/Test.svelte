<script lang="ts">
  import { evidenceLevels } from "$lib/constants/evidenceLevels.js";
</script>

<div class="flex gap-3">
  {#each evidenceLevels as level}
    <div
      class={`w-32 h-20 rounded-lg flex flex-col items-center justify-center
              ${level.bgColor}`}
    >
      <div class={`text-sm font-semibold ${level.labelColor}`}>
        {level.label}
      </div>
      <div class={`text-xs ${level.textColor}`}>
        Text sample
      </div>
    </div>
  {/each}
</div>