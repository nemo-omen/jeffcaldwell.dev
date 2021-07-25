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
    margin: 0;
    z-index: 50;
    z-index: 10;
    flex: 1;
    pointer-events: none;
  }

    img { 
      z-index: 5;
      pointer-events: all;
    }

    @media screen and (max-width: 550px) {
      .intro-image {
        position: absolute;
        top: calc(var(--space) * -1);
        right: 50%;
        transform: translateX(50%);
        width: 24vw;
        }
    }

    @media screen and (max-width: 350px) {
      .intro-image {
        top: calc(var(--space-small) * -1);
      }
    }

    @media screen and (max-width: 603px) {
        .intro-image {
            max-width: 40vw;
        }
    }

    @media screen and (max-width: 769px) {
        .intro-image {
            max-width: 37vw;
        }
    }

    @media screen and (max-width: 1700px) {
        .intro-image {
            max-width: 32vw;
        }
    }
</style>