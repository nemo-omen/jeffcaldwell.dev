<script>
  import "../style/app.scss";
  import Header from '../components/Header.svelte';
</script>

<Header />

<main role="main" tabindex="-1">
  <slot></slot>
</main>

<style>
  main {
    /* width: clamp(16rem, 90vw, 70rem);
    margin-inline: auto; */
    width: 100vw;
    background-color: var(--red);
    padding: var(--space-small);
    /* margin-block: var(--space-small); */
  }
</style>