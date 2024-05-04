import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import { usePost } from "@/hooks/usePost";
import { useAnswer } from "@/hooks/useAnswer";
import { getUsername } from "@/lib/helper/username-getter.ts";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Post from "@/components/Post";
import Answer from "@/components/Answer";
import SkeletonLoading from "@/components/skeleton-loading";
import { Helmet } from "react-helmet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/theme-provider";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
  const { user } = useAuth();
  const { toast } = useToast();
  const { getSinglePost } = usePost();
  const [data, setData] = useState<PostData | null>(null);
  const [typedAnswer, setTypedAnwser] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [code, setCode] = useState("");
  const [lang, setLang] = useState("");

  const { data: answers, getAnswer, createAnswer } = useAnswer();

  const handleSubmitAnswer = () => {
    if (typedAnswer && data) {
      createAnswer({
        id: Math.floor(Math.random() * 100000000),
        post_id: data.id,
        text: typedAnswer,
        code: code,
        lang: lang,
        user: {
          user_id: user.id,
          displayName: getUsername(user),
          avatar: user?.user_metadata.avatar_url,
        },
        reactions: [],
      });
      toast({
        title: "Answer submitted",
        description: "Thanks for submitting your answers!",
      });
      setTypedAnwser("");
      setCode("");
      setLang("");
      data && getAnswer(data.id);
    } else {
      toast({
        title: "Failed to submit answer",
        description: "Please specify a answer.",
      });
    }
  };

  const { theme } = useTheme();

  useEffect(() => {
    const handleFetch = async () => {
      if (postID) {
        getAnswer(parseInt(postID));
        setLoading(true);
        try {
          const postData = await getSinglePost(parseInt(postID));
          setData(postData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching post:", error);
          setLoading(false);
        }
      }
    };
    handleFetch();
  }, [postID]);

  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }
  return (
    <>
      <Helmet>
        <title>
          {data
            ? `${data?.title} by ${data?.user.username}: ${truncateText(data?.description, 40)}`
            : "Check this post!"}
        </title>
        <meta name="description" content={data?.description} />
      </Helmet>
      <Header
        back="/"
        title={
          data !== null ? data?.user.username + "'s post" : "Loading post..."
        }
      />
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
              <h1 className="text-xl dark:text-white text-gray-700 font-medium mx-5 mt-5">
                Answers on {data && data.user.username}'s post
              </h1>
              {!loading && answers &&
                answers.map((answer, index) => (
                  <Answer post_user={data && data.user.username} answer={answer} key={index}>
                    <Answer.Content />
                    <Answer.Code />
                    <Answer.Reaction />
                  </Answer>
                ))}
              <Popover>
                <PopoverTrigger className="w-full text-start">
                  <div className="relative border-gray-200 dark:border-gray-800 mx-8 mt-7 pb-1 list-none pb-14">
                    <li className="mb-5 ms-8">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <Avatar className="border-2 border-gray-300 dark:border-gray-700">
                          <AvatarImage src={user?.user_metadata.avatar_url} alt={"D"} />
                          <AvatarFallback>
                            {getUsername(user).slice(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </span>
                      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-900 dark:border-gray-800">
                        <h1 className="text-md text-gray-400 dark:text-white">
                          Write a answer...
                        </h1>
                      </div>
                    </li>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <h1 className="text-gray-700 text-lg font-medium dark:text-white">
                    Answer {data && data.user.username} post
                  </h1>
                  <Textarea
                    value={typedAnswer}
                    onChange={(e) => setTypedAnwser(e.target.value)}
                    placeholder="Lorem Ipsum dolor sit amet in den."
                    className="resize-none border-[1.7px] border-gray-300 dark:border-gray-600 focus:border-gray-700 dark:focus:border-white focus-visible:ring-0 mt-5"
                    rows={5}
                  />
                  <CodeEditor
                    value={code}
                    language="js"
                    className={`text-[15px] border-[1.7px] border-gray-300 dark:border-gray-700 rounded-sm ${theme === "dark" ? "bg-gray-950" : "codebg-white"} mt-5`}
                    placeholder="Code here. (optional)"
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    data-color-mode={theme == "dark" ? "dark" : "light"}
                  />
                  {code && (
                    <Select
                      value={lang}
                      onValueChange={(value) => setLang(value)}
                    >
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="js">JavaScript</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="py">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                        <SelectItem value="swift">Swift</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="rb">Ruby</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                        <SelectItem value="rs">Rust</SelectItem>
                        <SelectItem value="kt">Kotlin</SelectItem>
                        <SelectItem value="ts">TypeScript</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <Button onClick={handleSubmitAnswer} className="py-5 mt-3">
                    Submit Answer
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <SkeletonLoading />
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}
