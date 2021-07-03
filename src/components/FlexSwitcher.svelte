<script>
  import Card from './Card.svelte';
  export let cards = [];
</script>

<section class="switcher space__outer_top">
  {#each cards as card}
    <Card {card} />
  {/each}
</section>

<style>
  .switcher {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space);
  }

  :global(.switcher > * ) {
    flex-grow: 1;
    flex-basis: calc((30rem - 100%) * 999);
  }
</style>