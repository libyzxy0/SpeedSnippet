import { useState, useEffect } from "react";
import { supabase } from "@/lib/helper/supabase-client.ts";

const table: string = "post";

interface User {
  username: string;
  avatar: string;
}

interface Reaction {
  username: string;
  reaction: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
  lang: string;
  code: string;
  user: User;
  user_id: string;
  reactions: Reaction[];
}


const usePost = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: postData, error }: any = await supabase
        .from(table)
        .select("*");
      if (error) throw error;
      setData(postData || []);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  const getSinglePost = async (id?: number): Promise<Post[] | null> => {
    try {
      const { data: postData, error }: any  = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return postData;
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const createPost = async (newRecord: Post) => {
    try {
      setLoading(true);
      const { error: createError } = await supabase
        .from(table)
        .insert([newRecord]);
        
      if (createError) throw createError;
      
      return true;
    } catch (createError: unknown) {
      setError(createError.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  async function updatePost<T>(id: number, updatedFields: Partial<T>): Promise<boolean> {
    try {
      setLoading(true);
      const { error: updateError } = await supabase
        .from(table)
        .update(updatedFields)
        .eq("id", id);
      if (updateError) throw updateError;
      setLoading(false);
      return true;
    } catch (updateError: any) {
      setError((updateError as Error).message);
      setLoading(false);
      return false;
    }
}



const deletePost = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      setLoading(false);
      return true;
    } catch (error: unknown) {
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
    getSinglePost
  };
};

export { usePost };