import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ycntrqogldapvdatsdvs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbnRycW9nbGRhcHZkYXRzZHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMTI4MDUsImV4cCI6MjAzMDU4ODgwNX0.9wYWdV9DgNTsjJDYzHebme6NDWUCEzqFCYPF3fSREGo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
