<script>
    import Intro from '../components/partials/home/IntroSection.svelte';
    import WorkSection from '../components/partials/home/WorkSection.svelte';
    import FlexSwitcher from '../components/FlexSwitcher.svelte';

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
<section>
  <Intro />
  <WorkSection />
  <FlexSwitcher {cards}/>
</section>