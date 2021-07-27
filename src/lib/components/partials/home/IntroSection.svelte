<script>
    import IntroImage from '../../IntroImage.svelte'
</script>

<section id="intro" class="flow space__outer_bottom">

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
            <span class="sub-greeting"><a href="/work">Makes Websites</a></span>
        </h2>
    </section>
    <IntroImage />
</section>



<style lang="scss">
    #intro {
        position: relative;
        z-index: 20;
        border: calc(1vw / 3) solid var(--red);
        margin-top: var(--space);
        background-image: url('images/Grunge01.svg');
        background-repeat: repeat-x;
        box-shadow: var(--elevation-4);
        background-size: contain;
    }
    .intro_greeting {
        z-index: 100;
        max-width: 63%;
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
        text-shadow: var(--elevation-1);
        color: var(--darkblue);
        margin-top: var(--space-small);
    }
    .sub-greeting a {
        color: var(--primary);
        text-decoration-thickness: 0.05em;
        text-underline-offset: 0.125em;
        transition: all 300ms ease-out;
    }
    .sub-greeting a:hover {
        text-decoration-thickness: 0.075em;
        color: var(--secondary);
    }

    .sub-greeting a:focus {
        background-color: transparent;
        outline-width: 3px;
        text-decoration: none !important;
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
            display: flex;
            justify-content: center;
            margin-inline: auto;
            background-size: contain;
        }
        .intro-greeting {
            width: 100%;
            max-width: 100%;
            min-width: 100%;
        }
        .sub-greeting {
            margin-top: 0;
            font-size: var(--font-size-large);
            padding-top: 1rem;
            text-shadow: var(--elevation-05);
        }
        .greeting-group {
            flex-direction: row;
            justify-content: center;
        }
        .first {
            margin-right: 0.5rem !important;
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
            text-shadow: var(--elevation-05);
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
