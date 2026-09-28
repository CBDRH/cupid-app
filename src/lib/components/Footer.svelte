<script lang="ts">
  import { Footer, FooterLinkGroup, FooterLink, A } from "flowbite-svelte";
  import { HomeSolid } from "flowbite-svelte-icons";
</script>


<Footer class="fixed start-0 bottom-0 z-20 rounded-none text-gray-400 h-12 w-full border-t border-gray-200 bg-white p-4 shadow-sm">
  <A href="/"><div class="flex gap-2"><HomeSolid/><span>CUPID (2026)</span></div></A>
  <FooterLinkGroup class="mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
    <FooterLink href="/about">About</FooterLink>
    <FooterLink href="/resources">Resources</FooterLink>
    <FooterLink href="/contact">Contact</FooterLink>
  </FooterLinkGroup>
</Footer>