<script>
    import Avatar from './Avatar.svelte';
</script>

<article id="intro">
    <section class="info">
        <h2>I'm Jeff Caldwell,</h2>
        <p>a web developer who loves making accessible and inclusive sites.</p>
    </section>
    <Avatar />
</article>

<style>
    #intro {
        position: relative;
        display: flex;
        align-items: flex-start;
        background-color: var(--red);
    }
    .info {
        margin: 1rem;
    }
</style>