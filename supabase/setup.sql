-- STEP 1: CLEANUP OLD TABLES (IF ANY)
DROP TABLE IF EXISTS public.case_media CASCADE;
DROP TABLE IF EXISTS public.case_goals CASCADE;
DROP TABLE IF EXISTS public.case_studies CASCADE;

-- STEP 2: CREATE CONSOLIDATED TABLE
CREATE TABLE public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    industry TEXT,
    short_description TEXT,
    description_long TEXT,
    company_info TEXT,
    what_we_did TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    hero_image_url TEXT,
    thumbnail_url TEXT,
    results_description TEXT,
    -- Merged data
    goals JSONB DEFAULT '[]'::jsonb,
    media_gallery JSONB DEFAULT '[]'::jsonb,
    -- Metadata
    is_featured BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- STEP 3: INDEXES & TRIGGERS
CREATE INDEX idx_case_studies_slug ON public.case_studies(slug);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_case_studies_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- STEP 4: RLS POLICIES
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for published case studies" 
ON public.case_studies FOR SELECT 
USING (published = true);

-- STEP 5: SEED DATA

-- Case Study 1: Arslan Group
INSERT INTO public.case_studies (
    title, slug, category, industry, is_featured, short_description, description_long, company_info, 
    what_we_did, technologies, hero_image_url, thumbnail_url, results_description, order_index,
    goals, media_gallery
) VALUES (
    'Arslan Group', 
    'arslan-group', 
    'CONSTRUCTION', 
    'Construction', 
    true, 
    'A forward-thinking construction firm dedicated to structural excellence.', 
    'We redesigned Arslan Group''s digital presence to reflect their position as a market leader in construction. The project involved a full brand strategy overhaul, followed by a high-performance custom web platform and a strategic marketing campaign to drive international growth.', 
    'Arslan Group is a premier construction enterprise known for its architectural integrity and large-scale industrial projects.', 
    ARRAY['Brand Strategy & Identity', 'Digital Development', 'Digital Marketing'],
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
    'The Arslan Group platform achieved a 40% increase in lead generation within the first three months. By implementing a high-performance React architecture and optimized SEO strategies, we successfully positioned the brand as a digital leader in the EMEA construction sector, driving record-breaking engagement across all key markets.',
    1,
    '[
        {"goal_number": 1, "title": "Digital Leadership", "description": "Establishing Arslan Group as the premier digital leader in the construction space.", "variant": "light"},
        {"goal_number": 2, "title": "Global Visibility", "description": "Scaling the brand''s reach across international markets with optimized UX.", "variant": "dark"},
        {"goal_number": 3, "title": "Conversion Engine", "description": "Transforming the website into a business-generating machine.", "variant": "blue"}
    ]'::jsonb,
    '[
        {"image_url": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2400&auto=format&fit=crop", "alt": "Showcase 1"},
        {"image_url": "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2400&auto=format&fit=crop", "alt": "Showcase 2"},
        {"image_url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2400&auto=format&fit=crop", "alt": "Showcase 3"}
    ]'::jsonb
);

-- Case Study 2: Hotel Four Stories
INSERT INTO public.case_studies (
    title, slug, category, industry, is_featured, short_description, description_long, company_info, 
    what_we_did, technologies, hero_image_url, thumbnail_url, results_description, order_index,
    goals, media_gallery
) VALUES (
    'Hotel Four Stories', 
    'hotel-four-stories', 
    'HOSPITALITY / HOTELS', 
    'Hospitality', 
    true, 
    'Custom hotel website with multi-lingual structure and premium visual experience.', 
    'Hotel Four Stories required a digital experience that matched its boutique atmosphere. We developed a custom booking integration, multi-language CMS, and a visual-first mobile experience that drives direct bookings.', 
    'Hotel Four Stories is a boutique hospitality brand focused on artisanal travel experiences and storytelling through architectural design.', 
    ARRAY['UI/UX DESIGN', 'MULTILINGUAL CMS', 'BOOKING INTEGRATION'],
    ARRAY['React', 'Next.js', 'Tailwind CSS', 'MEWS API', 'Sanity CMS'],
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    'The new digital experience resulted in a 25% shift from OTA bookings to direct website reservations. The immersive storytelling approach and intuitive mobile UI significantly enhanced guest satisfaction and improved the average stay duration by 15% through strategic upsell integration.',
    2,
    '[
        {"goal_number": 1, "title": "Direct Bookings", "description": "Reducing reliance on OTAs by optimizing the direct booking funnel.", "variant": "light"},
        {"goal_number": 2, "title": "Storytelling UX", "description": "Creating an immersive digital guest journey that begins before arrival.", "variant": "dark"},
        {"goal_number": 3, "title": "Operational Efficiency", "description": "Seamless integration with MEWS PMS for real-time availability.", "variant": "blue"}
    ]'::jsonb,
    '[
        {"image_url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2400&auto=format&fit=crop", "alt": "Room Showcase"},
        {"image_url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2400&auto=format&fit=crop", "alt": "Lobby View"},
        {"image_url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2400&auto=format&fit=crop", "alt": "Pool Terrace"}
    ]'::jsonb
);

