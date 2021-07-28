<script>
  import HeroSection from '$lib/components/HeroSection.svelte'
  import FlexSwitcher from '$lib/components/FlexSwitcher.svelte';
  import Feature from '$lib/components/Feature.svelte';
</script>

<HeroSection id="work" title="Work">
  <FlexSwitcher>
    <Feature
      image={{url: '/images/FeedMe_Feature.png', description: 'FeedMe front page interface.'}}
      status="July 2021 - Ongoing"
      title="FeedMe"
      subtitle="The easy RSS reader"
      link="/work/feedme"
    >
    <p>FeedMe is being developed as an accessible and easy-to-use RSS reader.</p>
    </Feature>
  </FlexSwitcher>
</HeroSection>

<style>
</style>