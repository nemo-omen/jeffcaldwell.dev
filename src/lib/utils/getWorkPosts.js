import { parse } from 'path';

export const getWorkPosts = async(tagName) => {
  const modules = import.meta.glob('../../routes/writing/**/index.svx');

    let posts = [];

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

    posts = posts.filter((post) =>post.tags.includes(tagName));

    posts.sort((a,b) => (a.created > b.created) ? 1 : -1);

    return posts;
};