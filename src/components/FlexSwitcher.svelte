<script>
</script>

<section class="switcher">
  <slot></slot>
</section>

<style>
  .switcher {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    grid-gap: var(--space-small);
  }
  :global(p) {
    color: var(--blackish);
  }
</style>