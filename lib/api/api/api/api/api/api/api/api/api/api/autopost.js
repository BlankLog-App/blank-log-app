// ============================================================
// AUTO POST API — Schedule + publish to TikTok + YouTube
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';

const PLAN_LIMITS = {
    free: 5,
    premium: 25,
    pro: Infinity
};

function getUserFromToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    try {
        return jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    } catch (e) { return null; }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // GET: list scheduled posts
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('scheduled_posts')
                .select('*')
                .eq('user_id', user.userId)
                .order('scheduled_time', { ascending: true });

            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ success: true, posts: data });
        }

        // POST: schedule new post
        if (req.method === 'POST') {
            const { title, platform, videoUrl, scheduledTime } = req.body;

            if (!title || !platform || !scheduledTime) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Check usage
            const { data: userData } = await supabase
                .from('users').select('plan').eq('id', user.userId).single();
            const { data: usage } = await supabase
                .from('usage').select('auto_post_used').eq('user_id', user.userId).single();

            const plan = userData?.plan || 'free';
            const limit = PLAN_LIMITS[plan];
            const used = usage?.auto_post_used || 0;

            if (limit !== Infinity && used >= limit) {
                return res.status(429).json({ error: 'Auto Post limit reached', used, limit });
            }

            const { data, error } = await supabase
                .from('scheduled_posts')
                .insert({
                    user_id: user.userId,
                    title,
                    platform,
                    video_url: videoUrl || null,
                    scheduled_time: scheduledTime,
                    status: 'scheduled'
                })
                .select()
                .single();

            if (error) return res.status(500).json({ error: error.message });

            await supabase
                .from('usage')
                .update({ auto_post_used: used + 1 })
                .eq('user_id', user.userId);

            return res.status(200).json({
                success: true,
                post: data,
                usage: { used: used + 1, limit: limit === Infinity ? 'unlimited' : limit }
            });
        }

        // DELETE: cancel scheduled post
        if (req.method === 'DELETE') {
            const { postId } = req.query;
            if (!postId) return res.status(400).json({ error: 'postId required' });

            await supabase
                .from('scheduled_posts')
                .delete()
                .eq('id', postId)
                .eq('user_id', user.userId);

            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Autopost error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
