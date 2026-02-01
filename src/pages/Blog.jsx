// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, User, Tag, Search, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import servicesBg from "../../src/assets/services-bg.jpg";

const categories = [
  { value: "all", label: "All Posts" },
  { value: "news", label: "News" },
  { value: "press_release", label: "Press Releases" },
  { value: "safety_tips", label: "Safety Tips" },
  { value: "events", label: "Events" },
  { value: "announcements", label: "Announcements" },
];

const categoryColors = {
  news: "bg-blue-100 text-blue-800",
  press_release: "bg-purple-100 text-purple-800",
  safety_tips: "bg-green-100 text-green-800",
  events: "bg-orange-100 text-orange-800",
  announcements: "bg-red-100 text-red-800",
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () =>
      base44.entities.BlogPost.filter({ published: true }, "-created_date"),
    initialData: [],
  });

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  const featuredPost =
    filteredPosts.find((p) => p.is_featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${servicesBg})`,
          }}
        >
          <div className="absolute inset-0 bg-[#1E3A5F]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              News & Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Stay updated with the latest news, events, and safety tips from
              the Federal Fire Service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-[#C41E3A] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl overflow-hidden"
                  >
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No posts found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <Link
                    to={createPageUrl(`BlogPost?id=${featuredPost.id}`)}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="h-64 lg:h-auto">
                        <img
                          src={
                            featuredPost.featured_image ||
                            "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070"
                          }
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${categoryColors[featuredPost.category] || "bg-gray-100 text-gray-800"}`}
                          >
                            {featuredPost.category?.replace("_", " ")}
                          </span>
                          <span className="bg-[#D4AF37] text-[#1E3A5F] px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F] group-hover:text-[#C41E3A] transition-colors mb-4">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(
                              new Date(featuredPost.created_date),
                              "MMM d, yyyy",
                            )}
                          </span>
                          {featuredPost.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {featuredPost.author}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Other Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={createPageUrl(`BlogPost?id=${post.id}`)}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={
                            post.featured_image ||
                            "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize mb-3 ${categoryColors[post.category] || "bg-gray-100 text-gray-800"}`}
                        >
                          {post.category?.replace("_", " ")}
                        </span>
                        <h3 className="text-lg font-bold text-[#1E3A5F] group-hover:text-[#C41E3A] transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.created_date), "MMM d, yyyy")}
                          </span>
                          <span className="text-[#C41E3A] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
