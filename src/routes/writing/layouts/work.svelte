<script>
  export let name;
  export let tagline;
  export let featureImageUrl;
  export let featureImageDescription;
</script>

<section class="work-section flow">
  <header class="work-header flow-small">
    {#if featureImageUrl}
    <img src="{featureImageUrl}" alt="{featureImageDescription ? featureImageDescription : ''}">
    {/if}

    <h2>{name}</h2>
    <h3>{tagline}</h3>
    
  </header>
  <slot></slot>
</section>

<style>
  .work-section {
    margin-block: var(--space-small);
  }
</style>