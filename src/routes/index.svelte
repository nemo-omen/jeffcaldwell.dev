<script>
    import Intro from '../components/partials/home/IntroSection.svelte';
    import WorkSection from '../components/partials/home/WorkSection.svelte';

</script>
<section class="intro">
  <Intro />
</section>
<section class="work">
  <WorkSection />
</section>

<style>
  .intro {
    z-index: 10;
  }

  .work {
    z-index: 30;
  }
</style>