import { useState, useEffect } from "react";
import { supabase } from "@/lib/helper/supabase-client.ts";

const table = "post";

const usePost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).select("*");
      if (error) throw error;
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const createPost = async (newRecord) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).insert([newRecord]);
      if (error) throw error;
      setData([...data, ...newRecord]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updatePost = async (id, updatedFields) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(table)
        .update(updatedFields)
        .eq("id", id);
      if (error) throw error;
      const updatedData = data ? data[0] : null;
      setData(
        data.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item,
        ),
      );
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      setData(data.filter((item) => item.id !== id));
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
