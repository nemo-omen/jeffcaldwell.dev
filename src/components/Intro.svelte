<script>
    import Avatar from './Avatar.svelte';
</script>

<article id="intro">
        <h2>I'm Jeff Caldwell.</h2>
        <section class="avatar">
            <Avatar />
        </section>
        <p class="info">I'm a web developer who loves making fast, accessible websites.</p>
</article>

<style lang="scss">
    #intro {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr auto;
        grid-template-areas: 
            "Header Avatar"
            "Info Info";
        align-items: center;
        background-color: var(--red);
        padding: var(--space-small);
        grid-gap: var(--space-xsmall);
    }
    h2 {
            font-size: clamp(2.5rem, 11vw, 9rem);
        }
    .info {
        font-size: clamp(var(--size-500), 3vw, var(--size-600));
        grid-area: Info;
        font-weight: 600;
    }
</style>