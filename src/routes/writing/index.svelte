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

<section class="flow space__outer_top">
  <header class="section-header">
    <h2 class="section-title">Writing</h2>
  </header>
  {#each posts as post}
  <PostItem {post} />
  {/each}
</section>

<style>
  
</style>