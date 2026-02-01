import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import SecureContent from '@/components/security/SecureContent';
import { formatPostForAPI } from '@/components/utils/shareAPI';
import { toast } from 'sonner';

const categoryColors = {
  news: 'bg-blue-100 text-blue-800',
  press_release: 'bg-purple-100 text-purple-800',
  safety_tips: 'bg-green-100 text-green-800',
  events: 'bg-orange-100 text-orange-800',
  announcements: 'bg-red-100 text-red-800',
};

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const post = useQuery(api.blogPosts.get, postId ? { id: postId } : "skip");
  const isLoading = post === undefined;

  const relatedPosts = useQuery(api.blogPosts.list, post ? { category: post.category, published: true } : "skip") || [];

  const filteredRelated = relatedPosts.filter(p => p._id !== postId).slice(0, 3);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const handleShareAPI = () => {
    const apiData = formatPostForAPI(post);
    navigator.clipboard.writeText(JSON.stringify(apiData, null, 2));
    toast.success('API data copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-6 w-64 mb-8" />
        <Skeleton className="h-80 w-full rounded-2xl mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1E3A5F] mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link
          to={createPageUrl('Blog')}
          className="inline-flex items-center gap-2 text-[#C41E3A] font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${post.featured_image || 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070'}')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F] via-[#1E3A5F]/50 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to={createPageUrl('Blog')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize mb-4 ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
              {post.category?.replace('_', ' ')}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.created_date), 'MMMM d, yyyy')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SecureContent
              content={post.content}
              type="markdown"
              className="prose prose-lg max-w-none prose-headings:text-[#1E3A5F] prose-a:text-[#C41E3A]"
            />
          </motion.div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-[#1E3A5F]">Share this article:</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    title="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                    title="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')}
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    title="Copy link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">API Access</p>
                  <p className="text-xs text-gray-500">Copy structured data for third-party integrations</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareAPI}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Copy API Data
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to={createPageUrl('Blog')}
                className="inline-flex items-center gap-2 text-[#C41E3A] font-semibold hover:gap-4 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {filteredRelated.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRelated.map((relPost) => (
                <Link
                  key={relPost._id}
                  to={createPageUrl(`BlogPost?id=${relPost._id}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={relPost.featured_image || 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070'}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#1E3A5F] group-hover:text-[#C41E3A] transition-colors line-clamp-2">
                      {relPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {format(new Date(relPost.created_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}