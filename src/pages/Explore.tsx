import Navbar from "@/components/NavBar";
import Post from "@/components/Post";
import { useState, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { usePost } from "@/hooks/usePost";
import SkeletonLoading from '@/components/skeleton-loading';

export default function Explore() {
  const { user } = useAuth(); 
  const { data: posts, loading } = usePost();

  const handlePost = async () => {
    // Function to create post
  };

  return (
    <>
      <div className="h-full w-full bg-white dark:bg-gray-950">
        <Navbar>
          {user ? (
            <Navbar.NavbarAvatar
              src={user.user_metadata?.avatar}
              alt={user.user_metadata?.full_name}
              fallback={user.user_metadata?.full_name?.charAt(0)}
              provider={user.app_metadata?.provider}
              name={user.user_metadata?.full_name}
            />
          ) : (
            <Navbar.LoginButton />
          )}
          <Navbar.NavbarSearch />
          <Navbar.Actions onClick={handlePost} />
        </Navbar>

        <div>
          {!loading ? (
            posts.map((post, index) => (
              <Post id={post.id} key={index}>
                <Post.Header
                  username={post.user.username}
                  avatar={post.user.avatar}
                />
                <Post.Caption
                  title={post.title}
                  description={post.description}
                />
                <Post.CodeSnippet
                  reactions={post.reactions}
                  lang={post.lang}
                  code={post.code}
                />
                <Post.Reaction />
              </Post>
            ))
          ) : (
            <>
              <SkeletonLoading />
              <SkeletonLoading />
            </>
          )}
        </div>
      </div>
    </>
  );
}