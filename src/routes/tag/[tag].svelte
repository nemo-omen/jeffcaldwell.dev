<script context="module">
  export const load = async({page, fetch, context, session}) => {
    
    const tag = page.params.tag;

    const modules = import.meta.glob('../writing/**/index.svx');

    const posts = [];

    await Promise.all(Object.entries(modules).map(async([file, module]) => {
      const { metadata } = await module();

      if(metadata.tags.includes(tag)) {
        posts.push({
          author: metadata.author,
          created: metadata.created,
          slug: metadata.slug,
          subtitle: metadata.subtitle,
          title: metadata.title,
          excerpt: metadata.excerpt,
          tags: metadata.tags
        });
      }
    }));

    console.log('posts: ', posts);

    posts.sort((a,b) => (a.created > b.created) ? 1 : -1);

    return {
      props: {
        posts: posts,
        tag
      },
    }
  }
</script>

<script>
  import PostItem from '$lib/components/PostItem.svelte'
  export let posts = [];
  export let tag;
  console.log(posts);
</script>
<section class="flow">
  {#if posts.length > 0}
  <h2>Posts tagged <span class="tag">{tag}</span></h2>
  {#each posts as post}
  <PostItem {post} />
  {/each}
  {:else}
  <h2>Oops!</h2>
  <p>No posts tagged <span class="tag">{tag}</span> could be found.</p>
  <a href="/writing">Back to the blog</a>
  {/if}
</section>

<style>
  .tag {
    color: var(--red);
  }
</style>