import Navbar from "@/components/NavBar";
import Post from "@/components/Post";
import { useAuth } from "@/hooks/useAuth";
import { usePost } from "@/hooks/usePost";
import SkeletonLoading from "@/components/skeleton-loading";
import { getUsername } from "@/lib/helper/username-getter.ts";
import { sortPost } from "@/lib/helper/sort-post.ts";
export default function Explore() {
  const { user } = useAuth();
  const { data: rawPost, loading } = usePost();
  const posts = sortPost(rawPost);

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
          <Navbar.Actions />
        </Navbar>
        <div className="md:flex md:justify-center">
          <div className="w-full md:w-[60%] md:shadow-lg">
            {!loading ? (
              posts.map((post, index) => (
                <Post post={post} key={index}>
                  <Post.Header />
                  <Post.Caption />
                  <Post.CodeSnippet />
                  <Post.Reaction />
                </Post>
              ))
            ) : (
              <>
                <SkeletonLoading />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
