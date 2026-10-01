<script>
  import logo from '$lib/assets/cupid-logo-dark.png';
  import { A } from 'flowbite-svelte';
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faCircleQuestion, faCircleNodes, faEnvelope, faMoon, faLightbulb, faHome } from "@fortawesome/free-solid-svg-icons";

  </script>

<header class="flex justify-between items-start px-6 shadow border-b border-border">
  
  <div class="flex items-center ml-4">
    <a href="/">
      <img src={logo} alt="Landscape" class="w-64" />
    </a>
</div>

  <nav class="flex items-center gap-4 mt-6">

    <A href="/">Home
      <FontAwesomeIcon
        style="width: 1rem; height: 1rem"  
        icon={faHome} class="ms-2 h-6 w-6"/>
    </A>

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

  </nav>
</header>  

