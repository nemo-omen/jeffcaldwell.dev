<script>
    import IntroImage from '../../IntroImage.svelte'
</script>

<section id="intro" class="flow space__outer_bottom">
    <div class="intro-border-top"></div>

    <section class="intro_greeting">
        <h2 class="hero-callout">
            <span class="greeting">
                Jeff Caldwell
            </span>
            <br>
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
        font-family: var(--sans);
    }

    .intro-border-top {
        z-index: -1;
        border-top: calc(1vw / 3) solid var(--red);
        position: absolute;
        top: var(--space);
        right: 0;
        left: 0;
        bottom: 0;
        pointer-events: none;
    }
    .intro-border-bottom {
      position: absolute;
      z-index: 10;
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
        justify-self: stretch;
    }
    .hero-callout {
        max-width: 60ch;
        margin: var(--space-small);
        padding: 0;
        display: block;
        line-height: 1;
    }
    .hero-callout * {
        display: block;
    }
	.greeting {
        -webkit-text-stroke: calc(1vw / 4.5) var(--red);
        word-break: break-word;
        max-width: 8ch;
        color: var(--whitish);
        font-size: clamp(var(--size-900), 9vw, 9.969rem);
        font-weight: 700;
        letter-spacing: .05em;
        line-height: 1;
	}
    .greeting::selection {
        color: var(--red);
    }
    .sub-greeting {
        font-size: clamp(var(--size-600), 5vw, var(--size-900));
        font-weight: 900;
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
            // align-items: end;
            margin-inline: auto;
            background-size: 35vw;
            background-position: top right var(--space);
        }
        .sub-greeting {
            // text-align: left;
            margin-top: 0;
            font-size: clamp(var(--size-400), 4vw, var(--size-700));
            // line-height: 0;
        }
        .greeting {
            margin: 0;
            word-break: unset;
            max-width: unset;
            -webkit-text-stroke: calc(1vw / 3) var(--red);
            font-size: clamp(var(--size-700), 6vw, var(--size-800));
        }
        .hero-callout {
            text-align: center;
        }
    }
</style>
