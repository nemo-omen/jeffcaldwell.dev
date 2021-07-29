<script>
    import IntroImage from '../../IntroImage.svelte'
</script>

<section class="intro-section">
    <div id="intro">
        <section class="intro_greeting">
            <h2 class="greeting">
                Jeff Caldwell
            </h2>
            <p class="sub-greeting"><a href="/work">Makes Websites</a></p>
        </section>
    </div>
    <IntroImage />
    
    <div class="intro-message">
        <p>
            I make fast, accessible, great-looking websites your users will love.
        </p>
    </div>
    <a class="callout-link button" href="hire">
        Let's Talk!
    </a>
</section>



<style lang="scss">
    .intro-section {
        z-index: 10;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1vw;
    }

    #intro {
        grid-column: 1 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        background-size: contain;
        z-index: 20;
        background-image: url('/images/Grunge01.svg');
        background-repeat: repeat-x;
        box-shadow: var(--elevation-1);
        background-size: cover;
        border: 0.4vw solid var(--secondary);
        padding: var(--space-small);
    }

        .intro-message {
            grid-column: 2 / 4;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: var(--whitish);
            background-image: url('/images/Grunge01.svg');
            background-size: contain;
            box-shadow: var(--elevation-1);
            z-index: 60;
            border: 0.3vw solid var(--darkblue);
            padding: var(--space-small);
            p {
                font-family: var(--sans);
                text-transform: uppercase;
                font-weight: 900;
                letter-spacing: 0.1em;
                color: var(--whitish);
                text-align: center;
                font-size: clamp(var(--size-400), 3vw, var(--size-700));;
                line-height: 1.2;
                text-shadow: var(--elevation-1);
                -webkit-text-stroke: .05em var(--primary);
            }
            .sub-message {
                font-size: var(--font-size-normal);
            }
        }
        .callout-link {
            grid-column: 1;
            grid-row: 2;
            display: flex;
            justify-content: center;
            z-index: 60;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: var(--display);
            font-size: var(--font-size-xl);
            letter-spacing: 0.075em;
            color: var(--whitish);
            text-decoration: none;
            background: var(--secondary);
            padding: 0.55em;
            box-shadow: var(--elevation-1);
            transition: 
                background 300ms ease-out;
        }
        .callout-link:hover {
            color: var(--whitish);
            background: var(--green);
            color: var(--whitish);
        }
        .callout-link:focus {
            background: transparent;
            color: var(--whitish);
            outline-color: var(--whitish);
        }
	.greeting {
        -webkit-text-stroke: .2vw var(--secondary);
        color: var(--whitish);
        letter-spacing: .05em;
        text-shadow: 0.075em 0.075em 0 rgb(var(--primary-rgb), 0.9);
        z-index: 60;
        font-size: clamp(var(--size-600), 9vw, var(--size-1200));
        text-align: center;
	}
    .greeting::selection {
        color: var(--red);
    }
    .sub-greeting {
        letter-spacing: 0.25rem;
        color: var(--darkblue);
        font-family: var(--display);
        font-size: clamp(var(--size-400), 6vw, var(--size-1200));
        text-align: center;
    }
    .sub-greeting a {
        color: var(--primary);
        text-shadow: 0.05em 0.05em 0 rgb(var(--primary-rgb), 0.4);
        text-decoration-thickness: 0.05em;
        text-underline-offset: 0.125em;
        transition: all 300ms ease-out;
    }
    .sub-greeting a:hover {
        text-decoration-thickness: 0.05em;
        color: var(--secondary);
    }

    .sub-greeting a:focus {
        background-color: transparent;
        outline-width: 3px;
        text-decoration: none !important;
    }

    @media screen and (max-width: 767px) {
        .intro-message {
            grid-column: 1 / 4;
            grid-row: 2;
            p {
                color: var(--primary);
                -webkit-text-stroke: unset;
            }
        }
        .callout-link {
            grid-row: unset;
            grid-column: 1 / 4;
        }
    }
</style>
