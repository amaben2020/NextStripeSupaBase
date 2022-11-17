import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// supabase client allowed to do anything server side
export const getServiceSupabase = () =>
  createClient(
    supabaseUrl,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nenBtbW1rdm9id2RjdWN1b3VkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NDEwMTEzMCwiZXhwIjoxOTY5Njc3MTMwfQ.cx3kNGEULir_F6f1WKvfV4MFzLnut8t_642NhZIJHXw'
  );
