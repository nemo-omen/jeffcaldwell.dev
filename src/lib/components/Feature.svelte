<script>
  export let title;
  export let subtitle;
  export let image;
  export let status;
  export let link;
</script>

<article class="feature">
  <div class="feature-text">
    <header class="feature-header">
      <h3 class="feature-title">{title}</h3>
      <p class="feature-subtitle">{subtitle}</p>
      <div class="feature-status">{status}</div>
    </header>
    <section class="feature-content">
      <slot></slot>
    </section>
    <footer class="feature-footer">
      <a href="{link}" class="feature-link">Check it Out</a>
    </footer>
  </div>
  <div class="feature-image">
    {#if image}
    <img src="{image.url}" alt="{image.description}" width="1440" height="800">
    {/if}
  </div>
</article>

<style>
  .feature {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    gap: var(--space);
  }
  .feature-text {
    flex: 1;
    order: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-inline: var(--space);
  }
  .feature-image {
    flex: 2;
    order: 1;
  }
  .feature-image img {
    max-width: 100%;
    height: auto;
  }
  .feature-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-xsmall);
  }
  .feature-title {
    color: var(--red);
    font-size: var(--font-size-xl);
    line-height: 1;
  }
  .feature-subtitle {
    font-size: var(--font-size-normal);
    font-family: var(--display);
    letter-spacing: 0.125em;
  }
  .feature-status {
    font-size: var(--font-size-small);
    line-height: 1;
    color: var(--secondary);
  }
  .feature-link {
    color: var(--secondary);
    transition: color 300ms ease-out;
  }
  .feature-link:hover {
    color: var(--primary);
  }

  @media screen and (min-width: 768px) {
    .feature-image {
      max-width: 66%;
    }
    .feature {
      flex-direction: row;
    }
    .feature-text {
      padding-block: var(--space);
      padding-inline: unset;
    }
  }
</style>