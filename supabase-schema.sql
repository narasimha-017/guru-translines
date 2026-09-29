-- ============================================================
-- GURU TRANSLINES — Supabase Leads Table Schema & Security
-- ============================================================

-- 1. Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    trip_type TEXT NOT NULL,
    pickup_location TEXT NOT NULL,
    drop_location TEXT NOT NULL,
    travel_date DATE NOT NULL,
    return_date DATE,
    passengers INTEGER NOT NULL DEFAULT 1,
    vehicle_requirement TEXT,
    requirements TEXT,
    utm_source TEXT DEFAULT 'direct',
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    landing_page TEXT DEFAULT '/',
    status TEXT DEFAULT 'new'
);

-- 2. Create indices for querying and marketing analysis
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads (utm_source);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow public / anon users to INSERT new leads (Submit enquiry)
CREATE POLICY "Allow public insert to leads"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 5. Policy: Restrict SELECT so public anon users CANNOT read everyone's leads
-- Only authenticated dashboard users / service-role can view leads
CREATE POLICY "Allow authenticated view only"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (true);
