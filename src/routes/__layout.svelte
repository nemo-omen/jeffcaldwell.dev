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
    width: 100vw;
  }
</style>