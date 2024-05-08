interface User {
  username: string;
  avatar: string;
}

interface Reaction {
  username: string;
  reaction: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
  lang: string;
  code: string;
  user: User;
  user_id: string;
  reactions: Reaction[];
  created_at?: any;
}

export function sortPost(posts: Post[]): Post[] {
  if (!posts || posts.length === 0) {
    return [];
  }

  const twentyFourHoursAgo: number = Date.now() - 24 * 60 * 60 * 1000;

  // Separate new posts (within 24 hours) from older posts
  const newPosts: Post[] = [];
  const olderPosts: Post[] = [];

  posts.forEach((post: Post) => {
    const postTimestamp: number = post.created_at
      ? new Date(post.created_at).getTime()
      : Date.now();
    if (postTimestamp >= twentyFourHoursAgo) {
      newPosts.push(post);
    } else {
      olderPosts.push(post);
    }
  });

  // Sort older posts based on the number of "awesome" reactions
  olderPosts.sort((a: Post, b: Post) => {
    const awesomeCountA: number = a.reactions.filter(
      (r: Reaction) => r.reaction === "awesome",
    ).length;
    const awesomeCountB: number = b.reactions.filter(
      (r: Reaction) => r.reaction === "awesome",
    ).length;
    return awesomeCountB - awesomeCountA;
  });

  const sortedPosts: Post[] = [...newPosts, ...olderPosts];

  return sortedPosts;
}
