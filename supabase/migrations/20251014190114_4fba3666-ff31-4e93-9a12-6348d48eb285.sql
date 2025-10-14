-- Profiles table (synced with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('customer', 'chef', 'admin')) NOT NULL DEFAULT 'customer',
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Chef listings table
CREATE TABLE IF NOT EXISTS public.chef_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT,
  bio TEXT,
  cuisines TEXT[] DEFAULT '{}',
  diet_tags TEXT[] DEFAULT '{}',
  base_price_cents INT,
  price_unit TEXT DEFAULT 'hour',
  travel_radius_km INT DEFAULT 25,
  min_hours INT DEFAULT 2,
  rating_avg NUMERIC DEFAULT 0,
  rating_count INT DEFAULT 0,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  city TEXT,
  state TEXT,
  photos JSONB DEFAULT '[]',
  add_ons JSONB DEFAULT '[]',
  availability JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chef_listings ENABLE ROW LEVEL SECURITY;

-- Chef listings policies
CREATE POLICY "Anyone can view active listings"
  ON public.chef_listings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Chefs can manage own listings"
  ON public.chef_listings FOR ALL
  USING (auth.uid() = chef_id);

-- Jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT,
  event_date DATE,
  start_time TIME,
  end_time TIME,
  headcount INT,
  meals INT,
  location_address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  cuisine TEXT[],
  diet_tags TEXT[],
  budget_type TEXT CHECK (budget_type IN ('fixed', 'hourly')),
  budget_min_cents INT,
  budget_max_cents INT,
  equipment TEXT,
  ingredients_provided BOOLEAN DEFAULT false,
  notes TEXT,
  photos JSONB DEFAULT '[]',
  status TEXT CHECK (status IN ('draft', 'open', 'awarded', 'completed', 'canceled')) DEFAULT 'open',
  metrics JSONB DEFAULT jsonb_build_object(
    'bids_count', 0,
    'median_bid', null,
    'time_remaining', null,
    'chef_response_rate', null
  ),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Jobs policies
CREATE POLICY "Anyone can view open jobs"
  ON public.jobs FOR SELECT
  USING (status IN ('open', 'awarded'));

CREATE POLICY "Customers can manage own jobs"
  ON public.jobs FOR ALL
  USING (auth.uid() = customer_id);

-- Job bids table
CREATE TABLE IF NOT EXISTS public.job_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  chef_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  price_cents INT NOT NULL,
  price_type TEXT CHECK (price_type IN ('fixed', 'hourly')),
  message TEXT,
  proposed_menu TEXT,
  attachments JSONB DEFAULT '[]',
  status TEXT CHECK (status IN ('active', 'withdrawn', 'declined', 'accepted')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (job_id, chef_id)
);

-- Enable RLS
ALTER TABLE public.job_bids ENABLE ROW LEVEL SECURITY;

-- Job bids policies
CREATE POLICY "Job owners and bid owners can view bids"
  ON public.job_bids FOR SELECT
  USING (
    auth.uid() = chef_id OR
    auth.uid() IN (SELECT customer_id FROM public.jobs WHERE id = job_id)
  );

CREATE POLICY "Chefs can create bids"
  ON public.job_bids FOR INSERT
  WITH CHECK (auth.uid() = chef_id);

CREATE POLICY "Chefs can update own bids"
  ON public.job_bids FOR UPDATE
  USING (auth.uid() = chef_id);

-- Chef requests table
CREATE TABLE IF NOT EXISTS public.chef_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.chef_listings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  requested_date DATE,
  start_time TIME,
  end_time TIME,
  headcount INT,
  meals INT,
  message TEXT,
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined', 'canceled', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chef_requests ENABLE ROW LEVEL SECURITY;

-- Chef requests policies
CREATE POLICY "Request participants can view"
  ON public.chef_requests FOR SELECT
  USING (
    auth.uid() = customer_id OR
    auth.uid() IN (SELECT chef_id FROM public.chef_listings WHERE id = listing_id)
  );

CREATE POLICY "Customers can create requests"
  ON public.chef_requests FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Request participants can update"
  ON public.chef_requests FOR UPDATE
  USING (
    auth.uid() = customer_id OR
    auth.uid() IN (SELECT chef_id FROM public.chef_listings WHERE id = listing_id)
  );

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'customer')
  );
  RETURN new;
END;
$$;

-- Trigger on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();