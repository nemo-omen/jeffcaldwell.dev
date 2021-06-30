<script>
	import Avatar from './Avatar.svelte';
</script>

<article id="intro">
	<h2 class="greeting">I'm Jeff Caldwell.</h2>
	<section class="avatar">
		<Avatar />
	</section>
	<p class="info">I'm a web developer who loves making fast, accessible websites.</p>
</article>

<style lang="scss">
	#intro {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'Greeting Avatar'
			'Info Info';
		align-items: stretch;
		background-color: var(--red);
		padding: var(--space-small);
		// grid-gap: var(--space-xsmall);
	}
	.greeting {
		font-size: clamp(2.5rem, 11vw, 9rem);
		letter-spacing: 1.5px;
        grid-area: Greeting;
	}
	.info {
		font-size: clamp(var(--size-500), 3vw, var(--size-600));
		grid-area: Info;
		font-weight: 600;
        margin-top: var(--space-xsmall);
	}
	.avatar {
		grid-area: Avatar;
	}
</style>
