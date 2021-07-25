
<script context="module">

  export const load = async({page, fetch}) => {
    const response = await fetch('/work/feedme.json');

    const data = await response.json();

    return {
      props: {
        posts: data.posts
      }
    }
  }
</script>

<script>
  import Card from '$lib/components/Card.svelte';
  import FlexSwitcher from '$lib/components/FlexSwitcher.svelte';
  import ProjectPage from '$lib/components/partials/work/ProjectPage.svelte';
  export let posts;
</script>
<ProjectPage 
  name="FeedMe" 
  tagLine="An Easy RSS Reader"
  featuredImage={
    {
      url: "/FeedMe-Screenshot.png", 
      description: "FeedMe - An Easy RSS Reader"
      }
    }
  goal={"To build an accessible, full-featured RSS reader that allows users to subscribe to feeds, and tag, favorite, and share posts."}
  technologies={['HTML', 'CSS', 'JavaScript', 'SvelteKit', 'SupaBase', 'W3C Accessibility', 'Vite']}
  dates="July, 2021 (In-Progress)"
>

{#if posts}
<FlexSwitcher>
  {#each posts as post}
  <Card title={post.title} subtitle={post.subtitle} link="http://localhost:3000/writing/{post.slug}">

  </Card>
  {/each}
</FlexSwitcher>
{/if}

</ProjectPage>


<style>

</style>