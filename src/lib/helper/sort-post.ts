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
}

export function sortPost(posts: Post[]): Post[] {
  if (posts && posts.length > 0) {
    return posts.sort((a: Post, b: Post) => {
      const reactionsA = a.reactions
        ? a.reactions.filter(
            (reaction: Reaction) => reaction.reaction === "awesome",
          ).length
        : 0;
      const reactionsB = b.reactions
        ? b.reactions.filter(
            (reaction: Reaction) => reaction.reaction === "awesome",
          ).length
        : 0;

      if (reactionsA !== reactionsB) {
        return reactionsB - reactionsA;
      } else {
        const trashA = a.reactions
          ? a.reactions.filter(
              (reaction: Reaction) => reaction.reaction === "trash",
            ).length
          : 0;
        const trashB = b.reactions
          ? b.reactions.filter(
              (reaction: Reaction) => reaction.reaction === "trash",
            ).length
          : 0;
        return trashA - trashB;
      }
    });
  } else {
    return [];
  }
}
