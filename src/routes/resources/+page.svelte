<script>
    import Header from "$lib/components/Header.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import Footer from "$lib/components/Footer.svelte"
    import { TextPlaceholder } from "flowbite-svelte";
</script>

<Header />
<main class="px-32 py-16">

<h1>Additional Resources</h1>

<ul class="list-disc pl-8 mb-12">

<li>Find information about the Know your Drug Facts program, as well as resources to order and download at:

<a class="text-blue-500 underline cursor-pointer hover:text-blue-800" 
    href="https://pls.sl.nsw.gov.au/sites/default/files/2024-05/know_your_drug_facts_toolkit.pdf">
    pls.sl.nsw.gov.au/sites/default/files/2024-05/know_your_drug_facts_toolkit.pdf</a></li>

<li>Find information about the Know your Standards program as well as resources to order and download at: 
<a class="text-blue-500 underline cursor-pointer hover:text-blue-800" 
    href="https://pls.sl.nsw.gov.au/statewide-services/drug-info-public-libraries/drug-info-activities/know-your-standards-activities">
    https://pls.sl.nsw.gov.au/statewide-services/drug-info-public-libraries/drug-info-activities/know-your-standards-activities</a></li>

</ul>


<h2>Supports for CCI Implementation</h2>
<TextPlaceholder size="4xl" />

<h2>Supports for CCI Evaluation</h2>
<TextPlaceholder size="4xl" />

<BackButton />
</main>

<Footer />


