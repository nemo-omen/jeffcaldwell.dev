<script>
  import Icon from './Icon.svelte';
</script>

<footer>
  <div class="footer-inner">
    <p class="footer-copy">
      &copy 2021 Jeff Caldwell
    </p>
    <section class="footer-menu">
      <ul class="menu">
        <li><a href="https://twitter.com/trainingm0ntage" aria-label="Twitter"><Icon name="twitter" /></a></li>
        <li><a href="https://github.com/nemo-omen" aria-label="GitHub"><Icon name="github" /></a></li>
        <li><a href="https://www.linkedin.com/in/jeff-caldwell-4424181a/" aria-label="LinkedIn"><Icon name="linkedin" /></a></li>
        <li><a href="https://www.polywork.com/trainingmontage" aria-label="PolyWork"><Icon name="polywork" /></a></li>
      </ul>
    </section>
  </div>
</footer>

<style>
 footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--red);
  color: var(--whitish);
  padding: var(--space-small);
 }
 .footer-inner {
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   gap: var(--space);
 }
 .footer-copy {
   font-size: var(--font-size-medium);
   line-height: 1;
   margin: 0;
   padding: 0;
 }
 .menu {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 2rem;
   list-style-type: none;
   margin: 0;
   padding: 0;
 }
 .menu li a {
   font-size: var(--font-size-medium);
   color: var(--whitish);
   transition: color 300ms ease-out;
  }
  .menu li a:hover {
    color: var(--darkblue);
  }
</style>