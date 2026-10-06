// ============================================================
// YOUTUBE OAUTH API
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');
const youtube = require('../lib/youtube');

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
        const { action, code } = req.query;

        // Step 1: Get auth URL
        if (action === 'auth') {
            const user = getUserFromToken(req);
            if (!user) return res.status(401).json({ error: 'Unauthorized' });
            const url = youtube.getAuthUrl(user.userId);
            return res.status(200).json({ success: true, authUrl: url });
        }

        // Step 2: Handle callback
        if (action === 'callback' && code) {
            const tokenData = await youtube.exchangeCode(code);
            
            if (!tokenData.access_token) {
                return res.redirect('/?youtube=error');
            }

            // Get channel info
            const channelInfo = await youtube.getChannelInfo(tokenData.access_token);

            return res.redirect('/?youtube=connected');
        }

        return res.status(400).json({ error: 'Invalid action' });

    } catch (error) {
        console.error('YouTube error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
