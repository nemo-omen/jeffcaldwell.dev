<script>
  import FlexSwitcher from '../../FlexSwitcher.svelte';
  import Card from '../../Card.svelte';
</script>

<section id="work" class="width__body">
  <header class="section-header">
    <h2 class="section-title">Work</h2>
    <p class="landing-description">
      My goal is to make fast, accessible, great-looking websites and web applications.<br>
      The projects below showcase my commitment to that goal. <br>
    </p>
  </header>
  <FlexSwitcher>
    <Card link="/projects/feedme" status="Ongoing" title="FeedMe" subtitle="The simple RSS reader">
      <p slot="content">
        This is a moderate amount of content that I'll use to take up some space temporarily.
      </p>
      <img src="/FeedMe-Screenshot.png" alt="FeedMe front page interface." slot="image">
    </Card>
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