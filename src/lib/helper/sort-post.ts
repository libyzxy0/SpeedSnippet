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
  created_at: any;
}

export function sortPost(posts: Post[]): Post[] {
  if (posts && posts.length > 0) {
    const sorted = posts.sort(
      (a: Post, b: Post) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return sorted;
  } else {
    return [];
  }
}
