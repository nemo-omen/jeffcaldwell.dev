<script>
  export let card = {
    title: '',
    content: '',
    link: ''
  };
</script>

<a href={card?.link} class="parent-link">
  <article class="card">
    <header>
      <h3>{card?.title}</h3>
    </header>
    <section>
      {card?.content}
    </section>
    <footer>
      <a href={card?.link} class="button">Take a Look</a>
    </footer>
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
    gap: var(--space-xsmall);
    background-color: var(--whitish);
  }
</style>