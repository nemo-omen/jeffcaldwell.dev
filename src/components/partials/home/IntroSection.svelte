<script>
	
</script>

<section id="intro" class="flow">
    <section class="intro_greeting">
        <h2 class="greeting">Jeff<br>Caldwell</h2>
        <h3 class="sub-greeting">Makes Websites.</h3>
    </section>
    <section class="flex-absolute-graphic">
        <img src="/MeIllustration.svg" alt="Illustration of Jeff Caldwell.">
    </section>
</section>



<style lang="scss">
    #intro {
        position: relative;
        display: flex;
        z-index: 20;
        // background-image: url('/MeIllustration.svg');
        // background-position: right bottom;
        // background-size: contain;
        // background-repeat: no-repeat;
        padding-block: var(--space);
    }
    .intro_greeting {
        z-index: 100;
    }
	.greeting {
        font-size: clamp(var(--size-900), 8vw, 9.969rem);
        font-weight: 900;
        letter-spacing: .05em;
        color: var(--red);
        line-height: 1;
	}
    .sub-greeting {
        font-size: clamp(var(--size-600), 5vw, var(--size-900));
        font-weight: 900;
        letter-spacing: 0.25rem;
    }
    .flex-absolute-graphic {
        margin: 0;
        z-index: 50;
        position: absolute;
        // top: calc(var(--space) * -1);
        bottom: 0;
        z-index: -1;
        // bottom: calc((var(--space) * -1) + 1rem);
        right: 0;
        // max-width: clamp(155px, 25vw, 595px);
        max-width: 29vw;
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

    #cta {
        display: flex;
        justify-content: center;
        margin-top: var(--space);
    }
    .cta-button {
        background-color: var(--whitish);
        color: var(--darkblue);
        text-decoration: none;
        padding: var(--space-xsmall);
        border-radius: 0.5rem;
        font-family: var(--sans);
        font-weight: 700;
        font-size: clamp(var(--size-400), 4vw, var(--size-500));
        letter-spacing: 2px;
        text-transform: uppercase;
        border: 2px solid transparent;
        transition: background 300ms ease-out, border-color 300ms ease-out, color 300ms ease-out;
    }

    .cta-button:hover {
        background: var(--darkblue);
        color: var(--whitish);
        border-color: var(--whitish);
    }

    @media screen and (max-width: 463px) {
        #intro {
            justify-content: center;
            align-items: end;
            margin-inline: auto;
            background-size: 35vw;
            background-position: top right var(--space);
        }
        .flex-absolute-graphic {
            position: absolute;
            top: -1rem;
            right: 10vw;
            max-width: 35vw;
        }
        .sub-greeting {
            text-align: center;
        }
    }

    @media screen and (max-width: 603px) {
        .flex-absolute-graphic {
            max-width: 40vw;
        }
    }

    @media screen and (max-width: 769px) {
        .flex-absolute-graphic {
            max-width: 37vw;
        }
    }
</style>
