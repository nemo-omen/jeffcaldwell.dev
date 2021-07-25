<script>
  import "$lib/style/app.scss";
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

</script>

<Header />

<main role="main" tabindex="-1">
  <slot></slot>
</main>

<Footer />

<style>
  main {
    width: var(--width-body);
    margin: 0 auto;
    margin-bottom: var(--space);
  }
</style>