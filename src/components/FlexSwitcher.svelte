<script>
  import Card from './Card.svelte';
  export let cards = [];
</script>

<section class="switcher">
  <slot></slot>
</section>

<style>
  .switcher {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    grid-gap: var(--space-small);
  }

  :global(.switcher .parent-link) {
    text-decoration: none;
    display: flex;
  }
  :global(.switcher .card) {
    display: flex;
    flex-direction: column;
    box-shadow: 3px 3px 3px #eeecdc, -3px -3px 3px var(--lightlightwhitish);
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
    transition: box-shadow 200ms ease-out, background-color 200ms ease-out;
  }
  
  :global(.switcher .card:hover) {
    box-shadow: 5px 5px 15px #eeecdc, -5px -5px 15px var(--lightlightwhitish);
  }
  
  :global(.switcher .card-image) {
    min-width: 100%;
    width: 100%;
    border: 1px solid var(--red);
    aspect-ratio: 16 / 9;
    flex: 2;
    padding: 0.5rem;
  }

  :global(.card-body) {
    display: flex;
    flex-direction: column;
    flex: 3;
    padding: var(--space-xsmall);
  }

  :global(.card-body > * + *){
    margin-top: 1rem;
  }
  :global(.card h3) {
    color: var(--red);
    text-align: center;
    letter-spacing: 0.2em;
    font-weight: 900;
    font-size: clamp(var(--size-500), 3vw, var(--size-600));
    text-align: center;
    transition: color 300ms ease-out;
  }

  :global(.card:hover h3) {
    color: var(--darkblue);
  }
  :global(p) {
    color: var(--blackish);
  }
</style>