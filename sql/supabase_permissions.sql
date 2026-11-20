-- ============================================================================
-- SUPABASE POSTGREST ACCESS PERMISSIONS
-- Run this script in your Supabase Project SQL Editor:
-- https://supabase.com/dashboard/project/wrwbockmgvwzdffaqbxc/sql
-- ============================================================================

-- 1. Grant Schema & Table Access to Supabase API Roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 2. Disable Row Level Security (RLS) so the REST API can read tables directly
ALTER TABLE IF EXISTS doctors DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS patients DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS patient_conditions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS care_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS satisfaction_surveys DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS clinical_alerts DISABLE ROW LEVEL SECURITY;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
