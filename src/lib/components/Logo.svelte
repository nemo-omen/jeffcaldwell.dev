<script>
  const red = '#ff6347';
  const darkBlue = '#373043';
  const whitish = '#ffeae6';

  $: logoColor = red;

  let isHovering = false;

  function setHoverStyles() {
    isHovering = !isHovering;
  }

</script>
<div class="logo" on:mouseenter={setHoverStyles} on:mouseleave={setHoverStyles}>
  <!-- Idle Logo -->
  <svg class="logo-svg" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="letter" d="M41.478 26.7272L48.2113 30.3673C47.0642 31.9297 45.6261 33.1846 43.897 34.132C42.168 35.0795 40.281 35.5532 38.236 35.5532C35.9417 35.5532 33.8469 34.9631 31.9516 33.783C30.0729 32.6029 28.5683 31.0238 27.4377 29.0459C26.3238 27.0513 25.7668 24.849 25.7668 22.4388C25.7668 20.0121 26.3238 17.8015 27.4377 15.8069C28.5683 13.8123 30.0729 12.225 31.9516 11.0448C33.8469 9.86472 35.9417 9.27466 38.236 9.27466C40.281 9.27466 42.168 9.74837 43.897 10.6958C45.6261 11.6432 47.0642 12.9148 48.2113 14.5104L41.478 18.1505C40.547 17.2197 39.4663 16.7543 38.236 16.7543C37.2884 16.7543 36.4404 17.0203 35.6923 17.5521C34.9441 18.084 34.3456 18.7821 33.8967 19.6464C33.4645 20.5108 33.2483 21.4416 33.2483 22.4388C33.2483 23.4195 33.4645 24.342 33.8967 25.2063C34.3456 26.054 34.9441 26.7438 35.6923 27.2757C36.4404 27.8076 37.2884 28.0735 38.236 28.0735C39.4497 28.0735 40.5303 27.6247 41.478 26.7272Z" fill={isHovering ? red : whitish}/>
    <path class="letter" d="M7.53137 35.5533C6.16807 35.5533 4.82972 35.3206 3.5163 34.8552C2.21951 34.3898 1.04741 33.7083 0 32.8107L4.78815 27.0763C5.07079 27.2924 5.43655 27.5168 5.88544 27.7495C6.33433 27.9656 6.88297 28.0736 7.53137 28.0736C8.71178 28.0736 9.71763 27.6498 10.5489 26.8021C11.3968 25.9544 11.8208 24.9488 11.8208 23.7853V0H19.3022V23.7853C19.3022 25.9461 18.7702 27.9157 17.7062 29.6942C16.6422 31.4727 15.2207 32.8938 13.4417 33.9576C11.6628 35.0214 9.69269 35.5533 7.53137 35.5533Z" fill={isHovering ? red : whitish}/>
  </svg>
</div>

<style lang="scss">
  .logo {
    height: clamp(3rem, 4vw, 5rem);
    width: clamp(3rem, 4vw, 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--red);
    border: 3px solid transparent;
    padding: 0.5rem;
    transition: 
      background 300ms ease-out,
      border-color 300ms ease-out 100ms,
      box-shadow 200ms ease-out 200ms;
  }

  .logo:hover {
    border-color: var(--red);
    background-color: var(--whitish);
    box-shadow: 0.5em 0.5em 0 var(--primary);
  }
  .logo-svg {
    height: clamp(2.5rem, 3.5vw, 4.5rem);
  }

  .rect, .letter {
    transition: fill 300ms ease-out;
  }

  .site-head-logo {
    position: relative;
  }
</style>