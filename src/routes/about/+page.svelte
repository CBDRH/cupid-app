<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte"
    import BackButton from "$lib/components/BackButton.svelte";
    import { ImagePlaceholder } from "flowbite-svelte";
    import { dataStore } from '$lib/stores/dataStore';
    import { Alert } from 'flowbite-svelte';
    import { ExclamationCircleSolid } from "flowbite-svelte-icons";
    import { fly } from "svelte/transition";

    let total = $state(0);

    $effect(() => {
    total = $dataStore.length;
    })

</script>


<Header />

<Alert color="red" dismissable transition={fly} params={{ x: 200 }}>
  {#snippet icon()}<ExclamationCircleSolid/>{/snippet}
  <span class="!font-extrabold">Note</span> This page is still under construction. 
</Alert>

<div class="max-w-7xl mx-auto px-4 py-12">
  <!-- Layout Wrapper: Stacked on mobile, 4-column grid on desktop -->
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
    
    <!-- SIDE MENU BAR -->
    <!-- Pins to screen on desktop using sticky, scrollable if list is long -->
    <aside class="lg:col-span-1 lg:sticky lg:top-6 h-fit max-h-[90vh] overflow-y-auto bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/60">
      <h2 class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-2">
        Table of Contents
      </h2>
      
      <nav class="space-y-1 text-sm font-medium">
        <!-- Level 1 Base Link Utility -->
        <!-- Level 2 Base Link Utility adds: pl-7 border-l ml-3 -->
        <!-- Level 3 Base Link Utility adds: pl-11 border-l ml-3 text-xs -->

        <a href="#sec-1" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          1. What is CUPID?
        </a>
        
        <a href="#sec-2" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          2. How was CUPID designed?
        </a>

        <a href="#sec-3" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          3. What data does CUPID use?
        </a>

        <a href="#sec-4" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          4. The Evidence Summary
        </a>
        <a href="#sec-4-1" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          4.1 Impact rating
        </a>
        <a href="#sec-4-1-1" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          4.1.1 Positive impact
        </a>
        <a href="#sec-4-1-2" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          4.1.2 No impact
        </a>
        <a href="#sec-4-1-3" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          4.1.3 Negative impact
        </a>
        <a href="#sec-4-2" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          4.2 AOD outcomes
        </a>

        <a href="#sec-5" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          5. How to use the filters
        </a>
        <a href="#sec-5-1" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          5.1 Target drug
        </a>
        <a href="#sec-5-2" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          5.2 Study details
        </a>
        <a href="#sec-5-3" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          5.3 Participants
        </a>
        <a href="#sec-5-4" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          5.4 Community context.
        </a>

        <a href="#sec-6" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          6. The Filtered Study List
        </a>
        <a href="#sec-6-1" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.1 CCI potential effectiveness (Star rating)
        </a>
        <a href="#sec-6-2" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.2 Study reference information
        </a>
        <a href="#sec-6-3" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.3 Full study link
        </a>
        <a href="#sec-6-4" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.4 Activity summary
        </a>
        <a href="#sec-6-5" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.5 AOD outcome details
        </a>
        <a href="#sec-6-6" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.6 Important information
        </a>
        <a href="#sec-6-6-1" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.6.1 Barriers
        </a>
        <a href="#sec-6-6-2" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.6.2 Facilitators
        </a>
        <a href="#sec-6-6-3" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.6.3 Perceived satisfaction
        </a>
        <a href="#sec-6-6-4" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.6.4 Warnings
        </a>
        <a href="#sec-6-6-5" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.6.5 General notes
        </a>
        <a href="#sec-6-6-6" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          6.6.6 Activity delivery
        </a>

        <a href="#sec-7" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          7. The CUPID Study List
        </a>

        <a href="#sec-8" class="flex items-center px-3 py-2 text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
          8. What is a Comprehensive Community Initiative?
        </a>
        <a href="#sec-8-1" class="flex items-center pl-7 pr-3 py-1.5 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          8.1 Initiative type – Local Action
        </a>
        <a href="#sec-8-1-1" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          8.1.1 Alternative activities
        </a>
        <a href="#sec-8-1-2" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          8.1.2 Dry events
        </a>
        <a href="#sec-8-1-3" class="flex items-center pl-11 pr-3 py-1 text-xs text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-l border-gray-200 dark:border-slate-700 ml-3">
          8.1.3 Building community support
        </a>
      </nav>
    </aside>

    <!-- CONTENT RIGHT AREA -->
    <main class="lg:col-span-3 space-y-16 text-gray-700 dark:text-slate-300">

        <h1>Welcome to the CommUnity Prevention Initiative Dashboard (CUPID)!</h1>

        <div>

        <p>
            This free resource helps community members, policymakers, and program managers find and understand research on how comprehensive community initiatives (CCIs) can impact alcohol and other drug (AOD) use, related harms, and associated behaviours.
        </p>
        <br>
        <p>
            CUPID was designed in partnership by two research institutions at the University of New South Wales (UNSW), Sydney, Australia: the SUSTAIN group at the National Drug and Alcohol Research Centre (NDARC) and the Centre for Big Data Research in Health (CBDRH).
        </p>
        <br>
        <p>
            This resource has been made freely available by NDARC (through funding from the Australian Government Department of Health, Disability and Ageing) and by the NSW Ministry of Health (through funding from the Prevention Research Support Program). 
        </p>
        <p>
            We invite you to use the following links to navigate to what you would like to learn more about:
        </p>


        </div>
      
      <!-- Section 1 -->
      <section id="sec-1" class="scroll-mt-6">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">1. What is CUPID?</h1>
        <p class="leading-relaxed">
        CUPID provides visualisations to show the anticipated impact of a selected Alcohol or Other Drug (AOD) prevention activity that has been evaluated as part of a comprehensive community initiative (CCI). The 45 different prevention activities that have been evaluated are described <a class="text-blue-500 underline" href="#sec-8">here</a>. Initially, ‘Local Action: Alternative Activities’ is selected. To make an alternative activity selection, you can simply click on the grey horizontal bar as shown here:    
        </p>
        <ImagePlaceholder imgOnly size="sm" class="my-4"/>
        <p>
            The main  <a class="text-blue-500 underline" href="#sec-4">Evidence Summary</a> refers to two data visualisation graphics. The first is shown as a horizontal bar which provides a high-level overview of all the relevant evidence from previous community studies. In the example below, of the 37 studies that evaluated this activity, 32 reported a positive impact on at least one assessed outcome (such as reduced alcohol use), 3 reported no impact on any outcome and 2 reported a negative impact on at least one outcome (such as increased cannabis use).
        </p>
        <ImagePlaceholder imgOnly size="sm" class="my-4"/>  
        <p>
            A second visualisation breaks down the potential impact of the selected activity on specific drugs and outcomes. In the example below, according to the studies that assessed the impact of the selected activity on alcohol, the activity is likely to have a positive impact on at least one type of alcohol outcome. Specifically, the activity is likely to have a positive impact on alcohol use as well as related harms and behaviours; however, only a limited number of studies have assessed the cost effectiveness of the activity. 
        </p>
        <ImagePlaceholder imgOnly size="sm" class="my-4"/>  
        <p>
            In addition, CUPID allows the user to make selections on a series of <a class="text-blue-500 underline" href="#sec-5">filters</a> that are contained in the tab on the far-left side of the screen (you may need to click the ‘>>’ icon to have this tab appear). These filters will update the ‘Evidence Summary’ so that only studies which match your filter selections will show. The available filters allow for selection by target drug, study details, participants, and community context.  
        </p>
        <br>
        <p>
            CUPID also provides a narrative summary of all the studies which evaluated the selected activity by clicking the <a class="text-blue-500 underline" href="#sec-5">filtered study list</a> (a tab shown adjacent to the <a class="text-blue-500 underline" href="#sec-5">Evidence Summary</a>). 
        </p>
        <ImagePlaceholder imgOnly size="sm" class="my-4"/>
        <p>
            The <a class="text-blue-500 underline" href="#sec-6">Filtered study list</a> shows information taken from all the relevant studies (according to the activity and filter selections) and is provided in order of their potential effectiveness. The information provided includes: the study reference information; a link to the full study; as well as an activity summary, the AOD outcome details which were evaluated, and any important information. This information is shown where the study authors commented on the activity barriers, facilitators, perceived satisfaction, any warnings, general notes regarding the activity, or on any details concerning activity delivery. If this information is available, it is indicated with the blue number and accessible by clicking on the envelop icon:
        </p>
        <ImagePlaceholder imgOnly size="sm" class="my-4"/>
        <p>
            Finally, CUPID provides access to a <a class="text-blue-500 underline" href="/resources">Resources</a> page which offers information on how to interpret research evidence, methods used to evaluate CCI, details on each of the relevant activities, and other information of interest. 
        </p>

    </section>

      
      <!-- Section 2 -->
      <section id="sec-2" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">2. How was CUPID designed?</h1>
        <p class="leading-relaxed">
            CUPID was designed by a partnership between research institutions at the University of NSW, Sydney. That is, between the SUSTAIN group at the National Drug and Alcohol Research Centre (NDARC) and the Centre for Big Data Research in Health (CBHDRH). The design followed the principals of design science research as described by Peffers and colleagues (2007). Most importantly, this involved codesign with community members, policy makers and program managers. The six steps followed included: 1) problem identification; 2) identifying the aim for a potential solution; 3) design and development of a draft solution; 4) demonstrating this draft and allowing for stakeholder engagement to update the draft solution; 5) evaluating the updated draft with these stakeholders; and 6) promoting the then final solution to the wider population of stakeholders.
        </p>
        <!-- <br>
        <p>
            To see further details on the design of CUPID we encourage you to read our article published with the Health Promotion Journal of Australia. 
        </p> -->
      </section>



      <!-- Section 3 -->
      <section id="sec-3" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">3. What data does CUPID use?</h1>
        <p class="leading-relaxed">
            The data behind CUPID has been taken from {total} peer-reviewed <a class="text-blue-500 underline" href="#sec-4">evaluation studies</a> that were identified as part of our 2025 umbrella review of Comprehensive Community Initiatives (CCI) and our systematic and meta analytic reviews of the impact of CCI on alcohol (2026), tobacco, cannabis, and other drugs. The full list of all these studies can be seen by using the ‘CUPID study list’ tab (found adjacent to the ‘Filtered study list’).
        </p>
      </section>

    
      <!-- Section 4 -->
      <section id="sec-4" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">4. The Evidence Summary</h1>
        <p class="leading-relaxed">
            Content placeholder
        </p>
      </section>


      <!-- Section 5 -->
      <section id="sec-5" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">5. How to use the filters</h1>
        <p class="leading-relaxed">
            Content placeholder
        </p>
      </section>

      <!-- Section 6 -->
      <section id="sec-6" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">6. The filtered study list</h1>
        <p class="leading-relaxed">
            Content placeholder
        </p>
      </section>

      <!-- Section 7 -->
      <section id="sec-7" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">7. The CUPID Study List</h1>
        <p class="leading-relaxed">
            Content placeholder
        </p>
      </section>


      <!-- Section 8 -->
      <section id="sec-8" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">8. What is a Comprehensive COmmunity Initiative</h1>
        <p class="leading-relaxed">
            Content placeholder
        </p>
      </section>


      <!-- Section 9 -->
      <section id="sec-9" class="scroll-mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
        <h1 class="text-3xl font-extrabold !text-gray-900 dark:text-white mb-4">9. References</h1>
        <p class="leading-relaxed">
            Content placeholder
        </p>
      </section>



    </main>
  </div>  
</div>


<BackButton />



<Footer />


