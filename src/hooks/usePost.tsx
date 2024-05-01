import { useState, useEffect } from "react";
import { supabase } from "@/lib/helper/supabase-client.ts";

const table: any = "post";
/*
interface User {
  username: string;
  avatar: string;
}
*/
/*

interface Reaction {
  username: string;
  reaction: string;
}
*/
/*
interface Post {
  id: string;
  title: string;
  description: string;
  lang: string;
  code: string;
  user: User;
  user_id: string;
  reactions: Reaction[];
}
*/

const usePost = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: postData, error }: any = await supabase
        .from(table)
        .select<any>("*");
      if (error) throw error;
      setData(postData || []);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const createPost = async (newRecord: any) => {
    try {
      setLoading(true);
      const { error: createError }: any = await supabase
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
  const updatePost = async (id: number, updatedFields: Partial<any>) => {
    try {
      setLoading(true);
      const { error: updateError }: any = await supabase
        .from(table)
        .update(updatedFields)
        .eq("id", id);
      if (updateError) throw updateError;
      setLoading(false);
      return true;
    } catch (updateError: any) {
      setError(updateError.message);
      setLoading(false);
      return false;
    }
};


const deletePost = async (id: string) => {
    try {
      setLoading(true);
      const { error }: any = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      setLoading(false);
      return true;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };


  

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
  };
};

export { usePost };