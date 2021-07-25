<script>
  import FlexSwitcher from '../../FlexSwitcher.svelte';
  import Card from '../../Card.svelte';
</script>

<section id="work" class="width__body">
  <header class="section-header">
    <h2 class="section-title">Services</h2>
  </header>
  <FlexSwitcher>
    <Card link="/services/web-development">
      <h3 slot="title">Web<br>Development</h3>
      <p slot="content">This is going to be a blurb about making awesome websites.</p>
    </Card>
    <Card link="/services/web-design">
      <h3 slot="title">Web<br>Design</h3>
      <p slot="content">This is going to be a blurb about making awesome websites.</p>
    </Card>
    <Card link="/services/wordpress-development">
      <h3 slot="title">WordPress<br>Development</h3>
      <p slot="content">This is going to be a blurb about making awesome websites.</p>
    </Card>
  </FlexSwitcher>
</section>

<style>

  :global(#work .switcher) {
    margin-top: var(--space);
  }
</style>