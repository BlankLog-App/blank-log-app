// ============================================================
// AI CHAT API — Uses OpenRouter
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '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';

const PLAN_LIMITS = {
    free: 20,
    premium: 100,
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

    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    try {
        // Get user plan + usage
        const { data: userData } = await supabase
            .from('users')
            .select('plan')
            .eq('id', user.userId)
            .single();

        const { data: usage } = await supabase
            .from('usage')
            .select('chat_used, last_reset')
            .eq('user_id', user.userId)
            .single();

        const plan = userData?.plan || 'free';
        const limit = PLAN_LIMITS[plan];
        const used = usage?.chat_used || 0;

        // Check limit
        if (limit !== Infinity && used >= limit) {
            return res.status(429).json({
                error: 'Chat limit reached',
                used,
                limit,
                resetDate: usage?.last_reset
            });
        }

        // Build messages array
        const messages = [
            { role: 'system', content: 'You are Blank AI, a helpful assistant inside Blank Log Hub. Be concise, accurate, and friendly.' }
        ];

        if (history && Array.isArray(history)) {
            history.slice(-10).forEach(msg => {
                messages.push({ role: msg.role, content: msg.content });
            });
        }
        messages.push({ role: 'user', content: message });

        // Call OpenRouter
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

        if (!response.ok) {
            return res.status(500).json({ error: data.error?.message || 'AI request failed' });
        }

        const aiMessage = data.choices?.[0]?.message?.content || 'No response';

        // Save to database
        await supabase.from('chat_messages').insert([
            { user_id: user.userId, role: 'user', content: message },
            { user_id: user.userId, role: 'assistant', content: aiMessage }
        ]);

        // Increment usage
        await supabase
            .from('usage')
            .update({ chat_used: used + 1 })
            .eq('user_id', user.userId);

        return res.status(200).json({
            success: true,
            message: aiMessage,
            usage: { used: used + 1, limit: limit === Infinity ? 'unlimited' : limit }
        });

    } catch (error) {
        console.error('Chat error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
