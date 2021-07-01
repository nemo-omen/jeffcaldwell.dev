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
  <svg viewBox="0 0 121 102" xmlns="http://www.w3.org/2000/svg" class="logo-svg" aria-hidden="true" focusable="false">
    <g fill={tColor} class="logo-t">
      <path d="M100 1V26.9091H68.4303V101H32.7229V26.9091H1V1H100Z" />
    </g>
    <g fill={dotColor} class="logo-dot">
      <circle cx="100" cy="84" r="17"/>
    </g>
  </svg>
</div>

<style lang="scss">
  .logo {
    transition: all 300ms ease-out;
  }
  .logo-svg {
    height: clamp(2rem, 4vw, 5rem);
  }

  .logo-t, .logo-dot {
    transition: fill 300ms ease-out;
  }
</style>