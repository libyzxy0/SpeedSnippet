import React from "react";
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
import { useState, useEffect } from 'react';
type PostProps = {
  children: React.ReactNode;
  className?: string;
};

type CaptionProps = {
  title: string;
  description: string;
};

type CodeSnippetProps = {
  code: string;
  lang: string;
  reactions: ReactionType[];
};

type ReactionType = {
  username: string;
  reaction: string;
};

type ReactionFilterType = {
  most: number;
  total: number;
  isAwesome: boolean;
};

function reactionsFilter(reactions: ReactionType[]): ReactionFilterType {
  const isAwesome =
    reactions.filter((item) => item.reaction === "awesome").length >
    reactions.filter((item) => item.reaction === "trash").length;

  let most = 0;
  if (isAwesome) {
    most = reactions.filter((item) => item.reaction === "awesome").length;
  } else {
    most = reactions.filter((item) => item.reaction === "trash").length;
  }

  return {
    isAwesome,
    most,
    total: reactions.length,
  };
}

function Post({ children, className }: PostProps) {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
}

function Header({ username, avatar }: { username: string; avatar: string }) {
  return (
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
        <button className="mt-2 dark:text-gray-600 text-2xl mr-4">
          <Icon icon="mingcute:dots-line" />
        </button>
      </div>
    </div>
  );
}

function Caption({ title, description }: CaptionProps) {
  return (
    <div className="border-t border-gray-300 dark:border-gray-800">
      <h1 className="text-xl mx-4 mt-4 font-bold text-gray-700 dark:text-white">
        {title}
      </h1>
      <p className="text-gray-700 dark:text-gray-100 mx-4 mt-2">
        {description}
      </p>
    </div>
  );
}

function CodeSnippet({ code, lang, reactions }: CodeSnippetProps) {
  const { theme } = useTheme();

  const { total, most, isAwesome } = reactionsFilter(reactions);

  const rtext = total == 0 ? "" : `${most} people says its ${isAwesome ? "Awesome ⚡" : "Trash 💩"}`;
  return (
    <div className="px-4 pt-4 flex flex-col">
      <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded-tl-lg rounded-tr-lg flex items-center flex-row justify-between">
        <p className="dark:text-gray-400 text-sm mx-3">{lang}</p>
        <button className="outline-none border-none mx-3 text-xl dark:text-gray-400">
          <Icon icon="mynaui:copy" />
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

function Reaction({ id, user_id }: { id: number, user_id: string }) {
  const { data, updatePost } = usePost();
  const [cReaction, setcReaction] = useState("");

  useEffect(() => {
    const post = data.find(p => p.id === id);
    if (post) {
      const userReaction = post.reactions.find((u: { username: string, reaction: string }) => u.username === user_id);

      if (userReaction) {
        setcReaction(userReaction.reaction);
      }
    }
  }, [data, id, user_id]);

  const handleReaction = async (postID: number, reaction: string): Promise<void> => {
    setcReaction(reaction);
    if (!data) return;
    
    const post = data.find(p => p.id === postID);
    if (!post) return;
    
    const existingReactionIndex = post.reactions.findIndex((u: { username: string, reaction: string }) => u.username === user_id);

    if (existingReactionIndex === -1) {
      const fields = {
        reactions: [...post.reactions, { username: user_id, reaction: reaction }]
      };
      await updatePost(postID, fields);
    } else {
      // If User has already reacted, update existing reaction
      const updatedReactions = [...post.reactions];
      updatedReactions[existingReactionIndex].reaction = reaction;

      const fields = {
        reactions: updatedReactions
      };
      await updatePost(postID, fields);
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
