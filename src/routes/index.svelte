<script>
    import Intro from '$lib/components/partials/home/IntroSection.svelte';
    import ServicesSection from '$lib/components/partials/home/ServicesSection.svelte';
    import ProjectsSection from '$lib/components/partials/home/ProjectsSection.svelte';

</script>
<section class="intro">
  <Intro />
  <div class="intro-message">
    <p class="landing-description">
      I make fast, accessible, great-looking websites and web applications.<br> <a href="/hire">Get in touch</a> and let's talk about how I can help you build sites your users will love.
    </p>
  </div>
</section>
<section class="projects">
  <ProjectsSection />
</section>
<!-- <section class="services">
  <ServicesSection />
</section> -->

<style>
  .intro {
    z-index: 10;
    margin-top: var(--space);
    margin-bottom: var(--space);
  }
  .intro-message {
    display: flex;
    justify-content: center;
    margin-top: var(--space-large);
  }
  .intro-message p {
    font-size: var(--font-size-normal);
  }
  .services {
    margin-top: var(--space);
  }
  @media screen and (min-width: 768px) {
    .intro {
      margin-top: var(--space-xsmall);
    }
  }
</style>