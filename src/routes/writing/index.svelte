<script context="module">
  export const load = async({ fetch }) => {
    const response = await fetch('/writing.json');

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
  <h3>{post.title}</h3>
{/each}