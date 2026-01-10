import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { format } from 'date-fns';

export default function NewsSection({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 4);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A5F] mt-3">
              News & Announcements
            </h2>
          </div>
          <Link
            to={createPageUrl('Blog')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#C41E3A] font-semibold hover:gap-4 transition-all"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={createPageUrl(`BlogPost?id=${featuredPost.id}`)}>
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={featuredPost.featured_image || 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070'}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#C41E3A] text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {featuredPost.category?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(featuredPost.created_date), 'MMM d, yyyy')}
                  </span>
                  {featuredPost.author && (
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A5F] group-hover:text-[#C41E3A] transition-colors mb-3">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{featuredPost.excerpt}</p>
              </Link>
            </motion.div>
          )}

          {/* Other Posts */}
          <div className="space-y-6">
            {otherPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={createPageUrl(`BlogPost?id=${post.id}`)}
                  className="group flex gap-6 bg-white rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={post.featured_image || 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#C41E3A] text-xs font-semibold uppercase tracking-wider capitalize">
                      {post.category?.replace('_', ' ')}
                    </span>
                    <h4 className="text-lg font-bold text-[#1E3A5F] group-hover:text-[#C41E3A] transition-colors line-clamp-2 mt-1">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(post.created_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}