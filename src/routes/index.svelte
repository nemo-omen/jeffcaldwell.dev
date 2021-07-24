<script>
    import Intro from '../components/partials/home/IntroSection.svelte';
    import ServicesSection from '../components/partials/home/ServicesSection.svelte';
    import ProjectsSection from '../components/partials/home/ProjectsSection.svelte';

</script>
<section class="intro">
  <Intro />
</section>
<section class="projects">
  <ProjectsSection />
</section>
<section class="services">
  <ServicesSection />
</section>

<style>
  .intro {
    z-index: 10;
  }
  .services {
    margin-top: var(--space);
  }
</style>