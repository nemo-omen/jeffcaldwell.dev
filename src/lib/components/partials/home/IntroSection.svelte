<script>
    import IntroImage from '../../IntroImage.svelte';

    const shuffle = function(array) {
        
        // simple Fisher-Yates shuffle
        for(let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    };

    class ArrayList extends Array {
        shuffle() {
            let copy = new ArrayList(...this);
            for(let i = copy.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));

                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            return copy;
        }

        clone() {
            return new ArrayList(...this);
        }

        equals(other) {
            for(let i = 0; i < this.length; i++) {
                if(this[i] != other[i]) {
                    return false;
                }
            }
            return true;
        }
    }

    const numbers = new ArrayList(1,2,3,4,5,6,7);
    console.log('numbers: ', numbers);
    const numbers2 = numbers.clone();
    console.log('numbers2: ', numbers2);
    const numbers3 = numbers2.shuffle();
    console.log('numbers3: ', numbers3);
</script>

<section class="intro-section">
    <div id="intro">
        <section class="intro_greeting">
            <h2 class="greeting">
                Jeff Caldwell
            </h2>
            <a href="/work" class="sub-greeting">
                Makes Websites
                <div class="grunge-bg"></div>
            </a>
        </section>
    </div>
    <IntroImage />
    
    <div class="intro-message">
        <p>
            I'm a front-end developer who loves making fast, accessible, great-looking websites.
        </p>
        <div class="panel-control flex">
            <a href="/work" class="button">Check out My Work</a>
            <!-- <a href="/writing" class="button">WRITING</a> -->
        </div>
    </div>
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
        z-index: 20;
        background-repeat: repeat-x;
        padding: var(--space-small);
    }

        .intro-message {
            grid-column: 1 / 4;
            display: flex;
            flex-direction: column;
            gap: var(--space);
            justify-content: center;
            align-items: center;
            background-size: contain;
            z-index: 60;
            padding: var(--space-small);
            p {
                font-family: var(--sans);
                text-transform: uppercase;
                font-weight: 900;
                letter-spacing: 0.1em;
                color: var(--whitish);
                text-align: center;
                font-size: clamp(var(--size-400), 4vw, var(--size-800));
                line-height: 1.2;
                text-shadow: var(--elevation-1);
                -webkit-text-stroke: .05em var(--primary);
            }
            .sub-message {
                font-size: var(--font-size-normal);
            }
            .panel-control {
                gap: var(--space);
            }
        }
        .callout-link {
            grid-column: 3;
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
            text-underline-offset: 0.25em;
            background: var(--secondary);
            padding: 0.55em;
            box-shadow: var(--panel-elevation);
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
        font-family: var(--cover-alt-3);
        color: var(--accent-tertiary);
        -webkit-text-stroke: 0.1vw rgb(var(--primary-rgb), 0.8);
        letter-spacing: .075em;
        text-shadow: 0.075em 0.075em 0 rgb(var(--primary-rgb), 0.9);
        z-index: 60;
        font-size: clamp(var(--size-600), 9vw, var(--size-1200));
        text-align: center;
	}
    .greeting::selection {
        color: var(--red);
    }
    .sub-greeting {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        // letter-spacing: 0.25rem;
        line-height: 1;
        padding-bottom: 0.25em;
        color: var(--primary);
        font-family: var(--cover-alt-4);
        // font-family: var(--display);
        font-size: clamp(var(--size-400), 6vw, var(--size-1200));
        text-align: center;
        text-shadow: 0.025em 0.025em 0 rgb(var(--primary-rgb), 0.4);
        text-decoration-thickness: 0.05em;
        text-underline-offset: 0.125em;
        transition: all 300ms ease-out;
        filter: drop-shadow(0.03em 0.03em 0 rgb(var(--primary-rgb), 0.5));
        .grunge-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background-image: url('/images/Grunge05_White.svg');
            clip-path: polygon(3% 30%, 0 100%, 97% 80%, 100% 0%);
            background-color: var(--accent-tertiary);
            background-repeat: repeat-x;
            background-size: contain;
            // margin-inline: var(--space);
            margin-inline: var(--space-xsmall);
            transition: clip-path 0.2s ease-out, background 0.3s ease-out;
        }
        &:hover {
            text-shadow: 0.05em 0.05em 0 rgb(var(--primary-rgb), 0.4);
            filter: drop-shadow(0.1em 0.1em 0 rgb(var(--primary-rgb), 0.5));
            .grunge-bg {
            background-color: var(--secondary);
            clip-path: polygon(3% 5%, 0 100%, 97% 95%, 100% 0%);
        }
        }
    }
    .sub-greeting:hover {
        text-decoration-thickness: 0.05em;
        color: var(--whitish);
    }

    .sub-greeting:focus {
        background-color: transparent;
        outline-width: 3px;
        text-decoration: none !important;
    }

    @media screen and (max-width: 767px) {
        #intro {
            grid-column: 1 / 4;
        }
        .intro-message {
            grid-column: 1 / 3;
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
        .sub-greeting .grunge-bg {
            margin-inline: 0;
        }
    }
    @media screen and (max-width: 550px) {
        .intro-message {
            grid-column: 1 / 4;
            padding-inline: 0;
        }
    }

    // Animations

    @keyframes calloutpulse
</style>
