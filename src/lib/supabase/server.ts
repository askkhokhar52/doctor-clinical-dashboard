import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wrwbockmgvwzdffaqbxc.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyd2JvY2ttZ3Z3emRmZmFxYnhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTA0NzYxMywiZXhwIjoyMTEwNjIzNjEzfQ.QVkWY2l0e6GEIhZCgLC0x4eNG8xhpeVyRCKbjEu0GfY";

export const getSupabaseServerClient = () => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
