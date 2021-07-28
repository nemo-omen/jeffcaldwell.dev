<script>
    import IntroImage from '../../IntroImage.svelte'
</script>

<section class="intro-section">
    <IntroImage />
    <div id="intro" class="space__outer_bottom">
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
    </div>
    
    <div class="intro-message">
        <p class="landing-description">
            I make fast, accessible, great-looking websites and web applications. <a href="/hire">Get in touch</a> and let's talk about how I can help you build sites your users will love.
        </p>
    </div>
</section>



<style lang="scss">
    .intro-section {
        z-index: 10;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(20, 1fr);
        align-items: end;
    }
    #intro {
        display: flex;
        justify-content: start;
        background-size: contain;
        position: relative;
        z-index: 20;
        background-image: url('images/Grunge01.svg');
        background-repeat: repeat-x;
        box-shadow: var(--elevation-4);
        background-size: contain;
        grid-column: 1 / 10;
        grid-row: 2 / 4;
        border: 0.4vw solid var(--red);
        }

        .intro-message {
            grid-column: 1 / 10;
            grid-row: 4 / 10;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--whitish);
            padding: var(--space-xsmall);
            box-shadow: var(--elevation-3);
            border: calc(1vw / 3) solid var(--darkblue);
        }
    .intro-greeting {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
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
        // flex-direction: column;
    }
	.greeting {
        -webkit-text-stroke: .2vw var(--red);
        word-break: break-word;
        word-wrap: break-word;
        max-width: 10ch;
        color: var(--whitish);
        letter-spacing: .05em;
        text-shadow: 0.075em 0.075em 0 rgb(var(--primary-rgb), 0.9);
        line-height: 0.8;
        z-index: 60;
        font-size: clamp(var(--size-800), 7vw, var(--size-1100));
	}
    .greeting::selection {
        color: var(--red);
    }

    .first {
            margin-right: 0.25em !important;
        }
    .sub-greeting {
        letter-spacing: 0.25rem;
        color: var(--darkblue);
        margin-top: var(--space-xsmall);
        font-size: var(--font-size-medium);
    }
    .sub-greeting a {
        color: var(--primary);
        text-shadow: 0.05em 0.05em 0 rgb(var(--primary-rgb), 0.4);
        // text-shadow: var(--elevation-1);
        // text-shadow: 0.05em 0.05em 0 var(--secondary);
        text-decoration-thickness: 0.05em;
        text-underline-offset: 0.125em;
        transition: all 300ms ease-out;
    }
    .sub-greeting a:hover {
        // text-shadow: 0.05em 0.05em 0 var(--primary);
        text-decoration-thickness: 0.05em;
        color: var(--secondary);
    }

    .sub-greeting a:focus {
        background-color: transparent;
        outline-width: 3px;
        text-decoration: none !important;
    }
    .landing-description {
        text-align: center;
        font-size: var(--font-size-normal);
        word-wrap: normal;
        word-break: keep-all;
    }
    @media screen and (min-width: 550px) {
        #intro {
            flex-direction: row;
            justify-content: flex-start;
        }
        .sub-greeting {
            font-size: clamp(var(--size-800), 5vw, var(--size-900));
        }
    }
</style>
