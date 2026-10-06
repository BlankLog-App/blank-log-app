// ============================================================
// ANALYTICS API — TikTok + YouTube stats
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyCR8MEinZxNVMtk8-Ku8lzsBCVRDOhjRvY';

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
        // GET analytics stats
        if (req.method === 'GET') {
            // Count published posts
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

            // Fetch real YouTube stats if connected
            const { data: userData } = await supabase
                .from('users')
                .select('youtube_token, tiktok_token')
                .eq('id', user.userId)
                .single();

            if (userData?.youtube_token) {
                try {
                    const ytResponse = await fetch(
                        `https://www.googleapis.com/youtube/v3/channels?part=statistics&mine=true`,
                        { headers: { 'Authorization': `Bearer ${userData.youtube_token}` } }
                    );
                    const ytData = await ytResponse.json();
                    if (ytData.items?.[0]?.statistics) {
                        stats.youtube.views = parseInt(ytData.items[0].statistics.viewCount) || 0;
                        stats.youtube.subscribers = parseInt(ytData.items[0].statistics.subscriberCount) || 0;
                        stats.youtube.totalVideos = parseInt(ytData.items[0].statistics.videoCount) || 0;
                    }
                } catch (e) {
                    console.warn('YouTube stats error:', e.message);
                }
            }

            return res.status(200).json({ success: true, stats });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Analytics error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
