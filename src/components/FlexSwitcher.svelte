<script>
  import Card from './Card.svelte';
  export let cards = [];
</script>

<section class="switcher">
  <a href="/hire" class="parent-link">
    <article class="card">
      <section class="card-body flow">
        <header>
          <h3>Web<br>Development</h3>
        </header>
        <section class="card-image">
    
        </section>
        <section class="content-text">
          <p>
            This is a moderate amount of content that I'll use to take up some space temporarily.
          </p>
        </section>
      </section>
    </article>
  </a>
  <a href="/hire" class="parent-link">
    <article class="card">
      <section class="card-body flow">
        <header>
          <h3>Web<br>Design</h3>
        </header>
        <section class="card-image">
    
        </section>
        <section class="content-text">
          <p>
            This is a moderate amount of content that I'll use to take up some space temporarily.
          </p>
        </section>
      </section>
    </article>
  </a>
  <a href="/hire" class="parent-link">
    <article class="card">
      <section class="card-body">
        <header>
          <h3>WordPress<br>Development</h3>
        </header>
        <section class="card-image">
    
        </section>
        <section class="content-text">
          <p>
            This is a moderate amount of content that I'll use to take up some space temporarily.
          </p>
        </section>
      </section>
    </article>
  </a>

</section>

<style>
  .switcher {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    grid-gap: var(--space-small);
  }

  .parent-link {
    text-decoration: none;
    display: flex;
  }
  .card {
    display: flex;
    flex-direction: column;
    /* background: var(--red); */
    box-shadow: 5px 5px 5px rgb(0, 0, 0, 0.3);
    border: 1px solid var(--darkwhitish);
    background-color: var(--lightwhitish);
    transition: box-shadow 200ms ease-out, background-color 200ms ease-out;
  }
  
  .card:hover {
    box-shadow: 7px 7px 10px rgb(0, 0, 0, 0.3);
    background-color: var(--lightlightwhitish);
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

  .card-body > * + *{
    margin-top: 1rem;
  }
  .card h3 {
    color: var(--red);
    text-align: center;
    letter-spacing: 0.2em;
    font-weight: 900;
    font-size: clamp(var(--size-500), 3vw, var(--size-600));
    text-align: center;
    transition: color 300ms ease-out;
  }

  .card:hover h3 {
    color: var(--darkblue);
  }
  p {
    color: var(--blackish);
  }
</style>