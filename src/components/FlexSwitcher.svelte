<script>
  import Card from './Card.svelte';
  export let cards = [];
</script>

<section class="switcher">
  {#each cards as card}
    <Card {card} />
  {/each}
</section>

<style>
  .switcher {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    justify-content: space-between;
    justify-items: space-between;
    grid-gap: var(--space-small);
  }
</style>