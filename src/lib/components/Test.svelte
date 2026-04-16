<script lang="ts">
  import { onMount } from "svelte";
  import { Table } from "@flowbite-svelte-plugins/datatable";

  let items = [];

  onMount(async () => {
    const res = await fetch("/data/test.json");
    items = await res.json();
  });
</script>

<Table {items} />