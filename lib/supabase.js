// ============================================================
// SUPABASE CONNECTION
// ============================================================
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cupcgocukinhfhqqbmwo.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cGNnb2N1a2luaGZocXFibXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMTUxMzgsImV4cCI6MjEwNjc5MTEzOH0.v7hwDeDj7xGiUqqbIYbzJIn5Kf5srabBml-iNLNNU60';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = { supabase };
