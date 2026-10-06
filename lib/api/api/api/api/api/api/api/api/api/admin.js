// ============================================================
// ADMIN API — System controls
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';

function getUserFromToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    try {
        return jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    } catch (e) { return null; }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    // Check admin role
    const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.userId)
        .single();

    if (userData?.role !== 'admin' && userData?.role !== 'developer') {
        return res.status(403).json({ error: 'Admin access required' });
    }

    try {
        // GET system stats
        if (req.method === 'GET') {
            const { count: userCount } = await supabase
                .from('users').select('*', { count: 'exact', head: true });
            const { count: postCount } = await supabase
                .from('scheduled_posts').select('*', { count: 'exact', head: true });
            const { count: chatCount } = await supabase
                .from('chat_messages').select('*', { count: 'exact', head: true });
            const { count: predCount } = await supabase
                .from('predictions').select('*', { count: 'exact', head: true });
            const { count: hwCount } = await supabase
                .from('homework_history').select('*', { count: 'exact', head: true });

            return res.status(200).json({
                success: true,
                stats: {
                    users: userCount || 0,
                    posts: postCount || 0,
                    chats: chatCount || 0,
                    predictions: predCount || 0,
                    homework: hwCount || 0
                }
            });
        }

        // POST admin actions
        if (req.method === 'POST') {
            const { action, userId, newPlan, newRole } = req.body;

            // Update user plan
            if (action === 'update_plan' && userId && newPlan) {
                await supabase
                    .from('users')
                    .update({ plan: newPlan })
                    .eq('id', userId);
                return res.status(200).json({ success: true });
            }

            // Update user role
            if (action === 'update_role' && userId && newRole) {
                await supabase
                    .from('users')
                    .update({ role: newRole })
                    .eq('id', userId);
                return res.status(200).json({ success: true });
            }

            // Get all users
            if (action === 'list_users') {
                const { data } = await supabase
                    .from('users')
                    .select('id, email, name, username, plan, role, created_at')
                    .order('created_at', { ascending: false });
                return res.status(200).json({ success: true, users: data });
            }

            // Clear all data (dangerous)
            if (action === 'clear_data') {
                await supabase.from('chat_messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
                await supabase.from('homework_history').delete().neq('id', '00000000-0000-0000-0000-000000000000');
                await supabase.from('code_history').delete().neq('id', '00000000-0000-0000-0000-000000000000');
                await supabase.from('predictions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
                await supabase.from('scheduled_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
                return res.status(200).json({ success: true });
            }
        }

        // DELETE user
        if (req.method === 'DELETE') {
            const { userId } = req.query;
            if (!userId) return res.status(400).json({ error: 'userId required' });
            if (userId === user.userId) return res.status(400).json({ error: 'Cannot delete yourself' });

            await supabase.from('users').delete().eq('id', userId);
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Admin error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
