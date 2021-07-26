<script>
  function imgFunction() {
    console.log('DOOOKIE!!');
  }
</script>

<section class="intro-image">
  <img class="image" src="/MeIllustration.svg" alt="Illustration of Jeff Caldwell." on:mouseenter={imgFunction} on:mouseleave={imgFunction}>
</section>

<style>
  .intro-image {
    z-index: 50;
    flex: 1;
    pointer-events: none;
    overflow: hidden;
    min-width: 38%;
    max-width: 38%;
    position: absolute;
    bottom: 0;
    right: 0;
    /* background: var(--accent-secondary); */
  }

    img { 
      z-index: 5;
      pointer-events: all;
      /* filter: drop-shadow(var(--elevation-05)); */
      clip-path: view-box;
    }

    @media screen and (max-width: 550px) {
      .intro-image {
        position: absolute;
        top: calc(var(--space) * -4.5);
        right: 50%;
        transform: translateX(50%);
        width: 24vw;
      }
    }
    @media screen and (max-width: 360px) {
      .intro-image {
        top: calc(var(--space) * -4);
      }
    }
    
    @media screen and (max-width: 315px) {
      .intro-image {
        top: calc(var(--space-small) * -7.5);
      }
    }

    @media screen and (max-width: 603px) {
        /* .intro-image {
            max-width: 40vw;
        } */
    }

    @media screen and (max-width: 769px) {
        /* .intro-image {
            max-width: 37vw;
            min-width: 37vw;
        } */
    }

    /* @media screen and (max-width: 1700px) { */
        /* .intro-image {
          min-width: 30vw;
          max-width: 30vw;
        }
    } */

    @media screen and (min-width: 2000px) {
      .intro-image {
        max-width: 20vw;
        min-width: 20vw;
      }
    }
</style>