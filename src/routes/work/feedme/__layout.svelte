<script context="module">

  export const load = async({page, fetch}) => {
    const response = await fetch('/work/feedme.json');

    const data = await response.json();

    console.log('data: ', data);

    return {
      props: {
        posts: data.posts
      }
    }
  }
</script>

<script>
  export let posts;
</script>

<slot></slot>

{#if posts}
  {#each posts as post}
    <h3>{post.title}</h3>
  {/each}
{/if}