<script>
  const red = '#ff6347';
  const whitish = '#ffeae6';

  let tColor = whitish;
  let dotColor = red;

  function setHoverStyles() {
    if(tColor === whitish) {
      tColor = red;
      dotColor = whitish;
    } else {
      tColor = whitish;
      dotColor = red;
    }
  }

</script>
<div class="logo" on:mouseenter={setHoverStyles} on:mouseleave={setHoverStyles}>
  <!-- <svg viewBox="0 0 121 102" xmlns="http://www.w3.org/2000/svg" class="logo-svg" aria-hidden="true" focusable="false">
    <g fill={tColor} class="logo-t">
      <path d="M100 1V26.9091H68.4303V101H32.7229V26.9091H1V1H100Z" />
    </g>
    <g fill={dotColor} class="logo-dot">
      <circle cx="100" cy="84" r="17"/>
    </g>
  </svg> -->
  <svg viewBox="0 0 88 65" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
    <g fill={tColor} class="logo-t">
      <path d="M57.328 0.639999V37.888C57.328 46.464 54.768 53.12 49.648 57.856C44.528 62.592 37.136 64.96 27.472 64.96C20.368 64.96 14.672 63.712 10.384 61.216C6.15999 58.72 3.24799 55.296 1.64799 50.944C0.11199 46.592 -0.24001 41.664 0.59199 36.16L22.768 32.416C21.936 38.432 22.032 42.56 23.056 44.8C24.144 47.04 26 48.16 28.624 48.16C30.8 48.16 32.4 47.232 33.424 45.376C34.448 43.52 34.96 40.48 34.96 36.256V0.639999H57.328Z"/>
    </g>
    <g fill={dotColor} class="logo-dot">
      <circle cx="75.5" cy="51.5" r="12.5"/>
    </g>
    </svg>
    
      
</div>

<style lang="scss">
  .logo {
    background: var(--darkdarkblue);
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    transition: border-color 300ms ease-out;
  }

  .logo:hover {
    border-color: var(--whitish);
  }
  .logo-svg {
    height: clamp(2rem, 4vw, 3rem);
  }

  .logo-t, .logo-dot {
    transition: fill 300ms ease-out;
  }
</style>