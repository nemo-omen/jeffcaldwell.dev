<script>

</script>

<section class="intro-image">
  <div class="intro-image-border-top"></div>
  <img class="image" src="/MeIllustration.svg" alt="Illustration of Jeff Caldwell.">
  <div class="intro-image-border-bottom"></div>
</section>

<style>
  .intro-image {
    margin: 0;
    z-index: 50;
    position: absolute;
    bottom: 0;
    z-index: 10;
    right: 0;
    max-width: 29vw;
    }

    .intro-image-border-top {
      z-index: -1;
      border-top:8px solid var(--red);
      position: absolute;
      top: var(--space);
      right: 0;
      left: 0;
      bottom: 0;
    }
    .intro-image-border-bottom {
      position: absolute;
      z-index: 10;
      border: 8px solid var(--red);
      border-top: none;
      top: var(--space);
      right: 0;
      left: 0;
      bottom: 0;
    }

    img { 
      z-index: 5;
    }

    @media screen and (max-width: 463px) {
      .intro-image {
        position: absolute;
        top: -1rem;
        right: 10vw;
        max-width: 35vw;
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