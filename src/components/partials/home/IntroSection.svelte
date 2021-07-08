<script>
    import IntroImage from '../../IntroImage.svelte'
</script>

<section id="intro" class="flow space__outer_bottom">
    <section class="intro_greeting">
        <h2 class="hero-callout">
            <span class="greeting">
                Jeff<br>Caldwell
            </span>
            <br>
            <span class="sub-greeting">Makes Websites.</span>
        </h2>
    </section>
    <IntroImage />
</section>



<style lang="scss">
    #intro {
        position: relative;
        display: flex;
        align-items: center;
        z-index: 20;
        font-family: var(--sans);
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
        color: var(--whitish);
        font-size: clamp(var(--size-900), 6vw, 9.969rem);
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
        .sub-greeting {
            text-align: center;
        }
        .greeting {
            -webkit-text-stroke: calc(1vw / 3) var(--red);
        }
    }
</style>
