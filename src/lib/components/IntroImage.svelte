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
    min-width: 38%;
    max-width: 38%;
    position: absolute;
    bottom: 0;
    right: 0;
    clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
  }

    img { 
      z-index: 5;
    }


    @media screen and (max-width: 550px) {
      .intro-image {
        position: absolute;
        top: calc(var(--space) * -3);
        right: 50%;
        transform: translateX(50%);
        min-width: 25%;
        max-width: 25%;
      }
    }
    @media screen and (max-width: 360px) {
      .intro-image {
        top: calc(var(--space) * -3);
      }
    }
    
    @media screen and (max-width: 315px) {
      .intro-image {
        top: calc(var(--space-small) * -5.5);
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