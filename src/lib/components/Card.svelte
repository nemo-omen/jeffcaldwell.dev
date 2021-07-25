<script>
  export let status = ""; // can also be "Ongoing" || "Complete";
  export let title;
  export let link;
  export let subtitle;
</script>

<a href={link} class="parent-link">
  <article class="card">
    <section class="card-body flow">
      <header>
        {#if status === "Ongoing"}
          <h4 class="status">{status}</h4>
        {/if}

        {#if title}
        <h3>{title}</h3>
        {/if}
        {#if subtitle}
        <h4>{subtitle}</h4>
        {/if}
        <slot name="title"></slot>
      </header>
      <section class="card-image">
        <slot name="image"></slot>
      </section>
      <section class="content-text">
        <slot name="content"></slot>
      </section>
    </section>
  </article>
</a>

<style>
  .parent-link {
    text-decoration: none;
  }
  .card {
    display: flex;
    flex-direction: column;
    box-shadow: var(--elevation-3);
    /* border-top: 1px solid rgb(var(--primary-rgb), 0.1);
    border-left: 1px solid rgb(var(--primary-rgb), 0.1); */
    border-right: 1px solid rgb(var(--primary-rgb), 0.2);
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.2);
    transition: box-shadow 200ms ease-out, background-color 200ms ease-out;
  }
  
  .card:hover {
    box-shadow: var(--elevation-4);
  }
  
  .card-image, :global(.card-image img), .content-text {
    min-width: 100%;
    /* width: 100%; */
    /* flex: 2; */
  }

  .card-body {
    display: flex;
    flex-direction: column;
    flex: 3;
    padding: var(--space-xsmall);
  }

  .card-body > * + * {
    margin-top: 1rem;
  }
  :global(.card h3) {
    color: var(--red);
    text-align: center;
    letter-spacing: 0.2em;
    /* font-weight: 900; */
    font-size: var(--font-size-medium);
    text-align: center;
    transition: color 300ms ease-out;
  }

  :global(.card:hover h3) {
    color: var(--darkblue);
  }
  .card:hover .status {
    background: var(--whitish);
    color: var(--secondary);
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: var(--space-xsmall);
  }
  .status {
    position: absolute;
    top: calc(var(--space-xsmall) * -1);
    right: calc(var(--space-xsmall) * -1);
    font-size: var(--font-size-xsmall);
    color: var(--whitish);
    font-weight: 600;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
    border-left: 1px solid var(--red);
    border-bottom: 1px solid var(--red);
    padding: 0.25rem;
    line-height: 1;
    background: var(--red);
    transition: all 300ms ease-out;
    text-align: center;
  }

  @media screen and (min-width: 1024px) {
    .card-image, :global(.card-image > img), :global(.content-text p) {
      min-width: 50%;
    }
    .card-image, .content-text {
      display: flex;
      justify-content: center;
      padding-block: var(--space-small);
    }
    :global(.card h3) {
      font-size: var(--font-size-large);
    }

  }
</style>