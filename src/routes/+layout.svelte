<script>
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="max-w-10xl mx-auto px-4 sm:px-1 lg:px-2">
  {@render children()}
</div>

