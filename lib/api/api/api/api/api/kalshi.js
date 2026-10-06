// ============================================================
// KALSHI API — Upload screenshot, AI does deep research
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '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';

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
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { question, imageBase64 } = req.body;
    if (!question && !imageBase64) {
        return res.status(400).json({ error: 'Question or screenshot required' });
    }

    try {
        const { data: userData } = await supabase
            .from('users').select('plan').eq('id', user.userId).single();
        const { data: usage } = await supabase
            .from('usage').select('kalshi_used').eq('user_id', user.userId).single();

        const plan = userData?.plan || 'free';
        const limit = PLAN_LIMITS[plan];
        const used = usage?.kalshi_used || 0;

        if (limit !== Infinity && used >= limit) {
            return res.status(429).json({ error: 'Kalshi limit reached', used, limit });
        }

        const systemPrompt = `You are a prediction market research analyst. Analyze the given prediction market question and screenshot (if provided). Do deep research: consider news, social media trends, historical data, and market signals. Return:
1. Your recommendation: YES or NO
2. Your estimated probability (0-100%)
3. A brief reasoning (2-4 sentences)

Format your response exactly as:
RECOMMENDATION: [YES or NO]
PROBABILITY: [number]%
REASONING: [your reasoning]`;

        const messages = [{ role: 'system', content: systemPrompt }];

        if (imageBase64) {
            messages.push({
                role: 'user',
                content: [
                    { type: 'text', text: question || 'Should I bet YES or NO on this market?' },
                    { type: 'image_url', image_url: { url: imageBase64 } }
                ]
            });
        } else {
            messages.push({ role: 'user', content: question });
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://blanklog-hub.vercel.app',
                'X-Title': 'Blank Log Hub'
            },
            body: JSON.stringify({
                model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
                messages,
                max_tokens: 2000
            })
        });

        const data = await response.json();
        if (!response.ok) return res.status(500).json({ error: data.error?.message || 'AI request failed' });

        const aiResponse = data.choices?.[0]?.message?.content || '';

        // Parse response
        const recMatch = aiResponse.match(/RECOMMENDATION:\s*(YES|NO)/i);
        const probMatch = aiResponse.match(/PROBABILITY:\s*(\d+)/i);
        const reasonMatch = aiResponse.match(/REASONING:\s*([\s\S]+)/i);

        const recommendation = recMatch ? recMatch[1].toUpperCase() : 'UNCLEAR';
        const probability = probMatch ? parseInt(probMatch[1]) : 50;
        const reasoning = reasonMatch ? reasonMatch[1].trim() : aiResponse;

        await supabase.from('predictions').insert({
            user_id: user.userId,
            question: question || '[screenshot]',
            screenshot_url: imageBase64 ? '[uploaded]' : null,
            recommendation,
            probability,
            reasoning
        });

        await supabase.from('usage')
            .update({ kalshi_used: used + 1 })
            .eq('user_id', user.userId);

        return res.status(200).json({
            success: true,
            recommendation,
            probability,
            reasoning,
            usage: { used: used + 1, limit: limit === Infinity ? 'unlimited' : limit }
        });

    } catch (error) {
        console.error('Kalshi error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
