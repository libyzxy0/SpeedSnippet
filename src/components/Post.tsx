import React from 'react';
import { cn } from "@/lib/utils"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Icon } from '@iconify/react';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from "@/components/theme-provider"

import { Button } from "@/components/ui/button";
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
type PostProps = {
  children: React.ReactNode, 
  className: string
}

type HeaderProps = {
  username: string, 
  src: string
}
type CaptionProps = {
  title: string, 
  description: string
}
type CodeSnippetProps = {
  code: string, 
  lang: string
}

function Post({ children, className }: PostProps) {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  )
}

function Header({ username, src }) {
  return (
    <div className="bg-white dark:bg-gray-950 w-full py-2 border-t-4 border-sky-300 flex flex-row items-center">
      <Avatar className="ml-4 border-2 border-gray-300 dark:border-gray-800">
        <AvatarImage src={src} alt={"D"} />
        <AvatarFallback>{((
        username.split(""))[0]).toUpperCase()
        }</AvatarFallback>
      </Avatar>
      <h1 className="font-medium text-lg mx-2 text-gray-700 dark:text-gray-50">{ "@" + username }</h1>
    </div>
  )
}

function Caption({ title, description }: CaptionProps) {
  return (
    <div className="border-t border-gray-300 dark:border-gray-800">
      <h1 className="text-xl mx-4 mt-4 font-bold text-gray-700 dark:text-gray-50">{ title }</h1>
      <p className="text-gray-700 dark:text-gray-100 mx-4 mt-2">{ description }</p>
    </div>
  )
}

function CodeSnippet({ code, lang }: CodeSnippetProps) {
  const { theme } = useTheme();
  return (
    <div className="px-4 py-4 flex flex-col">
      <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded-tl-lg rounded-tr-lg flex items-center flex-row justify-between">
        <p className="dark:text-gray-400 text-sm mx-3">{lang}</p>
        <button className="outline-none border-none mx-3 text-xl dark:text-gray-400">
          <Icon icon="mynaui:copy" />
        </button>
      </div>
      <SyntaxHighlighter className={`text-sm rounded-bl-lg rounded-br-lg ${theme == "dark" ? 'codebg-black' : 'codebg-white' }`} language={lang} style={theme == "dark"? atomOneDark : atomOneLight}>
      {code}
     </SyntaxHighlighter>
    </div>
  )
}

function Reaction() {
  return (
    <div className="border-t mt-2 border-gray-300 dark:border-gray-800 flex flex-row">
      <Button className="bg-white shadow-none rounded-none dark:bg-gray-950 text-gray-400 py-6 border-none w-[50%] transition-all duration-200 hover:bg-transparent hover:text-gray-900 dark:hover:text-white">⚡ Awesome</Button>
      <Button className="bg-white shadow-none rounded-none dark:bg-gray-950 text-gray-400 py-6 border-none w-[50%] transition-all duration-200 hover:bg-transparent hover:text-gray-900 dark:hover:text-white">💩 Trash</Button>
    </div>
  )
}

Post.Header = Header;
Post.Caption = Caption;
Post.CodeSnippet = CodeSnippet;
Post.Reaction = Reaction;

export default Post;