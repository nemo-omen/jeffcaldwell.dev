<script>
  import FlexSwitcher from '../../FlexSwitcher.svelte';

  const cards = [
  {
    title: 'Placeholder Title',
    content: "This is a moderate amount of content that I'll use to take up some space temporarily.",
    link: '/hire',
  },
  {
    title: 'Placeholder Title',
    content: "This is a moderate amount of content that I'll use to take up some space temporarily.",
    link: '/hire',
  },
  {
    title: 'Placeholder Title',
    content: "This is a moderate amount of content that I'll use to take up some space temporarily.",
    link: '/hire',
  },
  ];

</script>

<section id="work" class="width__body">
  <FlexSwitcher {cards}/>
</section>

<style>

</style>