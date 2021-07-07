import { parse } from 'path';

export const get = async() => {
  const modules = import.meta.glob('./**/index.svx');

  const posts = [];

  await Promise.all(Object.entries(modules).map(async([file, module]) => {
    const { metadata } = await module();

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

  posts.sort((a,b) => (a.created > b.created) ? 1 : -1);

  return {
    body: {
      posts: posts,
    },
  }
};