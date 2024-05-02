export function sortPost(posts: { reactions: { reaction: string }[] }[]): { reactions: { reaction: string } }[] {
  if (posts && posts.length > 0) {
    return posts.sort((a, b) => {
      // Sort by reaction count in descending order
      const reactionsA = a.reactions ? a.reactions.filter((reaction) => reaction.reaction === "awesome").length : 0;
      const reactionsB = b.reactions ? b.reactions.filter((reaction) => reaction.reaction === "awesome").length : 0;

      // If reactions are equal, prioritize "awesome" over "trash"
      if (reactionsA !== reactionsB) {
        return reactionsB - reactionsA;
      } else {
        // Put posts with "trash" reactions at the bottom
        const trashA = a.reactions ? a.reactions.filter((reaction) => reaction.reaction === "trash").length : 0;
        const trashB = b.reactions ? b.reactions.filter((reaction) => reaction.reaction === "trash").length : 0;
        return trashA - trashB;
      }
    });
  } else {
    return [];
  }
}
