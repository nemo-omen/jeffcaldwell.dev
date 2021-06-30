<script>
  import { cubicOut } from 'svelte/easing';
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
  <svg viewBox="0 0 121 121" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
    <g fill={tColor} class="logo-t">
      <path d="M100 20V45.9091H68.4303V120H32.7229V45.9091H1V20H100Z" />
    </g>
    <g fill={dotColor} class="logo-dot">
      <circle cx="100" cy="103" r="17" />
    </g>
  </svg>
</div>

<style lang="scss">
  .logo {
    transition: all 300ms ease-out;
    max-height: 5vw;
  }

  .logo-svg {
    height: 5vw;
  }

  .logo-t, .logo-dot {
    transition: fill 300ms ease-out;
  }
</style>