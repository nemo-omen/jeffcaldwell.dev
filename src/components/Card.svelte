<script>
  export let card = {
    title: '',
    content: '',
    link: ''
  };
</script>

<a href={card?.link} class="parent-link">
  <article class="card">
    <section class="card-image">

    </section>
    <section class="card-body">
      <header>
        <h3>{card?.title}</h3>
      </header>
      <section class="content-text">
        <p>
          {card?.content}
        </p>
      </section>
      <footer>
        <a href={card?.link} class="button">Take a Look</a>
      </footer>
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
    justify-content: space-between;
    aspect-ratio: 9 / 16;
    background: linear-gradient(var(--darkblue) 30%, var(--whitish) 65%);
    border-radius: 0.5rem;
  }

  .card-image {
    flex: 1;
    border: 1px solid var(--whitish);
  }

  .card-body {
    flex: 2;
    padding-block: var(--space-xsmall);
    display: grid;
    grid-template-rows: repeat(3 1fr);
    align-items: end;
  }

  .card-body > * + *{
    margin-top: var(--space-xsmall);
    padding-inline: var(--space-xsmall);
  }
  h3 {
    /* background: linear-gradient(20deg, var(--whitish), var(--darkblue)); */
    /* background-clip: text; */
    color: #fff;
    text-align: center;
  }
  p {
    color: var(--blackish);
  }
</style>