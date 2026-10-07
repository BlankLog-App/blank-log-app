// ============================================================
// YOUTUBE OAUTH API — self-contained
// ============================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID || '739172987148-gskgf9lpu8c95iu8vld4p85lqqg5r8bp.apps.googleusercontent.com';
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET || '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';
const YOUTUBE_REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || 'https://blanklog-hub.vercel.app/api/youtube/callback';

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

    const query = req.query || {};
    const action = query.action;
    const code = query.code;

    if (action === 'auth') {
        const user = getUserFromToken(req);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });

        const params = new URLSearchParams();
        params.append('client_id', YOUTUBE_CLIENT_ID);
        params.append('redirect_uri', YOUTUBE_REDIRECT_URI);
        params.append('response_type', 'code');
        params.append('scope', 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly');
        params.append('access_type', 'offline');
        params.append('prompt', 'consent');
        params.append('state', user.userId);

        return res.status(200).json({
            success: true,
            authUrl: 'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString()
        });
    }

    if (action === 'callback' && code) {
        try {
            const tokenParams = new URLSearchParams();
            tokenParams.append('code', code);
            tokenParams.append('client_id', YOUTUBE_CLIENT_ID);
            tokenParams.append('client_secret', YOUTUBE_CLIENT_SECRET);
            tokenParams.append('redirect_uri', YOUTUBE_REDIRECT_URI);
            tokenParams.append('grant_type', 'authorization_code');

            const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: tokenParams.toString()
            });
            const tokenData = await tokenRes.json();

            if (!tokenData.access_token) {
                return res.redirect('/?youtube=error');
            }
            return res.redirect('/?youtube=connected');
        } catch (e) {
            return res.redirect('/?youtube=error');
        }
    }

    return res.status(400).json({ error: 'Invalid action' });
};
