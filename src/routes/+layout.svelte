<script>
	import favicon from '$lib/assets/favicon.ico';
	import "../app.css";
	let { children } = $props();
</script>

<svelte:head>
  <script>
    (function() {
      try {
        var storedTheme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.error(e);
      }
    })();
  </script>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

