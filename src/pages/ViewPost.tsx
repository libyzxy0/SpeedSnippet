import Header from "@/components/Header";
import { useParams } from 'react-router-dom';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import Post from "@/components/Post";
import SkeletonLoading from "@/components/skeleton-loading";

export default function ViewPost() {
  const { postID } = useParams();
  const { getSinglePost } = usePost();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      const postData = await getSinglePost(postID);
      console.log(postData);
      setData(postData);
      setLoading(false);
    }
    handleFetch();
  });
  
  return (
    <>
      <Header back="/" title={data ? data?.user.username + "'s" + " post" : "Loading post..."} />
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