// ============================================================
// ANALYTICS API — TikTok + YouTube stats
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

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
        if (req.method === 'GET') {
            const { data: posts } = await supabase
                .from('scheduled_posts')
                .select('*')
                .eq('user_id', user.userId);

            const stats = {
                totalPosts: posts?.length || 0,
                scheduled: posts?.filter(p => p.status === 'scheduled').length || 0,
                published: posts?.filter(p => p.status === 'published').length || 0,
                tiktok: {
                    posts: posts?.filter(p => p.platform === 'TikTok').length || 0,
                    views: 0,
                    likes: 0,
                    comments: 0,
                    shares: 0
                },
                youtube: {
                    posts: posts?.filter(p => p.platform === 'YouTube').length || 0,
                    views: 0,
                    likes: 0,
                    comments: 0,
                    shares: 0
                },
                topPosts: []
            };

            return res.status(200).json({ success: true, stats });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Analytics error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
