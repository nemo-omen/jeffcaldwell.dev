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
  import PostItem from '../../components/PostItem.svelte'
  export let posts;
</script>

<section class="flow">
  {#each posts as post}
  <PostItem {post} />
  {/each}
</section>

<style>
  
</style>