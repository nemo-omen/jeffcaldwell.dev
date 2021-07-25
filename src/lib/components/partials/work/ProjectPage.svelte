<script>
  export let name;
  export let dates;
  export let featuredImage;
  export let goal;
  export let technologies;
</script>

<section class="work-section flow">
  <header class="work-header flow-small">
    <div class="project-image">
      {#if featuredImage}
      <img src="{featuredImage.url}" alt="{featuredImage.description ? featuredImage.description : ''}" class="featured" width="1442" height="881">
      {/if}
    </div>
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

  <section class="work-related flow-small">
    <h2>Posts About This Project</h2>
    <slot></slot>
  </section>
</section>

<style>
  .work-section {
    margin-block: var(--space-large)
  }
  .work-heading-group > * + * {
    margin-top: var(--space-xsmall);
  }
  .project-image {
    display: flex;
    justify-content: center;
  }
  .featured {
    width: 100%;
    height: auto;
    aspect-ratio: attr(width) / attr(height);
  }
  h2, h3 {
    color: var(--secondary);
  }

  @media screen and (min-width: 768px) {
    .work-body, .work-related {
      margin-inline: var(--space);
    }
  }
</style>