// ============================================================
// HOMEWORK SOLVER API — Uses OpenRouter with Vision
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

    const { subject, grade, task, question, imageBase64 } = req.body;
    if (!question && !imageBase64) {
        return res.status(400).json({ error: 'Question or image required' });
    }

    try {
        const { data: userData } = await supabase
            .from('users').select('plan').eq('id', user.userId).single();
        const { data: usage } = await supabase
            .from('usage').select('homework_used').eq('user_id', user.userId).single();

        const plan = userData?.plan || 'free';
        const limit = PLAN_LIMITS[plan];
        const used = usage?.homework_used || 0;

        if (limit !== Infinity && used >= limit) {
            return res.status(429).json({ error: 'Homework limit reached', used, limit });
        }

        const systemPrompt = `You are a helpful tutor for ${grade || 'high school'} students. Subject: ${subject || 'general'}. Task: ${task || 'solve'}. Provide clear, accurate, step-by-step answers. Be thorough but not overly verbose. If writing an essay, make it well-structured. If solving math, show all steps. If citing, use proper MLA or APA format.`;

        const messages = [{ role: 'system', content: systemPrompt }];

        if (imageBase64) {
            messages.push({
                role: 'user',
                content: [
                    { type: 'text', text: question || 'Solve the problem in this image.' },
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
                max_tokens: 4000
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: data.error?.message || 'AI request failed' });
        }

        const answer = data.choices?.[0]?.message?.content || 'No answer generated';

        await supabase.from('homework_history').insert({
            user_id: user.userId,
            subject, grade, task,
            question: question || '[image]',
            answer
        });

        await supabase.from('usage')
            .update({ homework_used: used + 1 })
            .eq('user_id', user.userId);

        return res.status(200).json({
            success: true,
            answer,
            usage: { used: used + 1, limit: limit === Infinity ? 'unlimited' : limit }
        });

    } catch (error) {
        console.error('Homework error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
