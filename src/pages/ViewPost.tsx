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

interface PostData {
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
  const { postID } = useParams<{ postID?: string }>();
  const { getSinglePost } = usePost();
  const [data, setData] = useState<PostData | null>(null); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleFetch = async () => {
      if (postID) {
        setLoading(true);
        try {
          const postData = await getSinglePost(parseInt(postID));
          setData(postData);
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    handleFetch();
  }, [getSinglePost, postID]);

  return (
    <>
      <Header back="/" title={data.user.username + "'s post"} />
      <div className="md:flex md:justify-center">
        <div className="w-full md:w-[60%] md:shadow-lg">
          {!loading && data ? (
            <div>
              <Post post={data}>
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
