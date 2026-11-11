// ============================================================
// RESEARCH TAB API — Saves 3D projects
// ============================================================
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cupcgocukinhfhqqbmwo.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cGNnb2N1a2luaGZocXFibXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMTUxMzgsImV4cCI6MjEwNjc5MTEzOH0.v7hwDeDj7xGiUqqbIYbzJIn5Kf5srabBml-iNLNNU60';
const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getUser(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    try { return jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET); } catch (e) { return null; }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const user = getUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    // Check if user is admin (only you can use research)
    const { data: userData } = await supabase.from('users').select('role').eq('id', user.userId).single();
    if (userData?.role !== 'admin' && userData?.role !== 'developer') {
        return res.status(403).json({ error: 'Access Denied' });
    }

    try {
        if (req.method === 'GET') {
            const { data } = await supabase.from('research_projects').select('*').eq('user_id', user.userId).order('created_at', { ascending: false });
            return res.status(200).json({ success: true, projects: data || [] });
        }

        if (req.method === 'POST') {
            const { title, type, data } = req.body;
            const { data: newProject, error } = await supabase.from('research_projects').insert({
                user_id: user.userId, title, type, data
            }).select().single();
            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ success: true, project: newProject });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await supabase.from('research_projects').delete().eq('id', id).eq('user_id', user.userId);
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
