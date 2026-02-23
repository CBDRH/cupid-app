<script lang="ts">
  import { Footer, FooterLinkGroup, FooterLink } from "flowbite-svelte";
</script>

<Footer class="w-full rounded-none bg-gray-900">
  <div class="w-full flex justify-between items-center">
    <div class="text-gray-400 font-semibold">CUPID</div>

    <FooterLinkGroup class="flex flex-wrap items-center text-sm text-gray-400 gap-6">
      <FooterLink href="/">About</FooterLink>
      <FooterLink href="/">Resources</FooterLink>
      <FooterLink href="/">Contact</FooterLink>
    </FooterLinkGroup>
  </div>
</Footer>