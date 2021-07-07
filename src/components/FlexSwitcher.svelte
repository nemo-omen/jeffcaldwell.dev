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
      <section class="card-body flow">
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
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    justify-content: space-between;
    justify-items: space-between;
    grid-gap: var(--space-small);
  }

  .parent-link {
    text-decoration: none;
    display: flex;
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    aspect-ratio: 4 / 5;
    background: var(--red);
  }

  .card-image {
    min-height: 200px;
    max-height: 200px;
    width: 100%;
    border: 1px solid var(--whitish);
    aspect-ratio: 16 / 9;
    flex: 2;
    padding: 0.5rem;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 3;
    padding: var(--space-xsmall);
  }

  .card-body > * + *{
    margin-top: var(--space-xsmall);
  }
  h3 {
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    font-weight: 900;
    font-size: clamp(var(--size-500), 3vw, var(--size-600));
    font-weight: 700;
    text-align: center;
  }
  p {
    color: var(--blackish);
  }
</style>