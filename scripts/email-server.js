#!/usr/bin/env node

/**
 * Simple Email Proxy Server
 * Handles email sending via Resend API, bypassing Convex backend SSL issues.
 * Runs on port 3212.
 */

import http from 'http';
import dns from 'dns';

// Force IPv4 to avoid fetch timeouts with Resend API (IPv6 stalling)
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

const PORT = 3212;
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_GVxNMych_25S2rFfBqjr4dhT9D9fLvEjn';

async function sendEmail(to, subject, html) {
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Federal Fire Service <noreply@ebije.app>',
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${response.status} - ${error}`);
    }

    return await response.json();
}

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/send-email') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const { to, subject, html } = JSON.parse(body);
                console.log(`📧 Sending email to: ${to}`);

                const result = await sendEmail(to, subject, html);

                console.log(`✅ Email sent successfully to ${to}! ID: ${result.id}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, id: result.id }));
            } catch (err) {
                console.error(`❌ Failed to send email:`, err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`📬 Email proxy server running on http://localhost:${PORT}`);
});
