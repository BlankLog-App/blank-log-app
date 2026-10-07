// ============================================================
// YOUTUBE API HELPER
// ============================================================
const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID || '739172987148-gskgf9lpu8c95iu8vld4p85lqqg5r8bp.apps.googleusercontent.com';
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET || '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';
const YOUTUBE_REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || 'https://blanklog-hub.vercel.app/api/youtube/callback';

function getAuthUrl(state) {
    const params = new URLSearchParams();
    params.append('client_id', YOUTUBE_CLIENT_ID);
    params.append('redirect_uri', YOUTUBE_REDIRECT_URI);
    params.append('response_type', 'code');
    params.append('scope', 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly');
    params.append('access_type', 'offline');
    params.append('prompt', 'consent');
    params.append('state', state || 'default');
    return 'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString();
}

async function exchangeCode(code) {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', YOUTUBE_CLIENT_ID);
    params.append('client_secret', YOUTUBE_CLIENT_SECRET);
    params.append('redirect_uri', YOUTUBE_REDIRECT_URI);
    params.append('grant_type', 'authorization_code');

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
    });
    return await response.json();
}

async function getChannelInfo(accessToken) {
    const response = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    return await response.json();
}

module.exports = { getAuthUrl, exchangeCode, getChannelInfo };