-- STEP 6: OUR CLIENTS TABLE
CREATE TABLE public.our_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    industry TEXT,
    short_description TEXT,
    description_long TEXT,
    company_info TEXT,
    what_we_did TEXT[] DEFAULT '{}',
    hero_image_url TEXT,
    thumbnail_url TEXT,
    media_gallery JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES & TRIGGERS
CREATE INDEX idx_our_clients_slug ON public.our_clients(slug);

CREATE TRIGGER update_our_clients_updated_at
    BEFORE UPDATE ON public.our_clients
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- RLS POLICIES
ALTER TABLE public.our_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for published clients" 
ON public.our_clients FOR SELECT 
USING (published = true);

-- SEED DATA FOR OUR CLIENTS
INSERT INTO public.our_clients (
    title, slug, category, industry, is_featured, short_description, description_long, company_info, 
    what_we_did, hero_image_url, thumbnail_url, order_index,
    media_gallery
) VALUES 
(
    'Global Tech', 
    'global-tech', 
    'TECH SOLUTION', 
    'Technology', 
    true, 
    'Leading the way in global infrastructure and cloud security.', 
    'Global Tech reached out to us to redefine their digital footprint in a rapidly evolving market. We focused on high-performance cloud architecture and a visual identity that speaks to their mission of secure, global connectivity.', 
    'Global Tech is a multi-national technology firm specializing in enterprise-grade infrastructure and next-gen cybersecurity solutions.', 
    ARRAY['Cloud Architecture', 'Security Audit', 'Brand Redesign'], 
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400&auto=format&fit=crop', 
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop', 
    1,
    '[{"image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600", "alt": "Infra View"}]'::jsonb
),
(
    'Innovate Lab', 
    'innovate-lab', 
    'RESEARCH', 
    'R&D', 
    true, 
    'Next-gen laboratory research for the biotech industry.', 
    'Innovate Lab required a complex data visualization dashboard to showcase their research findings to global stakeholders. We built a real-time analytics platform integrated with their local lab systems.', 
    'Innovate Lab is a premier R&D facility dedicated to breakthroughs in biotechnology and pharmaceutical sciences.', 
    ARRAY['AI & Machine Learning', 'Big Data Visualization', 'Scientific UI'], 
    'https://images.unsplash.com/photo-1532187863486-abf9d39d99c5?q=80&w=2400&auto=format&fit=crop', 
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop', 
    2,
    '[{"image_url": "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600", "alt": "Scientific Display"}]'::jsonb
),
(
    'Visionary Inc', 
    'visionary-inc', 
    'CREATIVE', 
    'Design', 
    true, 
    'Creative excellence for global luxury brands.', 
    'Visionary Inc partnered with us to launch a cinematic portfolio site that reflects their status as the world''s leading creative boutique. The experience is centered around liquid motion and ultra-premium aesthetics.', 
    'Visionary Inc is an award-winning creative agency known for high-fashion campaigns and avant-garde brand strategy.', 
    ARRAY['Cinematic UI', 'Liquid Motion', 'Luxury Strategy'], 
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2400&auto=format&fit=crop', 
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop', 
    3,
    '[{"image_url": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600", "alt": "Creative Workspace"}]'::jsonb
);

