<script>
  import FlexSwitcher from '../../FlexSwitcher.svelte';
</script>

<section id="work" class="width__body">
  <header class="section-header">
    <h2 class="section-title">Services</h2>
  </header>
  <FlexSwitcher>
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
        <section class="card-body">
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
  </FlexSwitcher>
</section>

<style>

  :global(#work .switcher) {
    margin-top: var(--space);
  }
</style>