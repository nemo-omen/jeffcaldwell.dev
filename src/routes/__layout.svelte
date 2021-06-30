<script>
  import "../style/app.scss";
  import Header from '../components/Header.svelte';
</script>

<Header />

<main>
  <slot></slot>
</main>

<style>
  main {
    width: clamp(16rem, 90vw, 70rem);
    margin-inline: auto;
    margin-block: calc(var(--space) + 6vmin);
  }
</style>