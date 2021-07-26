<script>
    import IntroImage from '../../IntroImage.svelte'
</script>

<section id="intro" class="flow space__outer_bottom">
    <div class="intro-border-top"></div>

    <section class="intro_greeting">
        <h2 class="hero-callout">
            <span class="greeting-group">
                <span class="greeting first">
                    Jeff
                </span>
                <span class="greeting last">
                    Caldwell
                </span>
            </span>
            <span class="sub-greeting">Makes Websites.</span>
        </h2>
    </section>
    <IntroImage />

    <div class="intro-border-bottom"></div>
</section>



<style lang="scss">
    #intro {
        position: relative;
        display: flex;
        align-items: center;
        z-index: 20;
        // font-family: var(--sans);
        // background-blend-mode: multiply;
        // background-color: var(--whitish);
        // background-image: url('/images/Grunge01.svg');
        // background-repeat: repeat-x;
        // background-clip: content-box;
        // background-position-y: var(--space);
    }

    .intro-border-top {
        z-index: 10;
        border-top: calc(1vw / 3) solid var(--red);
        position: absolute;
        top: calc(var(--space));
        right: 0;
        left: 0;
        bottom: 0;
        pointer-events: none;
        box-shadow: var(--elevation-3);
    }
    .intro-border-bottom {
      position: absolute;
      z-index: 60;
      border: calc(1vw / 3) solid var(--red);
      border-top: none;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
    .intro_greeting {
        z-index: 100;
        flex: 2;
        display: flex;
        flex-direction: column;
    }
    .hero-callout {
        display: flex;
        flex-direction: column;
        max-width: 60ch;
        margin: var(--space-small);
        line-height: 1;
    }
    .greeting-group {
        display: flex;
        flex-direction: column;
    }

    .greeting-group > * + * {
        margin-top: var(--space-small);
    }
	.greeting {
        -webkit-text-stroke: .2vw var(--red);
        word-break: break-word;
        word-wrap: break-word;
        max-width: 10ch;
        color: var(--whitish);
        font-size: clamp(var(--size-900), 9vw, var(--size-1200));
        letter-spacing: .05em;
        text-shadow: var(--elevation-1);
        line-height: 0.8;
	}
    .greeting::selection {
        color: var(--red);
    }
    .sub-greeting {
        font-size: clamp(var(--size-700), 5vw, var(--size-1000));
        letter-spacing: 0.25rem;
        color: var(--darkblue);
        margin-top: var(--space-small);
    }

    .message {
        font-size: clamp(var(--size-500), 3vw, var(--size-600));
        max-width: 50ch;
        letter-spacing: 0.25rem;
    }

    a {
        color: var(--red);
        text-decoration-thickness: 1px;
        text-underline-offset: auto;
        transition: text-decoration-thickness 300ms ease-out;
    }

    a:hover {
        text-decoration-thickness: 6px;
    }

    @media screen and (max-width: 550px) {
        #intro {
            justify-content: center;
            margin-inline: auto;
            background-size: 35vw;
            background-position: top right var(--space);
        }
        .sub-greeting {
            margin-top: 0;
            font-size: var(--font-size-large);
            padding-top: 1rem;
        }
        .greeting-group {
            flex-direction: row;
            justify-content: center;
        }

        .greeting-group > * + * {
            margin-top: unset;
        }
        .greeting {
            margin: 0;
            word-break: unset;
            max-width: unset;
            -webkit-text-stroke: 0.33vw var(--red);
            font-size: clamp(var(--size-800), 6vw, var(--size-900));
            flex-direction: row;
        }
        .hero-callout {
            text-align: center;
        }
    }

    @media screen and (max-width: 310px) {
      .greeting-group {
        flex-direction: column;
      }
    }

    @media screen and (min-width: 2000px) {
        .greeting {
            -webkit-text-stroke: calc(1vw / 8) var(--red);
        }
    }
</style>
