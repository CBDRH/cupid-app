<script>
  import { onMount } from 'svelte';
  import image from '$lib/assets/CUPID_final_OUTLINED.svg';
  import { A } from 'flowbite-svelte';
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faCircleQuestion, faCircleNodes, faEnvelope, faMoon, faLightbulb } from "@fortawesome/free-solid-svg-icons";

  let theme = 'light';

  const getButtonClasses = () =>
    'absolute top-4 right-4 rounded-md border border-border bg-surface px-3 py-2 bg-background text-foreground shadow-sm transition hover:bg-muted active:scale-95';

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const nextTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  };

  onMount(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    theme = initialTheme;
  });
</script>

<div class="bg-background text-foreground border border-border shadow-md rounded-lg mb-2">
  

  <div class="relative">
    <img
      src={image}
      alt="Landscape"
      class="w-full max-h-[2230px] object-cover"
    />

    <button
      type="button"
      onclick={toggleTheme}
      aria-label="Toggle dark mode"
      class={getButtonClasses()}
    >
      {#if theme === 'dark'}
        <FontAwesomeIcon icon={faLightbulb} class="h-5 w-5" />
      {:else}
        <FontAwesomeIcon icon={faMoon} class="h-5 w-5" />
      {/if}
      <span class="sr-only">Toggle theme</span>
    </button>
  
</div>

  <div class="flex flex-row gap-4 mb-4 pr-4 justify-end">

    <a href="/about">About
      <FontAwesomeIcon
        style="width: 1rem; height: 1rem"  
        icon={faCircleQuestion} class="ms-2 h-6 w-6"/>
    </a>
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

