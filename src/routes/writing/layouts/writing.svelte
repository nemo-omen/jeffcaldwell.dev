<script>
  export let title = '';
  export let author = 'Jeff Caldwell';
  export let created;
  export let slug;
  export let subtitle = '';
  export let tags = [];
</script>


<section class="flow post">
  <section class="post-header">
    <h2 class="title">{title}</h2>
    
    <div class="sub-header">
      <p class="post-meta">by {author} on {created}</p>
      <nav class="nav-list">
        {#each tags as tag}
          <a href="/tag/{tag}" class="tag">{tag}</a>
        {/each}
      </nav>
    </div>
  </section>
  <slot></slot>
</section>

<style>
  .post-header > * + *{
    margin-top: 0.5rem;
  }
  .title {
    font-size: var(--font-size-xl);
    font-weight: 900;
  }
  .sub-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-small);
    margin-inline: 0.5rem;
  }
  .post-meta {
    font-weight: 500;
    font-size: var(--font-size-small);
    color: var(--darkblue);
    text-decoration: underline;
    color: var(--red);
    text-underline-offset: 0.75rem;
    text-decoration-thickness: 2px;
  }
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: var(--font-size-small);
  }

  .nav-list a {
    color: var(--red);
    text-decoration: underline;
    transition: color 300ms ease-out, text-decoration-color 300ms ease-out;
  }

  .nav-list a:hover {
    text-decoration-color: transparent;
    color: var(--darkblue);
  }
</style>