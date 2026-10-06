// ============================================================
// UPDATES API — Company + App news
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';

function getUserFromToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    try {
        return jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    } catch (e) { return null; }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // GET all updates (public)
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('updates')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ success: true, updates: data });
        }

        // POST new update (admin only)
        if (req.method === 'POST') {
            const user = getUserFromToken(req);
            if (!user) return res.status(401).json({ error: 'Unauthorized' });

            const { data: userData } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.userId)
                .single();

            if (userData?.role !== 'admin' && userData?.role !== 'developer') {
                return res.status(403).json({ error: 'Admin access required' });
            }

            const { title, body, type } = req.body;
            if (!title || !body) {
                return res.status(400).json({ error: 'Title and body required' });
            }

            const { data, error } = await supabase
                .from('updates')
                .insert({
                    title,
                    body,
                    type: type || 'app',
                    posted_by: user.userId
                })
                .select()
                .single();

            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ success: true, update: data });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Updates error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
