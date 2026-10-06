// ============================================================
// CODE ASSISTANT API — Uses OpenRouter
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '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';

const PLAN_LIMITS = {
    free: 15,
    premium: 75,
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

    const { code, language, task } = req.body;
    if (!code) return res.status(400).json({ error: 'Code required' });

    try {
        const { data: userData } = await supabase
            .from('users').select('plan').eq('id', user.userId).single();
        const { data: usage } = await supabase
            .from('usage').select('code_used').eq('user_id', user.userId).single();

        const plan = userData?.plan || 'free';
        const limit = PLAN_LIMITS[plan];
        const used = usage?.code_used || 0;

        if (limit !== Infinity && used >= limit) {
            return res.status(429).json({ error: 'Code limit reached', used, limit });
        }

        const taskPrompts = {
            review: 'Review this code for bugs, security issues, and improvements. Be specific and actionable.',
            explain: 'Explain this code in clear, simple terms. Break down what it does step by step.',
            debug: 'Find bugs and errors in this code. Explain the issues and provide fixes.',
            optimize: 'Suggest performance optimizations for this code.',
            document: 'Add comprehensive comments and documentation to this code.',
            convert: 'Convert this code to a clean, well-structured version.',
            security: 'Perform a security audit on this code. Identify vulnerabilities.'
        };

        const systemPrompt = `You are a senior software engineer. Language: ${language || 'JavaScript'}. Task: ${task || 'review'}.\n\n${taskPrompts[task] || taskPrompts.review}\n\nFormat your response with clear sections and code blocks where relevant.`;

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
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `\`\`\`${language || 'javascript'}\n${code}\n\`\`\`` }
                ],
                max_tokens: 3000
            })
        });

        const data = await response.json();
        if (!response.ok) return res.status(500).json({ error: data.error?.message || 'AI request failed' });

        const output = data.choices?.[0]?.message?.content || 'No output generated';

        await supabase.from('code_history').insert({
            user_id: user.userId,
            language: language || 'javascript',
            task: task || 'review',
            input_code: code,
            output
        });

        await supabase.from('usage')
            .update({ code_used: used + 1 })
            .eq('user_id', user.userId);

        return res.status(200).json({
            success: true,
            output,
            usage: { used: used + 1, limit: limit === Infinity ? 'unlimited' : limit }
        });

    } catch (error) {
        console.error('Code error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
