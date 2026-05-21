<script>
    import { Button } from "flowbite-svelte";
    import { ArrowLeftOutline } from "flowbite-svelte-icons";
</script>

<Button
  class="bg-slate-800 text-slate-50 hover:bg-slate-700 cursor-pointer mt-16"
  onclick={() => (window.location.href = "/")}
>
  <ArrowLeftOutline class="w-5 h-5 mr-2" />
  Back to the dashboard
</Button>