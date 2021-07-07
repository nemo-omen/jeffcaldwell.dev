<script>
  import FlexSwitcher from '../../FlexSwitcher.svelte';

  const cards = [
  {
    title: 'Web Development',
    content: "This is a moderate amount of content that I'll use to take up some space temporarily.",
    link: '/hire',
  },
  {
    title: 'Web Design',
    content: "This is a moderate amount of content that I'll use to take up some space temporarily.",
    link: '/hire',
  },
  {
    title: 'WordPress Development',
    content: "This is a moderate amount of content that I'll use to take up some space temporarily.",
    link: '/hire',
  },
  ];

</script>

<section id="work" class="width__body">
  <FlexSwitcher {cards}/>
</section>

<style>
  section {
    z-index: 150;
  }
</style>