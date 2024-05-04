import { useState } from "react";
import { supabase } from "@/lib/helper/supabase-client.ts";

const table: string = "answers";

interface Reaction {
  username: string;
  reaction: string;
}

interface User {
  user_id: string;
  displayName: string;
  avatar?: string;
}

interface Answer {
  id: number;
  post_id: number;
  text: string;
  user: User;
  code: string;
  lang: string;
  reactions: Reaction[];
}

const useAnswer = () => {
  const [data, setData] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAnswer = async (id: number) => {
    try {
      setLoading(true);
      const { data: postData, error }: any = await supabase
        .from(table)
        .select("*")
        .eq("post_id", id);
      if (error) throw error;
      setData(postData || []);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const createAnswer = async (newRecord: Answer) => {
    try {
      setLoading(true);
      const { error: createError } = await supabase
        .from(table)
        .insert([newRecord]);

      if (createError) throw createError;

      return true;
    } catch (createError: any) {
      setError(createError.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAnswer,
    data,
    loading,
    error,
    createAnswer,
  };
};

export { useAnswer };
