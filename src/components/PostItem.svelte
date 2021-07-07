<script>
  export let post;
</script>

<article class="post-item">
  <h3>
    <a href="/writing/{post.slug}">
      {post.title}
    </a>
  </h3> 
    <h4>{post.created}</h4>
  <p>{post.excerpt}</p>
</article>

<style>
  .post-item > * + * {
    margin-top: 0.75rem;
  }
  h4 {
    font-size: var(--font-size-small);
  }
  .post-item a {
    text-decoration-color: var(--red);
    color: var(--red);
    transition: color 300ms ease-out, text-decoration-color 300ms ease-out;
  }

  .post-item a:hover {
    color: var(--dark-blue);
    text-decoration-color: transparent;
  }
</style>