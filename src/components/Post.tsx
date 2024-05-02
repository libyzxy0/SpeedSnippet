import { cn } from "@/lib/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Icon } from "@iconify/react";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from '@/hooks/usePost';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from "react-router-dom";

type ReactionType = {
  username: string;
  reaction: string;
};

type ReactionFilterType = {
  most: number;
  total: number;
  isAwesome: boolean;
};

interface User {
  username: string;
  avatar: string;
}

interface Reaction {
  username: string;
  reaction: string;
}


interface PostContextType {
  id: number;
  title: string;
  description: string;
  lang: string;
  code: string;
  user: User;
  user_id: string;
  reactions: Reaction[];
}

interface PostProps {
  children: React.ReactNode;
  className?: string;
  post: PostContextType;
}
const PostContext = createContext<PostContextType | null>({} as PostContextType | null);

const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("Post is used outside of Post Parent");
  }
  return context;
};

function reactionsFilter(reactions: Reaction[]): ReactionFilterType {
  const uniqueReactions: { [key: string]: Reaction } = {};

  reactions.forEach(item => {
    uniqueReactions[item.username] = item;
  });

  let awesomeCount = 0;
  let trashCount = 0;

  Object.values(uniqueReactions).forEach(item => {
    if (item.reaction === "awesome") {
      awesomeCount++;
    } else if (item.reaction === "trash") {
      trashCount++;
    }
  });

  const isAwesome = awesomeCount > trashCount;
  const most = Math.max(awesomeCount, trashCount);

  return {
    isAwesome,
    most,
    total: Object.keys(uniqueReactions).length,
  };
}



function Post({ children, className, post }: PostProps) {
  const navigate = useNavigate();
  return (
    <PostContext.Provider value={post}>
      <div onClick={() => navigate(`/post/${post.id}?from=explore`)} className={cn("w-full", className)}>
        {children}
      </div>
    </PostContext.Provider>
  );
}

function Header() {
  const post = usePostContext();
  const { username, avatar } = post.user;
  const handleOption = () => {
    alert("Feature not available!");
  }
  return (
    <>
    <div className="bg-white dark:bg-gray-950 w-full py-2 flex flex-row items-center justify-between">
      <div className="flex items-center">
        <Avatar className="ml-4 border-2 border-gray-300 dark:border-gray-800">
          <AvatarImage src={avatar} alt={"D"} />
          <AvatarFallback>{username.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="font-medium text-lg mx-2 text-gray-700 dark:text-gray-50">
          {"@" + username}
        </h1>
      </div>
      <div className="justify-center">
        <button onClick={handleOption} className="mt-2 dark:text-gray-600 text-2xl mr-4">
          <Icon icon="mingcute:dots-line" />
        </button>
      </div>
    </div>
    </>
  );
}

function Caption() {
  const post = usePostContext();
  const { title, description } = post;
  return (
    <div className="border-t border-gray-300 dark:border-gray-800 flex flex-col">
      <div className="flex flex-row items-center mt-4">
        <h1 className="text-xl mx-4 font-bold text-gray-700 dark:text-white">
        {title}
        </h1>
      </div>
      <p className="text-gray-700 dark:text-gray-100 mx-4 mt-2">
        {description}
      </p>
    </div>
  );
}

function CodeSnippet() {
  const post = usePostContext();
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const { reactions, code, lang } = post;
  const { total, most, isAwesome } = reactionsFilter(reactions);
  
  
  const handleCopy = async () => {
    if(!copied) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      } catch (err) {
        console.error('Error copying text to clipboard: ', err);
      }
    }
  };
  
  const rtext = total == 0 ? "" : `${most} people says its ${isAwesome ? "Awesome ⚡" : "Trash 💩"}`;
  return (
    <div className="px-4 pt-4 flex flex-col">
      <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded-tl-lg rounded-tr-lg flex items-center flex-row justify-between">
        <p className="dark:text-gray-400 text-sm mx-3">{lang}</p>
        <button onClick={handleCopy} className={`outline-none border-none mx-3 text-xl ${copied ? "text-sky-400" : "dark:text-gray-400"}`}>
          <Icon icon={copied ? "iconamoon:check-fill" : "mynaui:copy"} />
        </button>
      </div>
      <SyntaxHighlighter
        className={`text-sm rounded-bl-lg rounded-br-lg ${theme === "dark" ? "codebg-black" : "codebg-white"}`}
        language={lang}
        style={theme === "dark" ? atomOneDark : atomOneLight}
      >
        {code}
      </SyntaxHighlighter>
      <p className="text-sm mt-5 mb-2 text-gray-400 dark:text-gray-600">
        {rtext}
      </p>
    </div>
  );
}

interface UpdateType {
  reactions: ReactionType[]
}

function Reaction() {
  const post = usePostContext();
  const { user } = useAuth();
  
  const user_id = user?.id;
  
  const { id } = post;
  const { data, updatePost } = usePost();
  const [cReaction, setcReaction] = useState("");

  useEffect(() => {
    const currentPost = data.find(p => p.id === id);
    if (currentPost) {
      const userReaction = currentPost.reactions.find((u: { username: string, reaction: string }) => u.username === user_id);

      if (userReaction) {
        setcReaction(userReaction.reaction);
      }
    }
  }, [data, id, user_id]);

  const handleReaction = async (postID: number, reaction: string): Promise<void> => {
    setcReaction(reaction);
    
    if (!data) return;
    
    
    if (!post) return;
    
    const existingReactionIndex = post.reactions.findIndex((u: { username: string, reaction: string }) => u.username === user_id);

    if (existingReactionIndex === -1) {
      const fields = {
        reactions: [...post.reactions, { username: user_id, reaction: reaction }]
      };
      await updatePost<UpdateType>(postID, fields);
    } else {
      // If User has already reacted, update existing reaction
      const updatedReactions = [...post.reactions];
      updatedReactions[existingReactionIndex].reaction = reaction;

      const fields = {
        reactions: updatedReactions
      };
      await updatePost<UpdateType>(postID, fields);
    }
  }

  return (
    <div className="border-t border-t-gray-300 dark:border-t-gray-800 border-b-4 border-b-sky-300 dark:border-b-sky-300 flex flex-row mt-0">
      <Button onClick={() => handleReaction(id, "awesome")} className={`bg-white shadow-none rounded-none dark:bg-gray-950 py-6 border-none w-[50%] transition-all duration-200 hover:bg-transparent ${cReaction === "awesome" ? "text-sky-400" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}>
        ⚡ Awesome
      </Button>
      <Button onClick={() => handleReaction(id, "trash")} className={`bg-white shadow-none rounded-none dark:bg-gray-950 py-6 border-none w-[50%] transition-all duration-200 hover:bg-transparent ${cReaction === "trash" ? "text-sky-400" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}>
        💩 Trash
      </Button>
    </div>
  );
}


Post.Header = Header;
Post.Caption = Caption;
Post.CodeSnippet = CodeSnippet;
Post.Reaction = Reaction;

export default Post;
