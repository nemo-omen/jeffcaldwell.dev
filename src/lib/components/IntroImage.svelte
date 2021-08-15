<script>
  function imgFunction() {
    console.log('DOOOKIE!!');
  }
</script>

<section class="intro-image panel">
    <img src="/images/MeComicIllustration.png" alt="Illustration of Jeff Caldwell at a computer">
    <p id="main-image-caption" class="panel-caption" width="1163" height="1163">
      <a href="/about" class="panel-link">
        But who is he?
      </a>
    </p>
</section>

<style lang="scss">
  .intro-image {
    position: relative;
    min-height: calc(var(--vu) * 8);
    min-width: calc(var(--vu) * 8);
    display: flex;
    align-items: flex-end;
    background-color: var(--whitish);
    background-image: url('/images/dots006.svg');
    background-size: cover;
    box-shadow: var(--panel-elevation);
    img {
      width: 100%;
      height: auto;
      aspect-ratio: attr(width) / attr(height);
    }
  }

  #main-image-caption {
    position: absolute;
    top: 0;
    left: 0;
  }
  .panel-link {
    color: var(--primary);
  }
  .panel-link:hover {
    color: var(--secondary);
  }
  .panel-link:focus {
    background: var(--accent-secondary);
  }

  @media screen and (max-width: 550px) {
    .intro-image {
      flex-direction: column;
      justify-content: space-between;
      grid-column: 1 / 4;

      img {
        order: 2;
      }
    }
  }
  </style>