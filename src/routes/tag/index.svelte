<script context="module">
  export const load = async({ fetch }) => {
    const response = await fetch('/tag.json');

    const { posts } = await response.json();

    return {
      props: {
        posts
      }
    }
  }
</script>

<script>
  export let posts;
</script>

{#each posts as post}
  {post.title}
{/each}