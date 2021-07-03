<script>
	import Avatar from '../../Avatar.svelte';
</script>

<section id="intro" class="space__outer_top flow">
    <section class="intro_greeting width__body flow-xsmall">
        <h2 class="greeting">I'm <a href="https://twitter.com/trainingm0ntage">Jeff</a>.</h2>
        <h3 class="sub-greeting">I make fast, accessible, good-looking websites.</h3>
    </section>
    <section class="intro_message width__body">
        <p class="message">I'm a web developer in Texas who specializes in the design and development of sites and apps for small businesses, nonprofits, and people like you.</p>
    </section>
    <section id="cta">
        <a href="/hire" class="cta-button">Check Out My Services</a>
    </section>
</section>



<style lang="scss">
    #intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--darkblue);
    }
	.greeting {
		font-size: clamp(var(--size-700), 5vw, var(--size-900));
		letter-spacing: 0.25rem;
	}
    .sub-greeting {
        font-size: clamp(var(--size-600), 4vw, var(--size-800));
        font-weight: 500;
        letter-spacing: 0.25rem;
    }
    .message {
        font-size: clamp(var(--size-500), 3vw, var(--size-600));
        max-width: 50ch;
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
    }
    .cta-button {
        background-color: var(--whitish);
        color: var(--darkblue);
        text-decoration: none;
        padding: 1rem;
        border-radius: 0.5rem;
        font-family: var(--sans);
        font-weight: 900;
        letter-spacing: 2px;
        text-transform: uppercase;
        border: 2px solid transparent;
        transition: background 300ms ease-out, border-color 300ms ease-out, color 300ms ease-out;
    }

    .cta-button:hover {
        background: var(--darkdarkblue);
        color: var(--whitish);
        border-color: var(--whitish);
    }

    .cta-button:active {
        transform: scale(1.0);
    }

    @media screen and (max-width: 437px) {
    #intro {
      text-align: center;
    }
  }
</style>
