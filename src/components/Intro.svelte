<script>
	import Avatar from './Avatar.svelte';
</script>
<article class="home_intro">
    <section id="intro">
        <h2 class="greeting">I'm <a href="#">Jeff</a> and I make fast, accessible, good-looking websites.</h2>
        <!-- <div class="avatar" aria-hidden="true">
            <Avatar />
        </div> -->
    </section>
</article>
<section class="home_message">
    <section class="message">
        <p>I'm a web developer based in Texas who specializes in the design and development of sites and apps for small businesses, nonprofits, and people like you.</p>
    </section>
</section>

<style lang="scss">
    .home_intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--red);
    }
	#intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--space-small);
        width: var(--width-body);
        margin-inline: auto;
		background-color: var(--red);
		padding: var(--space-small) 0;
	}
	.greeting {
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
	.info {
		font-size: clamp(var(--size-500), 3vw, var(--size-600));
		grid-area: Info;
		font-weight: 600;
        margin-top: var(--space-xsmall);
        letter-spacing: 0.25rem;
	}
	.avatar {
        width: clamp(20vw, 80px, 30vw);
        order: 1;
	}

    .home_message {
        background: var(--whitish);
    }
    .message {
        color: var(--darkblue);
        width: var(--width-body);
        margin-inline: auto;
        padding: var(--space) 0;
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

    @media screen and (min-width: 768px) {
        #intro {
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
