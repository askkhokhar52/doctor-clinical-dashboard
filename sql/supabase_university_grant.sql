-- ============================================================================
-- SUPABASE POSTGREST ACCESS PERMISSIONS FOR UNIVERSITY DASHBOARD
-- Project ID: qbhfwfyrffmrconfvmiz
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qbhfwfyrffmrconfvmiz/sql
-- ============================================================================

-- 1. Grant Schema Usage and Permissions to API Roles (anon, authenticated, service_role)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

-- 2. Explicitly Grant SELECT on all Tables and Views
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;

-- 3. Set Default Privileges for Future Tables & Views
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 4. Disable Row Level Security (RLS) on Base Tables so the Public Dashboard can Query
ALTER TABLE IF EXISTS students DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS departments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS employers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS alumni DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS program_admissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS market_gaps DISABLE ROW LEVEL SECURITY;

-- 5. Force PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema';
