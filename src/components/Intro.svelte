<script>
    import Avatar from './Avatar.svelte';
</script>

<article id="intro">
    <header class="intro-header">
        <h2>I'm Jeff Caldwell,</h2>
        <Avatar />
    </header>
    <section class="info">
        <p>a web developer who loves making accessible and inclusive sites.</p>
    </section>
</article>

<style>
    #intro {
        background-color: var(--red);
    }
    .intro-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .info {
        margin: 1rem;
    }
</style>