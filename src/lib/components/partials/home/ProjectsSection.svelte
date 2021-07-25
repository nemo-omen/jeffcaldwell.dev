<script>
  import FlexSwitcher from '$lib/components/FlexSwitcher.svelte';
  import Feature from '$lib/components/Feature.svelte';
</script>

<section id="work" class="width__body">
  <header class="section-header">
    <h2 class="section-title">Work</h2>
  </header>
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
    <!-- <Card link="/work/feedme" status="Ongoing" title="FeedMe" subtitle="The simple RSS reader">
      <p slot="content">
        This is a moderate amount of content that I'll use to take up some space temporarily.
      </p>
      <img src="/FeedMe-Screenshot.png" alt="FeedMe front page interface." slot="image">
    </Card> -->
    <!-- <Card link="/projects/feedme" status="Ongoing" title="FeedMe" subtitle="The simple RSS reader">
      <p slot="content">
        This is a moderate amount of content that I'll use to take up some space temporarily.
      </p>
      <img src="/FeedMe-Screenshot.png" alt="FeedMe front page interface." slot="image">
    </Card>
    <Card link="/projects/feedme" status="Ongoing" title="FeedMe" subtitle="The simple RSS reader">
      <p slot="content">
        This is a moderate amount of content that I'll use to take up some space temporarily.
      </p>
      <img src="/FeedMe-Screenshot.png" alt="FeedMe front page interface." slot="image">
    </Card> -->
  </FlexSwitcher>
</section>

<style>
</style>