// ============================================================
// USER MANAGEMENT API
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';

function getUserFromToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    const token = authHeader.replace('Bearer ', '');
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // GET PROFILE
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('users')
                .select('id, email, name, username, bio, status, plan, role, pfp_url, banner_url, theme, created_at')
                .eq('id', user.userId)
                .single();

            if (error) return res.status(500).json({ error: error.message });

            // Also get usage
            const { data: usage } = await supabase
                .from('usage')
                .select('*')
                .eq('user_id', user.userId)
                .single();

            return res.status(200).json({ success: true, user: data, usage });
        }

        // UPDATE PROFILE
        if (req.method === 'PUT' || req.method === 'POST') {
            const { name, username, bio, status, pfp_url, banner_url, theme } = req.body;

            const updates = {};
            if (name !== undefined) updates.name = name;
            if (username !== undefined) updates.username = username;
            if (bio !== undefined) updates.bio = bio;
            if (status !== undefined) updates.status = status;
            if (pfp_url !== undefined) updates.pfp_url = pfp_url;
            if (banner_url !== undefined) updates.banner_url = banner_url;
            if (theme !== undefined) updates.theme = theme;

            const { data, error } = await supabase
                .from('users')
                .update(updates)
                .eq('id', user.userId)
                .select()
                .single();

            if (error) return res.status(500).json({ error: error.message });

            return res.status(200).json({ success: true, user: data });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Users error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
