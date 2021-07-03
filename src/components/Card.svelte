<script>
  export let card = {
    title: '',
    content: '',
    link: ''
  };
</script>

<a href={card?.link}>
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
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-xsmall);
  }
</style>