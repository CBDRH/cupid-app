<script>
  export let title = "CommUnity Prevention Initiative Dashboard (CUPID)";
  import image from '$lib/assets/template2.png';
  import { A } from 'flowbite-svelte';
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faCircleQuestion, faCircleNodes, faEnvelope } from "@fortawesome/free-solid-svg-icons";

</script>

<div class="bg-white border border-gray-50 shadow-md rounded-lg mb-2">
  <img src={image} alt="Landscape" style="width: 100%; max-height: 200px; object-fit: cover;" />
  <h1 class="text-center pt-4">{title}</h1>

  <div class="flex flex-row gap-4 mb-4 pr-4 justify-end">

    <A href="/about">About
      <FontAwesomeIcon
        style="width: 1rem; height: 1rem"  
        icon={faCircleQuestion} class="ms-2 h-6 w-6"/>
    </A>
    <A href="/resources">Resources
      <FontAwesomeIcon 
        style="width: 1rem; height: 1rem"  
        icon={faCircleNodes} class="ms-2 h-6 w-6"/>
    </A>
    <A href="/contact">Contact
      <FontAwesomeIcon
        style="width: 1rem; height: 1rem"  
        icon={faEnvelope} class="ms-2 h-6 w-6"/>
    </A>

  </div>
</div>  

