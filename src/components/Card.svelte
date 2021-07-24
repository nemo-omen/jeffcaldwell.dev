<script>
  export let status = ""; // can also be "Ongoing" || "Complete";
  export let title;
  export let link;
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
    box-shadow: 3px 3px 3px #eeecdc, -3px -3px 3px var(--lightlightwhitish);
    border-top: 1px solid rgb(var(--primary-rgb), 0.1);
    border-left: 1px solid rgb(var(--primary-rgb), 0.1);
    border-right: 1px solid rgb(var(--primary-rgb), 0.2);
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.2);
    transition: box-shadow 200ms ease-out, background-color 200ms ease-out;
  }
  
  .card:hover {
    box-shadow: 5px 5px 15px #eeecdc, -5px -5px 15px var(--lightlightwhitish);
  }
  
  .card-image {
    min-width: 100%;
    width: 100%;
    border: 1px solid var(--red);
    aspect-ratio: 16 / 9;
    flex: 2;
    padding: 0.5rem;
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
    font-weight: 900;
    font-size: clamp(var(--size-500), 3vw, var(--size-600));
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
    justify-content: center;
    position: relative;
  }
  .status {
    position: absolute;
    top: calc(var(--space-small) * -1);
    right: 1rem;
    font-size: var(--font-size-xsmall);
    color: var(--whitish);
    font-weight: 600;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
    border: 1px dashed var(--red);
    padding: 0.25rem;
    line-height: 1;
    background: var(--red);
    transition: all 300ms ease-out;
    text-align: center;
  }
</style>