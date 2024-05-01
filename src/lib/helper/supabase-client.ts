import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://kohimhagbezipwbpegdn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvaGltaGFnYmV6aXB3YnBlZ2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzYxMDAsImV4cCI6MjAzMDA1MjEwMH0.wmQTVy_T4gx2BSwKTKXMRWeVSObzkJkdkmYCOENS6n8",
);
