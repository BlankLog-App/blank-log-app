// ============================================================
// PAYMENTS API — Lemon Squeezy Integration
// ============================================================
const { supabase } = require('../lib/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const LEMON_API_KEY = process.env.LEMON_SQUEEZY_API_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIxOGQ1YmM0YzMyNGM1NWUzMGM2NGU2OGMxMDQ2YjVlMzI5YjNhY2I4OTJiNzcyMGUzMmI0M2JiYTA4NzI1MzA4MjZhMzIxMDU5YjZjMmQ1ZCIsImlhdCI6MTc4NjU5NDUzNS4wNzcwNjksIm5iZiI6MTc4NjU5NDUzNS4wNzcwNzIsImV4cCI6MTgwMjQ3NjgwMC4wNDEyNjEsInN1YiI6Ijc3NjEyMTAiLCJzY29wZXMiOltdfQ.zyfr7N6T4wnwEFGjtdsGRSTNCezSOKtsUiorvoGWMTQty6pOQmwcf7Q6MUTv1agQZk6drRRd0chPmqIqPLFwL8Lpog9Aza5SJAc9KOsWgNRnKzxziDs8Wui9YcUbNviL1EV4gvlqKOwioIS4k-tyruRUUOGzcShPv-ycY-zWupTAmOXZt5R1g9sGZkGa570XekTIpyhTryZQEhdTYYFYuOsmiCo0NacjN5hwwiNh2FId3Y8aD8Cj0E6oLBc2qwdavdhYQZ88XhIXNBci2NYgsMANQqdi-rbfkd5RJjstqQv6dAw2C0egVZwdyvlVGx01PFdDFUh30u6sTru6IGuASQRnAgHgo1VVrgBZo_ysnc4kzRYGGPOGuJVTPtjJp5UyldWzIZ7hPi5SEuKeObuqBq_N_ZjkktyICnotfinnU11xU0D0kY8bSxSy934Z-lzHdUAmB3yrFHSaK_Z1Kf6lk7T3pG3Ty3aSi1w7kpC0B2gt1jXjYhcvVyZBUKztUFyRgAcGQOxG_rJL21xhREcHTehfIGLhEyYapWSX56qc24n3Rf0isC3jYqlNKHsK_m8A4LWKhtTDBWKN9rH4vBgHj_YDeAqzCqJSxHsqdUpF8WzGFKdmGlCdVqcH449Jg9QWjuLi494IB7-k9Wl0-BJubQn9k-r99lofzXZrh8wkFQ4';

const PLAN_LINKS = {
    premium: 'https://blanklog.lemonsqueezy.com/checkout/buy/443dcad3-0a-d5-469b-b938-460f4df4f3ca',
    pro: 'https://blanklog.lemonsqueezy.com/checkout/buy/6dcd9ac-643f-4a55-bdcd-b107f08f84ef'
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // GET checkout link
        if (req.method === 'GET') {
            const { plan } = req.query || {};
            if (!plan || !PLAN_LINKS[plan]) {
                return res.status(400).json({ error: 'Invalid plan' });
            }
            return res.status(200).json({
                success: true,
                checkoutUrl: PLAN_LINKS[plan],
                email: user.email
            });
        }

        // POST upgrade (manual or webhook)
        if (req.method === 'POST') {
            const { action, plan, newPlan } = req.body;

            // Manual upgrade (admin only, or after payment verification)
            if (action === 'upgrade') {
                const { data: userData } = await supabase
                    .from('users')
                    .select('role, plan')
                    .eq('id', user.userId)
                    .single();

                const isAdmin = userData?.role === 'admin' || userData?.role === 'developer';

                // Only admins can self-upgrade without payment
                if (!isAdmin) {
                    return res.status(403).json({ error: 'Payment required to upgrade' });
                }

                if (!newPlan || !['free', 'premium', 'pro'].includes(newPlan)) {
                    return res.status(400).json({ error: 'Invalid plan' });
                }

                await supabase
                    .from('users')
                    .update({ plan: newPlan })
                    .eq('id', user.userId);

                return res.status(200).json({ success: true, plan: newPlan });
            }

            // Webhook: Lemon Squeezy payment completed
            if (action === 'webhook') {
                const { event, userEmail, plan: webhookPlan } = req.body;

                if (event !== 'order_created' && event !== 'subscription_created') {
                    return res.status(200).json({ received: true });
                }

                const { data: targetUser } = await supabase
                    .from('users')
                    .select('id')
                    .eq('email', userEmail)
                    .single();

                if (targetUser && webhookPlan) {
                    await supabase
                        .from('users')
                        .update({ plan: webhookPlan })
                        .eq('id', targetUser.id);
                }

                return res.status(200).json({ success: true });
            }
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Payments error:', error);
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
