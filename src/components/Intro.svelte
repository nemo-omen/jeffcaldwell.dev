<script>
	import Avatar from './Avatar.svelte';
</script>

<article id="intro">
    <section class="intro_greeting">
        <h2 class="greeting">I'm <a href="#">Jeff</a> and I make fast, accessible, good-looking websites.</h2>
        <!-- <div class="avatar" aria-hidden="true">
            <Avatar />
        </div> -->
    </section>
    <section class="intro_message">
        <section class="message">
            <p>I'm a web developer based in Texas who specializes in the design and development of sites and apps for small businesses, nonprofits, and people like you.</p>
        </section>
    </section>
</article>
<section id="cta">
    <a href="/hire" class="cta-button">Check Out My Services</a>
</section>



<style lang="scss">
    #intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--red);
        gap: var(--space);
        padding-block: var(--space);
        margin-bottom: var(--space);
    }
	.intro_greeting {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--space-small);
        margin-inline: auto;
		background-color: var(--red);
	}
	.greeting {
        width: var(--width-body);
        font-family: var(--sans);
        font-weight: 900;
        max-width: 40ch;
		font-size: clamp(var(--size-600), 5vw, var(--size-900));
		letter-spacing: 0.5rem;
        grid-area: Greeting;
        text-align: center;
        order: 2;
        color: var(--whitish);
	}
	.avatar {
        width: clamp(20vw, 80px, 30vw);
        order: 1;
	}

    .intro_message {
        width: 100%;
    }
    .message {
        color: var(--blackish);
        width: var(--width-body);
        margin-inline: auto;
        text-align: center;
    }

    .message p {
        max-width: 75ch;
    }

    a {
        color: var(--darkblue);
        text-decoration-thickness: 3px;
        text-underline-offset: 1uto;
        transition: all 300ms ease-out;
    }

    a:hover {
        color: var(--darkblue);
        text-decoration-thickness: 6px;
        // text-underline-offset: 10px;
    }

    #cta {
        display: flex;
        justify-content: center;
    }
    .cta-button {
        background-color: var(--green);
        color: var(--white);
        text-decoration: none;
        padding: 1rem;
        border-radius: 0.5rem;
        font-family: var(--sans);
        font-weight: 900;
        letter-spacing: 2px;
        text-transform: uppercase;
        border: 2px solid transparent;
        transition: all 300ms ease-out;
    }

    .cta-button:hover {
        background: var(--darkblue);
        color: var(--whitish);
        border-color: var(--whitish);
    }

    .cta-button:active {
        transform: scale(1.0);
    }

    @media screen and (min-width: 768px) {
        .intro_greeting {
            flex-direction: row;
        }

        .greeting {
            order: 1;
            flex-basis: 60vw;
        }
        .avatar {
            order: 2;
        }
    }
</style>
