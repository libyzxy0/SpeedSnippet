import Header from "@/components/Header";
import { useParams } from 'react-router-dom';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import Post from "@/components/Post";
import SkeletonLoading from "@/components/skeleton-loading";
import { Helmet } from "react-helmet";

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
          setLoading(false);
        } catch (error) {
          console.error('Error fetching post:', error);
          setLoading(false);
        }
      }
    };
    handleFetch();
  }, [postID]);
  
  function truncateText(text:string, maxLength: number): string {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
  }
  return (
    <>
      <Helmet>
          <title>{data ? `${data?.title} by ${data?.user.username}: ${truncateText(data?.description, 40)}` : "Check this post!"}</title>
          <meta name="description" content={data?.description} />
        </Helmet>
      <Header back="/" title={data !== null ? data?.user.username + "'s post" : "Loading post..."} />
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
