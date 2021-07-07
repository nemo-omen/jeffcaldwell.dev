import { parse } from 'path';

const get = async ({ params }) => {
  const modules = import.meta.glob('../writing/**/index.svx');

  console.log('params: ', params);
  
  const posts = [];

  await Promise.all(Object.entries(modules).map(async ([file, module]) => {
    posts.push({
      author: metadata.author,
      created: metadata.created,
      slug: parse(file).dir,
      subtitle: metadata.subtitle,
      title: metadata.title,
      excerpt: metadata.excerpt,
      tags: metadata.tags
    });
  }));

  posts.sort((a,b) => (a.created > b.created) ? -1 : 1);

  return {
    body: {
      posts: posts,
    },
  }
};