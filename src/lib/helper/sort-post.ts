export function sortPost(posts: any): any {
  if(posts && posts.length > 0) {
    return posts.sort((a, b) => {
      // Sort by creation date in descending order
      const dateComparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }

      // Sort by reactions count in descending order
      const reactionsA = a.reactions ? a.reactions.length : 0;
      const reactionsB = b.reactions ? b.reactions.length : 0;
      return reactionsB - reactionsA;
    });
  } else {
    return [];
  }
}
