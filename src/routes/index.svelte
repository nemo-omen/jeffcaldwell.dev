<script>
    import Intro from '$lib/components/partials/home/IntroSection.svelte';
    import ServicesSection from '$lib/components/partials/home/ServicesSection.svelte';
    import ProjectsSection from '$lib/components/partials/home/ProjectsSection.svelte';

</script>

<div id="front">
  <Intro />
  <section id="projects" class="panel">
    <p class="panel-caption" id="work-caption">Meanwhile, back at the lab...</p>
    <ProjectsSection />
  </section>
</div>
  
<style>
  #front {
    display: grid;
    gap: 1rem;
  }

  #projects {
    box-shadow: var(--panel-elevation);
    background-color: var(--bg-light);
  }
  #work-caption {
    top: 0;
    left: 0;

  }
  @media screen and (min-width: 768px) {
    
  }
</style>