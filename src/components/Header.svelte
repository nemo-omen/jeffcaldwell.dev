<script>

</script>

<header>
  <div class="header-content">
    <h1 id="site-header">
    <a href="https://trainingmontage.dev">
      T<span class="h-dot">.</span>
    </a>
    </h1>
    <nav>
      <menu>
        <li><a href="/">Home</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/about">About</a></li>
      </menu>
    </nav>
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: center;
    background-color: var(--darkblue);
    padding: 2vmin;
    font-family: var(--sans);
    // border-top: 0.5rem solid var(--lightgreen); 
    // border-top: 0.5rem solid var(--yellow);
    // border-top: 0.5rem solid var(--green); 
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: clamp(16rem, 90vw, 70rem);
    padding: 0 auto;
  }

  #site-header {
    font-size: 5vw;
    line-height: 1;
    
    a {
      color: var(--whitish);
      text-decoration: none;
      transition: all 300ms ease-out;
    }
    
    a:hover {
      color: var(--red);
    }
    
    .h-dot {
      transition: all 300ms ease-out;
      color: var(--red);
    }

    a:hover > .h-dot {
      color: var(--whitish);
    }
  }


  menu {
    display: flex;
    gap: 2rem;
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