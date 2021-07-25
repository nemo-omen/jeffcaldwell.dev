import { getWorkPosts } from '$lib/utils/getWorkPosts.js'
export const get = async () => {
  const posts = await getWorkPosts('FeedMe');

    return {
      body: {
        posts: posts,
      },
    }
  }