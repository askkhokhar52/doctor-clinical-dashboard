import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wrwbockmgvwzdffaqbxc.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyd2JvY2ttZ3Z3emRmZmFxYnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNDc2MTMsImV4cCI6MjExMDYyMzYxM30.oSrna_1L6aZqP6XpgW24Z3LOLqw-B12ijgfq-9RLsNM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
