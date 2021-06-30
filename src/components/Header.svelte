<script>
  import Logo from './Logo.svelte';
</script>

<header>
    <nav labeledby="#nav-label">
      <h2 id="nav-label" class="visually-hidden">Site</h2>
      <a href="/" id="site-logo">
        <Logo />
      </a>
      <menu>
        <li><a href="/work">Work</a></li>
        <li><a href="/blog">Writing</a></li>
        <li><a href="/about">About</a></li>
      </menu>
    </nav>
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
  
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: clamp(16rem, 90vw, 70rem);

    a {
      line-height: 1;
    }
  }

  #site-logo {
    transition: all 300ms ease-out;
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  #site-logo:focus {
    outline: 3px dashed var(--red);
    outline-offset: 0.25rem; 
  }


  menu {
    display: flex;
    gap: 2rem;
    margin: 0;
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
        transition: all 300ms ease-out;
        font-size: clamp(var(--size-400), 4vw, var(--size-600));
        line-height: 1;
      }

      a:hover {
        text-decoration: underline;
        color: var(--yellow);
      }
    }
  }
</style>