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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--darkblue);
    padding: 2vmin;
    font-family: var(--sans);
  }
  
  nav {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: clamp(16rem, 90vw, 70rem);
  }

  #site-logo {
    transition: all 300ms ease-out;
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
      a {
        color: var(--red);
        font-weight: 600;
        text-transform: uppercase;
        text-decoration: none;
        transition: all 300ms ease-out;
      }

      a:hover {
        text-decoration: underline;
        color: var(--yellow);
      }
    }
  }
</style>