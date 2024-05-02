import Header from "@/components/Header";
import { useParams } from 'react-router-dom';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import Post from "@/components/Post";
import SkeletonLoading from "@/components/skeleton-loading";
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
export default function ViewPost() {
  const { postID } = useParams();
  const { getSinglePost } = usePost();
  const [data, setData] = useState<Post>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      const postData = await getSinglePost(parseInt(postID));
      console.log(postData);
      setData(postData);
      setLoading(false);
    }
    handleFetch();
  });
  
  return (
    <>
      <Header back="/" title={data ? data.user.username + "'s" + " post" : "Loading post..."} />
      <div className="md:flex md:justify-center">
      <div className="w-full md:w-[60%] md:shadow-lg">
      {!loading && data ? (
        <div>
          <Post post={data ? data : null}>
            <Post.Header />
            <Post.Caption />
            <Post.CodeSnippet />
            <Post.Reaction />
          </Post>
        </div>
      ) : (
          <SkeletonLoading />
      )}
      </div>
      </div>
    </>
  )
}