// ============================================================
// TIKTOK API HELPER
// ============================================================
const TIKTOK_CLIENT_ID = process.env.TIKTOK_CLIENT_ID || 'aw7civ904e3v0rgx';
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || '6cUaIPPTaLj3WbBR2OVRc9j7s4M6d0FR';
const TIKTOK_REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI || 'https://blanklog-hub.vercel.app/api/tiktok/callback';

function getAuthUrl(state) {
    const params = new URLSearchParams({
        client_key: TIKTOK_CLIENT_ID,
        scope: 'user.info.basic,video.publish,video.upload',
        response_type: 'code',
        redirect_uri: TIKTOK_REDIRECT_URI,
        state: state || 'default'
    });
    return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
}

async function exchangeCode(code) {
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_key: TIKTOK_CLIENT_ID,
            client_secret: TIKTOK_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: TIKTOK_REDIRECT_URI
        })
    });
    return await response.json();
}

async function getUserInfo(accessToken) {
    const response = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return await response.json();
}

async function publishVideo(accessToken, videoUrl, caption) {
    const response = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_info: {
                title: caption,
                privacy_level: 'PUBLIC_TO_EVERYONE',
                disable_duet: false,
                disable_comment: false,
                disable_stitch: false
            },
            source_info: {
                source: 'PULL_FROM_URL',
                video_url: videoUrl
            }
        })
    });
    return await response.json();
}

module.exports = { getAuthUrl, exchangeCode, getUserInfo, publishVideo };
