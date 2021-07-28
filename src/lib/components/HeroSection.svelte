<script>
  export let title;
  export let id;
</script>

<section class="hero-section width__body" id={id}>
  <header class="section-header">
    <h2 class="section-title">{title}</h2>
  </header>

  <slot></slot>
</section>

<style>
  
</style>