<script>
  export let name;
  export let dates;
  export let featuredImage;
  export let goal;
  export let technologies;
</script>

<section class="work-section flow">
  <header class="work-header flow-small">
    {#if featuredImage}
    <img src="{featuredImage.url}" alt="{featuredImage.description ? featuredImage.description : ''}" class="featured">
    {/if}
  </header>
  <div class="work-body flow-small">
    <section class="name work-heading-group">
      <h2>{name}</h2>
      <p>{dates}</p>
    </section>
    <section class="technology work-heading-group">
      <h3>
        Technology
      </h3>
      <p>
        {#each technologies as technology}
        {technologies.indexOf(technology) !== technologies.length - 1 ? technology + ', ' : technology}
        {/each}
      </p>
    </section>
    <section class="goal work-heading-group">
      <h3>
        Goal
      </h3>
      <p>
        {goal}
      </p>
    </section>
  </div>

  <h3>Blog Posts About {name}</h3>
  <slot></slot>
</section>

<style>
  .work-section {
    margin-block: var(--space-large)
  }
  .work-heading-group > * + * {
    margin-top: var(--space-xsmall);
  }
</style>