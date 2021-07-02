<script>
	import Avatar from './Avatar.svelte';
</script>

<article id="intro">
    <section class="intro_greeting">
        <h2 class="greeting">I'm <a href="https://twitter.com/trainingm0ntage">Jeff</a>.<br/> I make fast, accessible, good-looking websites.</h2>
    </section>
    <section class="intro_message">
        <p class="message">I'm a web developer in Texas who specializes in the design and development of sites and apps for small businesses, nonprofits, and people like you.</p>
    </section>
    <section id="cta">
        <a href="/hire" class="cta-button">Check Out My Services</a>
    </section>
</article>



<style lang="scss">
    #intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        // background: var(--red);
        background: var(--darkblue);
        gap: var(--space);
        padding-bottom: var(--space);
        margin-bottom: var(--space);
    }
	.intro_greeting {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}
	.greeting {
        font-family: var(--sans);
        font-weight: 900;
		font-size: clamp(var(--size-600), 5vw, var(--size-800));
		letter-spacing: 0.5rem;
        text-align: center;
        color: var(--whitish);
	}
    .intro_message {
        width: 100%;
    }
    .message {
        color: var(--whitish);
        width: var(--width-body);
        margin-inline: auto;
        text-align: center;
        font-size: clamp(var(--size-500), 3vw, var(--size-600));
        max-width: 50ch;
    }

    a {
        color: var(--red);
        text-decoration-thickness: 1px;
        text-underline-offset: auto;
        transition: all 300ms ease-out;
    }

    a:hover {
        text-decoration-thickness: 6px;
    }

    #cta {
        display: flex;
        justify-content: center;
    }
    .cta-button {
        background-color: var(--red);
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
</style>
