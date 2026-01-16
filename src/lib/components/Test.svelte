<script>
  import { filteredData } from "$lib/stores/filterStores";

  //   Reactive counts for each category
  let total = $state(0);

  $effect(() => {
    total = $filteredData.length
  })

export function bigorsmall(number) { 

    if (number < 20) return 0
    else return 1

}

let bigOrSmallValue = 0;

$effect(() => {
    bigOrSmallValue = bigorsmall(total);
});

const colors = ["bg-red-500", "bg-green-100"]

</script>



<p>Total: {total}</p>
<p>Big or Small: {bigOrSmallValue}</p>
<p>Background: {colors[bigOrSmallValue]}</p>

<div class={`border ${colors[bigOrSmallValue]}` }>
    <p>Well Head</p>
</div>