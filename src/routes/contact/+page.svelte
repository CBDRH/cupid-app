<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte"
    import BackButton from "$lib/components/BackButton.svelte";

</script>

<Header />
<main class="px-32 py-16">

    <h1>Contacts</h1>

    <div>
    
        <p>CUPID was designed in partnership by two research institutions at the University of New South Wales (UNSW), Sydney, Australia: the SUSTAIN group at the 
            <a 
                class="text-blue-500 underline cursor-pointer hover:text-blue-800" 
                href="https://www.unsw.edu.au/research/ndarc">
                National Drug and Alcohol Research Centre (NDARC)
            </a> and the 
            <a 
                class="text-blue-500 underline cursor-pointer hover:text-blue-800" 
                href="https://www.unsw.edu.au/research/cbdrh">
                Centre for Big Data Research in Health (CBDRH)
            </a>.
        </p>
        <br>
        <p>This resource has been made freely available by NDARC (through funding from the Australian Government Department of Health, Disability and Ageing) and by the NSW Ministry of Health (through funding from the Prevention Research Support Program).</p> 
        <br>
        <p>Please contact the CUPID team for more information on 
            <a href="mailto:CUPID@unsw.edu.au" class="text-blue-500 hover:text-blue-800 hover:underline break-all">
                CUPID@unsw.edu.au
            </a>
        </p>
        <br>
        <p>Or if you would like to reach out to our CUPID staff:</p>
 
    </div>


    <div class="max-w-4xl mx-auto px-4 py-8">
  <!-- Container: Stacks vertically on mobile, changes to side-by-side grid on small tablets and up -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
    
    <!-- Profile Card 1 -->
    <div class="flex flex-col items-center text-center bg-white p-6 rounded-xl border border-gray-100
            shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-gray-200">
      <!-- Profile Picture -->
      <img 
        src="/images/Bio_Pic_Gates.jpg" 
        alt="Dr Peter Gates" 
        class="w-32 h-32 rounded-full object-cover shadow-inner mb-4 border-2 border-gray-200"
      />
      
      <!-- Text Content -->
      <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Project Lead</span>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Dr Peter Gates</h3>
      <h3 class="text-md font-bold text-gray-600 mb-2">National Drug & Alcohol Research Centre</h3>
      
      <!-- Links & Navigation -->
      <div class="flex flex-col gap-2 mt-2">
        <a href="https://www.unsw.edu.au/staff/peter-gates" class="text-sm font-medium text-gray-600 hover:text-indigo-600 hover:underline">
          Read Bio →
        </a>
        <a href="mailto:peter.gates@unsw.edu.au" class="text-sm text-gray-500 hover:text-indigo-600 hover:underline break-all">
          peter.gates@unsw.edu.au
        </a>
      </div>
    </div>

    <!-- Profile Card 2 -->
    <div class="flex flex-col items-center text-center bg-white p-6 rounded-xl border border-gray-100
            shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-gray-200 dark:bg-slate-300">
      <!-- Profile Picture -->
      <img 
        src="/images/Bio_Pic_Hanly.jpg" 
        alt="Dr Mark hanly" 
        class="w-32 h-32 rounded-full object-cover shadow-inner mb-4 border-2 border-gray-200"
      />
      
      <!-- Text Content -->
      <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Data Visualisation Lead</span>
      <h3 class="text-xl text-gray-900 mb-2">Mark Hanly</h3>
      <h3 class="text-md text-gray-600 mb-2">Center for Big Data Research in Health</h3>
      
      <!-- Links & Navigation -->
      <div class="flex flex-col gap-2 mt-2">
        <a href="https://www.unsw.edu.au/staff/mark-hanly" class="text-sm font-medium text-gray-600 hover:text-indigo-600 hover:underline">
          Read Bio →
        </a>
        <a href="mailto:m.hanly@unsw.edu.au" class="text-sm text-gray-500 hover:text-indigo-600 hover:underline break-all">
          m.hanly@unsw.edu.au
        </a>
      </div>
    </div>

  </div>
</div>


    <BackButton />

</main>
<Footer />


