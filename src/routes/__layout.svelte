<script>
  import "../style/app.scss";
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

</script>

<Header />

<main role="main" tabindex="-1">
  <slot></slot>
</main>

<Footer />

<style>
  main {
    width: var(--width-body);
    margin: var(--space-small) auto;
  }
</style>