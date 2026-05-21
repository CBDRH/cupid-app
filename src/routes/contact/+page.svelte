<script>
    import Footer from "$lib/components/Footer.svelte"
    import { CardPlaceholder } from "flowbite-svelte";
    import BackButton from "$lib/components/BackButton.svelte";

</script>

<main class="px-32 py-16">

    <h1>Contacts</h1>

    <div>
    CUPID has been developed in partnership between the National Drug and Alcohol Research Centre and the Centre for Big Data Research at the University of NSW, Australia.
    Funding information - to be advised.

    Please contact Dr Peter Gates for more information 
    
    </div>

    <div class="flex gap-16 mx-auto my-16 w-full justify-center">
        <CardPlaceholder size="2xl" />
        <CardPlaceholder size="2xl" />
        <CardPlaceholder size="2xl" />
    </div>

    <BackButton />

</main>
<Footer />


