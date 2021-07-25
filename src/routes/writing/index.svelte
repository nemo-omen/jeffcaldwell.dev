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
  import PostItem from '$lib/components/PostItem.svelte'
  export let posts;
</script>

<h2>Writing</h2>

<section class="flow space__outer_top">
  {#each posts as post}
  <PostItem {post} />
  {/each}
</section>

<style>
  
</style>