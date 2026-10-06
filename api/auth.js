// ============================================================
// AUTHENTICATION API
// ============================================================
const { supabase } = require('../lib/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    if (!body || typeof body !== 'object') body = {};

    const { action, email, password, name } = body;

    try {
        if (action === 'signup') {
            if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid input types' });
            }

            const cleanEmail = email.toLowerCase().trim();
            const cleanName = name.trim();
            const cleanPassword = password.trim();

            if (!cleanEmail || !cleanPassword || !cleanName) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            if (cleanPassword.length < 6) {
                return res.status(400).json({ error: 'Password must be 6+ characters' });
            }

            const { data: existing } = await supabase
                .from('users')
                .select('id')
                .eq('email', cleanEmail)
                .maybeSingle();

            if (existing) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(cleanPassword, 10);

            const { data: user, error } = await supabase
                .from('users')
                .insert({
                    email: cleanEmail,
                    name: cleanName,
                    username: '@' + cleanName.toLowerCase().replace(/\s/g, ''),
                    password_hash: hashedPassword,
                    plan: 'free',
                    role: 'user'
                })
                .select()
                .single();

            if (error) return res.status(500).json({ error: error.message });

            await supabase.from('usage').insert({
                user_id: user.id,
                auto_post_used: 0,
                chat_used: 0,
                kalshi_used: 0,
                code_used: 0,
                analytics_used: 0,
                homework_used: 0
            });

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '30d' }
            );

            return res.status(200).json({
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    plan: user.plan,
                    role: user.role
                }
            });
        }

        if (action === 'login') {
            if (typeof email !== 'string' || typeof password !== 'string') {
                return res.status(400).json({ error: 'Invalid input types' });
            }

            const cleanEmail = email.toLowerCase().trim();
            const cleanPassword = password.trim();

            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', cleanEmail)
                .maybeSingle();

            if (error || !user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const validPassword = await bcrypt.compare(cleanPassword, user.password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '30d' }
            );

            return res.status(200).json({
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    plan: user.plan,
                    role: user.role,
                    pfp_url: user.pfp_url,
                    banner_url: user.banner_url,
                    bio: user.bio,
                    status: user.status
                }
            });
        }

        return res.status(400).json({ error: 'Invalid action' });

    } catch (error) {
        console.error('Auth error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
