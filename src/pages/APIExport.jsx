import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Download, Code, Share2, Copy, CheckCircle, FileJson, FileText, Rss } from 'lucide-react';
import {
  formatPostForAPI,
  generateJSONFeed,
  generateRSSFeed,
  exportToCSV,
  downloadFile
} from '@/components/utils/shareAPI';

export default function APIExport() {
  const [copied, setCopied] = useState(null);

  const posts = useQuery(api.blogPosts.list, { published: true }) || [];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportJSON = () => {
    const data = posts.map(formatPostForAPI);
    downloadFile(JSON.stringify(data, null, 2), 'ffs-posts.json', 'application/json');
  };

  const handleExportJSONFeed = () => {
    const feed = generateJSONFeed(posts);
    downloadFile(JSON.stringify(feed, null, 2), 'ffs-feed.json', 'application/json');
  };

  const handleExportRSS = () => {
    const feed = generateRSSFeed(posts);
    const rssXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${feed.title}</title>
    <link>${feed.link}</link>
    <description>${feed.description}</description>
    <lastBuildDate>${feed.lastBuildDate}</lastBuildDate>
    ${feed.items.map(item => `
    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
      <author>${item.author}</author>
    </item>`).join('')}
  </channel>
</rss>`;
    downloadFile(rssXML, 'ffs-feed.xml', 'application/rss+xml');
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(posts);
    downloadFile(csv, 'ffs-posts.csv', 'text/csv');
  };

  const apiEndpoint = `${window.location.origin}/#/api/posts`;
  const feedEndpoint = `${window.location.origin}/#/api/feed.json`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#1E3A5F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4">Share API & Export</h1>
            <p className="text-xl text-gray-300">
              Access our blog posts programmatically for third-party integrations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Endpoints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-[#C41E3A]" />
              <h2 className="text-2xl font-bold text-[#1E3A5F]">API Endpoints</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">All Posts (JSON)</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-4 py-2 rounded-lg text-sm overflow-x-auto">
                    {apiEndpoint}
                  </code>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopy(apiEndpoint, 'api')}
                  >
                    {copied === 'api' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">JSON Feed</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-4 py-2 rounded-lg text-sm overflow-x-auto">
                    {feedEndpoint}
                  </code>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopy(feedEndpoint, 'feed')}
                  >
                    {copied === 'feed' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Example Response:</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                  {`{
  "id": "123",
  "title": "Fire Safety Tips",
  "excerpt": "Learn essential...",
  "category": "safety_tips",
  "publishedDate": "2026-01-18",
  "url": "https://...",
  "shareUrl": {
    "facebook": "https://...",
    "twitter": "https://..."
  }
}`}
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Export Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Download className="w-6 h-6 text-[#C41E3A]" />
              <h2 className="text-2xl font-bold text-[#1E3A5F]">Export Data</h2>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleExportJSON}
                className="w-full justify-start gap-3 bg-[#C41E3A] hover:bg-[#A01830]"
              >
                <FileJson className="w-5 h-5" />
                Export as JSON ({posts.length} posts)
              </Button>

              <Button
                onClick={handleExportJSONFeed}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <FileJson className="w-5 h-5" />
                Export JSON Feed (RSS Alternative)
              </Button>

              <Button
                onClick={handleExportRSS}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <Rss className="w-5 h-5" />
                Export RSS Feed (XML)
              </Button>

              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <FileText className="w-5 h-5" />
                Export as CSV
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-[#1E3A5F] mb-2">Integration Guide</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use JSON for modern applications</li>
                <li>• Use RSS/XML for feed readers</li>
                <li>• Use CSV for spreadsheets</li>
                <li>• All exports include published posts only</li>
              </ul>
            </div>
          </motion.div>

          {/* Usage Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <Share2 className="w-6 h-6 text-[#C41E3A]" />
              <h2 className="text-2xl font-bold text-[#1E3A5F]">Usage Examples</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">JavaScript Fetch</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                  {`fetch('${apiEndpoint}')
  .then(res => res.json())
  .then(posts => {
    console.log(posts);
  });`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Python Requests</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                  {`import requests

response = requests.get(
  '${apiEndpoint}'
)
posts = response.json()`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">cURL</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                  {`curl -X GET \\
  '${apiEndpoint}' \\
  -H 'Accept: application/json'`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">RSS Feed Reader</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                  {`Add this URL to your
RSS reader:

${window.location.origin}
/#/api/feed.xml`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }) {
  return <label className={className}>{children}</label>;
}