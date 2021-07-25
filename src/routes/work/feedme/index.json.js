import { getWorkPosts } from '../../../utils/getWorkPosts.js'
import { parse } from 'path';
export const get = async () => {
  const posts = await getWorkPosts('FeedMe');

    return {
      body: {
        posts: posts,
      },
    }
  }