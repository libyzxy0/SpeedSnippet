import {
  atomOneLight,
  nightOwl,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useTheme } from "@/components/theme-provider";
import { Icon } from "@iconify/react";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAnswer } from "@/hooks/useAnswer";

interface Reaction {
  username: string;
  reaction: string;
}

interface User {
  displayName: string;
  user_id: string;
  avatar?: string;
}

interface Answer {
  id: number;
  post_id: number;
  text: string;
  user: User;
  code: string;
  lang: string;
  created_at?: any;
  reactions: Reaction[];
}

interface AnswerProps {
  children: React.ReactNode;
  answer: Answer;
  post_user: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AnswerContext = createContext<Answer | null>(null);

const useAnswerContext = () => {
  const context = useContext(AnswerContext);
  if (!context) {
    throw new Error("Answer is used outside of Answer Parent");
  }
  return context;
};

function AnswerProvider({ children, answer, post_user }: AnswerProps) {
  const { user } = useAuth();
  const totalAwesome = answer.reactions.filter((reaction: Reaction) => reaction.reaction === "awesome").length;
  return (
    <AnswerContext.Provider value={answer}>
      <div
        className={`relative border-s-2 ${user ? "" : "last:border-none last:pb-14"} border-gray-200 dark:border-gray-800 mx-8 mt-7 pb-1 list-none`}
      >
        <li className="mb-5 ms-8">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <Avatar className="border-2 border-gray-300 dark:border-gray-700">
              <AvatarImage src={answer.user.avatar} alt={"D"} />
              <AvatarFallback>
                {answer.user.displayName.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </span>
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-900 dark:border-gray-800 md:flex md:flex-col md:items-start">
            <h1 className="text-md text-gray-700 dark:text-white">
              <b className="font-medium">{answer.user.displayName}</b> answered
              to <b className="font-medium">{post_user}'s</b> post
            </h1>
            <div className="flex flex-row justify-between">
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                {answer &&
                  new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }).format(new Date(answer.created_at))}
              </div>
              {totalAwesome >= 5 && (
               <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mt-2">Best Answer</span>
               )}
            </div>
            {children}
          </div>
        </li>
      </div>
    </AnswerContext.Provider>
  );
}

function Content() {
  const { text } = useAnswerContext();
  return (
    <div className="flex flex-row border-t-[1.3px] pt-3 mt-3 border-gray-200 dark:border-gray-800 text-md">
      {text}
    </div>
  );
}

function Code() {
  const { code, lang } = useAnswerContext();
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!copied) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      } catch (err) {
        console.error("Error copying text to clipboard: ", err);
      }
    }
  };
  if (!code) return null;
  return (
    <div className="pt-4 flex flex-col">
      <div className="bg-gray-200 dark:bg-gray-700 h-9 rounded-tl-md rounded-tr-md flex items-center flex-row justify-between">
        <p className="dark:text-gray-400 text-sm mx-3">{lang}</p>
        <button
          onClick={handleCopy}
          className={`outline-none border-none mx-3 text-xl ${copied ? "text-sky-400" : "dark:text-gray-400"}`}
        >
          <Icon icon={copied ? "iconamoon:check-fill" : "mynaui:copy"} />
        </button>
      </div>
      <div
        className={`p-1.5 rounded-bl-md rounded-br-md ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <SyntaxHighlighter
          className="text-s transparent"
          language={lang}
          style={theme === "dark" ? nightOwl : atomOneLight}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function Reaction() {
  const { reactions, id: answerID } = useAnswerContext();
  const { updateAnswer } = useAnswer();
  const { user } = useAuth();
  const [countReaction, setCountReaction] = useState<any>({ awesome: 0, trash: 0 });
  
  useEffect(() => {
    const reactionCounts = reactions.reduce(
      (acc, cur) => {
        acc[cur.reaction as "awesome" | "trash"]++;
        return acc;
      },
      { awesome: 0, trash: 0 },
    );

    setCountReaction(reactionCounts);
  }, [reactions, user]);

  const handleReaction = async (reaction: string) => {
    const existingReactionIndex = reactions.findIndex(
      (u: { username: string; reaction: string }) => u.username === user.id,
    );
    
    if (existingReactionIndex === -1) {
      const fields = {
        reactions: [
          ...reactions,
          { username: user.id, reaction: reaction },
        ],
      };

      const updatedReactions = [...fields.reactions];
      
      const reactionCounts = updatedReactions.reduce(
      (acc, cur) => {
        acc[cur.reaction as "awesome" | "trash"]++;
        return acc;
      },
      { awesome: 0, trash: 0 },
    );

    setCountReaction(reactionCounts);
      
      await updateAnswer(answerID, fields);
    } else {
      const updatedReactions = [...reactions];
      updatedReactions[existingReactionIndex].reaction = reaction;

      const fields = {
        reactions: updatedReactions,
      };
      
      const reactionCounts = updatedReactions.reduce(
      (acc, cur) => {
        acc[cur.reaction as "awesome" | "trash"]++;
        return acc;
      },
      { awesome: 0, trash: 0 },
    );

    setCountReaction(reactionCounts);

      await updateAnswer(answerID, fields);
    }
    
  };


  return (
    <div className="mt-5 flex flex-row">
      <button
        onClick={() => handleReaction("awesome")}
        className="bg-sky-300 text-gray-700 text-xs font-medium me-2 px-2.5 py-1.5 rounded dark:bg-sky-400 dark:text-sky-100"
      >
        Awesome {countReaction.awesome !== 0 && countReaction.awesome}
      </button>
      <button
        onClick={() => handleReaction("trash")}
        className="bg-blue-100 text-gray-700 text-xs font-medium me-2 px-2.5 py-1.5 rounded dark:bg-gray-700 dark:text-gray-300"
      >
        Trash {countReaction.trash !== 0 && countReaction.trash}
      </button>
    </div>
  );
}


AnswerProvider.Content = Content;
AnswerProvider.Code = Code;
AnswerProvider.Reaction = Reaction;

export default AnswerProvider;
