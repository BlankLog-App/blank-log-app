// ============================================================
// AUTHENTICATION API
// ============================================================
const { supabase } = require('../lib/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';

module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { action, email, password, name } = req.body;

    try {
        // ============================================================
        // SIGNUP
        // ============================================================
        if (action === 'signup') {
            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Check if user exists
            const { data: existing } = await supabase
                .from('users')
                .select('id')
                .eq('email', email)
                .single();

            if (existing) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const { data: user, error } = await supabase
                .from('users')
                .insert({
                    email,
                    name,
                    username: '@' + name.toLowerCase().replace(/\s/g, ''),
                    password_hash: hashedPassword,
                    plan: 'free',
                    role: 'user'
                })
                .select()
                .single();

            if (error) return res.status(500).json({ error: error.message });

            // Create usage record
            await supabase.from('usage').insert({
                user_id: user.id,
                auto_post_used: 0,
                chat_used: 0,
                kalshi_used: 0,
                code_used: 0,
                analytics_used: 0,
                homework_used: 0
            });

            // Generate token
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

        // ============================================================
        // LOGIN
        // ============================================================
        if (action === 'login') {
            if (!email || !password) {
                return res.status(400).json({ error: 'Missing email or password' });
            }

            // Find user
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error || !user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Check password
            const validPassword = await bcrypt.compare(password, user.password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate token
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
        return res.status(500).json({ error: 'Server error' });
    }
};
