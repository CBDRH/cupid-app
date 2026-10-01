<script>
	import favicon from '$lib/assets/favicon.ico';
	import "../app.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={`${favicon}?v=2`} />
</svelte:head>

{@render children()}

