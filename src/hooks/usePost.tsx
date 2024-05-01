import { useState, useEffect } from "react";
import { supabase } from "@/lib/helper/supabase-client.ts";

const table = "post";


interface User {
  username: string;
  avatar: string;
}

interface Reaction {
  username: string;
  reaction: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  lang: string;
  code: string;
  user: User;
  reactions: Reaction[];
}


const usePost = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).select<Post>("*");
      if (error) throw error;
      setData(data || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const createPost = async (newRecord: Post) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).insert<Post>([newRecord]);
      if (error) throw error;
      setData((prevData) => [...prevData, newRecord]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updatePost = async (id: string, updatedFields: Partial<Post>) => { 
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(table)
        .update(updatedFields)
        .eq("id", id);
      if (error) throw error;
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
      );
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => { 
    try {
      setLoading(true);
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
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