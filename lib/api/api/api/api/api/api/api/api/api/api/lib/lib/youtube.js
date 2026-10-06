// ============================================================
// YOUTUBE API HELPER
// ============================================================
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyCR8MEinZxNVMtk8-Ku8lzsBCVRDOhjRvY';
const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID || '739172987148-gskgf9lpu8c95iu8vld4p85lqqg5r8bp.apps.googleusercontent.com';
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET || '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';
const YOUTUBE_REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || 'https://blanklog-hub.vercel.app/api/youtube/callback';

/**
 * Get YouTube OAuth URL
 */
function getAuthUrl(state) {
    const params = new URLSearchParams({
        client_id: YOUTUBE_CLIENT_ID,
        redirect_uri: YOUTUBE_REDIRECT_URI,
        response_type: 'code',
        scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly',
        access_type: 'offline',
        prompt: 'consent',
        state: state || 'default'
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Exchange code for access token
 */
async function exchangeCode(code) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            code,
            client_id: YOUTUBE_CLIENT_ID,
            client_secret: YOUTUBE_CLIENT_SECRET,
            redirect_uri: YOUTUBE_REDIRECT_URI,
            grant_type: 'authorization_code'
        })
    });
    return await response.json();
}

/**
 * Get channel info
 */
async function getChannelInfo(accessToken) {
    const response = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return await response.json();
}

/**
 * Upload video
 */
async function uploadVideo(accessToken, videoBuffer, metadata) {
    const { title, description, tags } = metadata;
    
    const initResponse = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Upload-Content-Type': 'video/*'
        },
        body: JSON.stringify({
            snippet: {
                title,
                description,
                tags: tags || [],
                categoryId: '22'
            },
            status: {
                privacyStatus: 'public',
                selfDeclaredMadeForKids: false
            }
        })
    });

    return {
        uploadUrl: initResponse.headers.get('Location'),
        status: initResponse.status
    };
}

module.exports = { getAuthUrl, exchangeCode, getChannelInfo, uploadVideo };
