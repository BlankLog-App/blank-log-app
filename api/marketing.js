// ============================================================
// MARKETING API — Generates ad copy using OpenRouter
// ============================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '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';

function getUser(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    try { return jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET); } catch (e) { return null; }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const user = getUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { product, platform } = req.body;
    if (!product) return res.status(400).json({ error: 'Product is required' });

    try {
        const systemPrompt = `You are an expert marketing copywriter for Blank Log™. Write a short, high-converting ad for ${platform} for the product: "${product}". Include a catchy hook, 2-3 sentences of value, and a call to action.`;
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://blank-log-main.vercel.app',
                'X-Title': 'Blank Log Hub'
            },
            body: JSON.stringify({
                model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
                messages: [{ role: 'system', content: systemPrompt }],
                max_tokens: 500
            })
        });

        const data = await response.json();
        if (!response.ok) return res.status(500).json({ error: data.error?.message || 'AI request failed' });

        const copy = data.choices?.[0]?.message?.content || 'No copy generated';
        return res.status(200).json({ success: true, copy });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