-- STEP 7: OUR STORY TABLE
CREATE TABLE public.our_story (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    thumbnail_url TEXT,
    long_description TEXT,
    short_description TEXT,
    images TEXT[] DEFAULT '{}',
    video_section TEXT,
    story_by TEXT,
    position TEXT,
    link TEXT,
    order_index INT DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES & TRIGGERS
CREATE INDEX idx_our_story_slug ON public.our_story(slug);

CREATE TRIGGER update_our_story_updated_at
    BEFORE UPDATE ON public.our_story
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- RLS POLICIES
ALTER TABLE public.our_story ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for published stories" 
ON public.our_story FOR SELECT 
USING (published = true);

-- SEED DATA FOR OUR STORY
INSERT INTO public.our_story (
    title, slug, category, thumbnail_url, long_description, short_description, images, video_section, story_by, position, link, order_index
) VALUES 
(
    'The Vision Behind Klarus', 
    'vision-behind-klarus', 
    'Foundation', 
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2400', 
    'Our journey began with a simple observation: the digital gap between ambition and execution was widening. We set out to build an agency that doesn''t just deliver services, but acts as a strategic extension of every partner we work with. This long description spans across the vision and mission of our founding days.', 
    'Building the future on a foundation of trust and innovation.', 
    ARRAY['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600'], 
    'Cinematic Vision', 
    'Talha Ahmed', 
    'Founder & CEO', 
    'https://www.instagram.com/p/DBIeYIdPz-p/', 
    1
),
(
    'The Future of AI scaling', 
    'future-ai-scaling', 
    'Innovation', 
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2400', 
    'AI is no longer a buzzword; it is the core engine of modern business growth. We are at the forefront of integrating autonomous workflows that allow creative teams to focus on what truly matters: high-level strategy and human emotion.', 
    'Scaling businesses at the speed of thought with AI.', 
    ARRAY['https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600'], 
    'Scaling Excellence', 
    'Sarah Chen', 
    'Head of AI', 
    'https://www.instagram.com/reels/DAqR_bAps_n/', 
    2
);

-- AI PROMPTS TABLE
CREATE TABLE IF NOT EXISTS public.ai_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    prompt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    order_index INT DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES & TRIGGERS
CREATE INDEX idx_ai_prompts_published ON public.ai_prompts(published);

CREATE TRIGGER handle_updated_at_ai_prompts
    BEFORE UPDATE ON public.ai_prompts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.ai_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for published ai_prompts"
    ON public.ai_prompts FOR SELECT
    USING (published = true);

-- SEED DATA
INSERT INTO public.ai_prompts (title, prompt, image_url, category, order_index) VALUES
('Klarus Vision', 'Create a hyper-realistic cinematic shot of a futuristic AI lab in a minimalist style, dominated by glass and deep blue lighting.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2400', 'Creative', 1),
('Neural Architect', 'Design a structure that represents neural pathways connecting in a 3D space, using gold and obsidian materials.', 'https://images.unsplash.com/photo-1676299081847-5a6265000f12?q=80&w=2400', 'Architecture', 2),
('Creative Flux', 'Abstract 3D render of vibrant color flows merging together, represent digital synergy and creative motion.', 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2400', 'Art', 3),
('Logic Core', 'A technical blueprint of a quantum processor core, glowing with cyan energy, macro photography style.', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2400', 'Technical', 4),
('Prompt Engineer', 'A macro shot of a sleek keyboard with glowing neon blue legends, extreme depth of field, futuristic office vibe.', 'https://images.unsplash.com/photo-1684163762274-98ae52538181?q=80&w=2400', 'Lab', 5),
('AutoFlow AI', 'An automated robotic arm assembly line in a clean white factory, shot with a wide angle lens, high contrast.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400', 'Automation', 6),
('Synth Creative', 'Synthwave style digital landscape with purple grid floors and a giant orange sun, retro-futuristic aesthetic.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2400', 'Design', 7),
('Data Weaver', 'Visual representation of big data as glowing threads woven together in a dark void, cinematic lighting.', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2400', 'Data', 8),
('Cognitive AI', 'Close-up of a high-tech android eye with visible microcircuitry in the iris, reflecting a digital world.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2400', 'Robotics', 9),
('Pulse AI', 'Electric pulses traveling through a circuit board at high speed, captured with a high-speed camera, blue and pink streaks.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2400', 'Energy', 10),
('Omni Engine', 'Top down view of a complex mechanical engine part made of brushed steel and glowing blue elements.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400', 'Engineering', 11),
('Klarus AI Lab', 'Interior of a high-tech server room with vertical server racks and blue LED indicators, symmetrical composition.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2400', 'Infrastructure', 12),
('Quantum Prompts', 'Visualize quantum superposition as a multi-layered translucent sphere with swirling chaotic energy inside.', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2400', 'Physics', 13),
('Cyber Vision', 'A person wearing advanced AR glasses reflecting a complex digital interface, city lights in the background.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2400', 'Cyber', 14),
('Evolving Intelligence', 'A sequence of geometric shapes evolving from simple cubes into complex fractals, representing AI growth.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2400', 'Concept', 15);
