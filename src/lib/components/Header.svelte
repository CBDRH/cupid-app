<script>
  import { onMount } from 'svelte';
  import imageLight from '$lib/assets/cupid-logo-light.png';
  import imageDark from '$lib/assets/cupid-logo-dark.png';
  import { A } from 'flowbite-svelte';
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faCircleQuestion, faCircleNodes, faEnvelope, faMoon, faLightbulb } from "@fortawesome/free-solid-svg-icons";

  let theme = 'light';

  const getButtonClasses = () =>
    'rounded-md bg-surface px-3 py-2 text-foreground shadow-md transition hover:bg-gray-100 dark:hover:bg-red-500 active:scale-95';

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

<header class="flex justify-between items-start px-6 shadow border-b border-border">
  
  <div class="flex items-center ml-4">
    <a href="/"> 
      <img
        src={theme === 'dark' ? imageLight : imageDark}
        alt="Landscape"
        class="w-64"
      />
    </a>
</div>

  <nav class="flex items-center gap-4 mt-6">

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

    <button
      type="button"
      onclick={toggleTheme}
      aria-label="Toggle dark mode"
      class={getButtonClasses()}
    >
      {#if theme === 'dark'}
        <FontAwesomeIcon icon={faLightbulb} />
      {:else}
        <FontAwesomeIcon icon={faMoon} />
      {/if}
      <span class="sr-only">Toggle theme</span>
    </button>


  </nav>
</header>  

