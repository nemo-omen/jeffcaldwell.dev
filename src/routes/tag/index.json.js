import { parse } from 'path';

const get = async ({ params }) => {
  const modules = import.meta.glob('../writing/**/index.svx');
  
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

  posts.sort((a,b) => (new Date(a.created) > new Date(b.created)) ? -1 : 1);

  return {
    body: {
      posts: posts,
    },
  }
};