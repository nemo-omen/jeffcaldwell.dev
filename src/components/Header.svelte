<script>
  import Logo from './Logo.svelte';
</script>

<header class="site-head" role="banner" >
  <div class="site-head_inner">
    <div class="site-head_logo">
      <h1 id="site-label" class="visually-hidden">Jeff Caldwell - web designer and developer</h1>
      <a href="/" id="site-logo" aria-labelledby="site-label">
        <Logo />
      </a>
    </div>
    <nav id="primary-nav" aria-label="primary" tabindex="-1">
      <ul role="list">
        <li><a href="/work">Work</a></li>
        <li><a href="/writing">Writing</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/hire">Hire</a></li>
      </ul>
    </nav>
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--darkblue);
    padding: 1rem;
    font-family: var(--sans);
  }
  
  .site-head_inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: clamp(16rem, 90vw, 65rem);

    a {
      line-height: 1;
    }
  }

  #site-logo {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  #site-logo:focus {
    outline: 3px dashed var(--red);
    outline-offset: 0.25rem; 
  }


  nav {
    margin: 0;
    ul {
      display: flex;
      gap: clamp(1vw, 2rem, 4vw);
      padding: 0;
      li {
        list-style-type: none;
        display: inline-block;
        margin: 0;
        padding: 0;
        a {
          color: var(--red);
          font-weight: 600;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 300ms ease-out;
          font-size: clamp(var(--size-400), 4vw, var(--size-600));
          line-height: 1;
        }
        
        a:hover {
          text-decoration: underline;
          color: var(--whitish);
          text-decoration-thickness: 3px;
          text-underline-offset: 6px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .site-head_inner {
      flex-direction: column;
    }
  }
</style>