import Navbar from "@/components/NavBar";
import Post from "@/components/Post";
import { useAuth } from "@/hooks/useAuth";
import { usePost } from "@/hooks/usePost";
import SkeletonLoading from "@/components/skeleton-loading";
import { getUsername } from "@/lib/helper/username-getter.ts";
export default function Explore() {
  const { user } = useAuth();
  const { data: posts, loading } = usePost();
  return (
    <>
      <div className="h-full w-full bg-white dark:bg-gray-950">
        <Navbar>
          {user ? (
            <Navbar.NavbarAvatar
              src={user.user_metadata?.avatar}
              alt={
                user.app_metadata?.provider == "email"
                  ? user.user_metadata.display_name
                  : user.user_metadata?.full_name
              }
              fallback={
                user.app_metadata?.provider == "email"
                  ? user.user_metadata.display_name?.charAt(0)
                  : user.user_metadata?.full_name?.charAt(0)
              }
              provider={user.app_metadata?.provider}
              name={getUsername(user)}
            />
          ) : (
            <Navbar.LoginButton />
          )}
          <Navbar.NavbarSearch />
          <Navbar.Actions />
        </Navbar>

        <div className="w-full md:w-[70%]">
          {!loading ? (
            posts.map((post, index) => (
              <Post key={index}>
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
                <Post.Reaction user_id={user?.id} id={post?.id} />
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
