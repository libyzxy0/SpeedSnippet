import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { usePost } from '@/hooks/usePost';
import { Toaster } from "@/components/ui/toaster";
import { getUsername } from "@/lib/helper/username-getter.ts";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export default function CreatePost() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  });

  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [lang, setLang] = useState("js");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { createPost, error } = usePost();
  
  const handlePost = async (): Promise<void> => {
    try {
    const data = {
      id: Math.floor(Math.random() * 100000000), 
      user_id: user.id,
      user: {
        avatar: user.user_metadata.avatar_url, 
        username: getUsername(user)
      }, 
      title, 
      description, 
      lang, 
      code, 
      reactions: []
    };
    await createPost(data);
    toast({
      title: error ? "Error" : "Success",
      description: error ? "Failed to post snippet" : "Snippet is posted! Redirecting you to feed in 3 seconds.",
    });
    setTitle("");
    setCode("");
    setLang("");
    setDescription("");
    setTimeout(() => {
      navigate("/");
    }, 3000);
    } catch (err) {
      console.log(err);
      toast({
      title: "Error occurred!",
      description: err ? err : "Something went wrong",
    });
    }
  }
   
  return (
    <>
    <div className="h-full w-full bg-white dark:bg-gray-950 pb-10">
      <Header back="/" />

      <div className="pt-14 mx-5">
        <div>
          <label className="text-gray-700 dark:text-white text-md font-medium">
            Select Language
          </label>
          <Select value={lang} onValueChange={(value) => setLang(value)}>
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
        </div>
        <div className="mt-5">
          <label className="text-gray-700 dark:text-white text-md font-medium">
            Code
          </label>
          <CodeEditor
            value={code}
            language={lang}
            className={`text-[15px] border-[1.7px] border-gray-300 dark:border-gray-700 rounded-sm ${theme === "dark" ? "bg-gray-950" : "codebg-white"} mt-2`}
            placeholder="Paste your code here."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            data-color-mode={theme == "dark" ? "dark" : "light"}
          />
        </div>

        <div className="mt-10">
          <label className="text-gray-700 dark:text-white text-md font-medium">
            Enter Snippet title
          </label>
          <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
            className="py-5 mt-2 border-[1.7px] border-gray-300 dark:border-gray-600 focus:border-gray-700 dark:focus:border-white focus-visible:ring-0"
            type="text"
            placeholder="My Snippet"
          />
        </div>
        <div className="mt-5">
          <label className="text-gray-700 dark:text-white text-md font-medium">
            Description
          </label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Lorem Ipsum dolor sit amet in den."
            className="resize-none border-[1.7px] border-gray-300 dark:border-gray-600 focus:border-gray-700 dark:focus:border-white focus-visible:ring-0 mt-2"
            rows={6}
          />
        </div>
        <Button onClick={handlePost} className="py-5 w-full mt-6">Upload Snippet</Button>
      </div>
    </div>
    <Toaster />
    </>
  );
}
