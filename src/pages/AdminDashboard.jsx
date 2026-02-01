import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Search, FileText, TrendingUp, Tag, BarChart3, Shield, Lock, Share2, UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import CategoryManager from '@/components/admin/CategoryManager';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import { format } from 'date-fns';
import { isAdmin, isSuperAdmin } from '@/components/utils/security';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import AdminManagement from '@/components/admin/AdminManagement';

const categoryColors = {
  news: 'bg-blue-100 text-blue-800',
  press_release: 'bg-purple-100 text-purple-800',
  safety_tips: 'bg-green-100 text-green-800',
  events: 'bg-orange-100 text-orange-800',
  announcements: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'admins'
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletePost, setDeletePost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const { token } = useAuth();

  const currentUser = useQuery(api.users.viewer, { token: token ?? undefined });
  const hasAdminUser = useQuery(api.users.hasAdmin, {});
  const isAuthorized = isAdmin(currentUser);

  // Conditional queries: Only fetch if authorized to avoid server errors on load
  const postsData = useQuery(api.blogPosts.list, isAuthorized ? { token: token ?? undefined } : "skip");
  const categoriesData = useQuery(api.categories.list, {});
  const contactMessagesData = useQuery(api.contactMessages.list, isAuthorized ? { token: token ?? undefined, status: 'new' } : "skip");

  const posts = postsData || [];
  const categories = categoriesData || [];
  const contactMessages = contactMessagesData || [];

  const isLoading = currentUser === undefined || hasAdminUser === undefined ||
    (isAuthorized && (postsData === undefined || categoriesData === undefined));

  const createPost = useMutation(api.blogPosts.create);
  const updatePost = useMutation(api.blogPosts.update);
  const removePost = useMutation(api.blogPosts.remove);
  const registerFirstAdmin = useMutation(api.users.registerFirstAdmin);

  const handleSavePost = async (data) => {
    // Sanitize payload: remove system fields
    const { _id, _creationTime, created_date, updated_date, ...cleanData } = data;

    try {
      if (editingPost) {
        await updatePost({
          token: token ?? undefined,
          id: editingPost._id, // Pass ID explicitly from editingPost state, not data
          title: cleanData.title,
          slug: cleanData.slug,
          content: cleanData.content,
          excerpt: cleanData.excerpt,
          featured_image: cleanData.featured_image,
          category: cleanData.category,
          published: cleanData.published,
          is_featured: cleanData.is_featured,
          author: cleanData.author,
        });
      } else {
        await createPost({
          token: token ?? undefined,
          title: cleanData.title,
          slug: cleanData.slug,
          content: cleanData.content,
          excerpt: cleanData.excerpt,
          featured_image: cleanData.featured_image,
          category: cleanData.category,
          published: cleanData.published,
          is_featured: cleanData.is_featured,
          author: cleanData.author,
        });
      }
      setShowEditor(false);
      setEditingPost(null);
    } catch (err) {
      console.error("Failed to save post:", err);
      // alert(`Failed to save post: ${err.message}`);
    }
  };
  const handleDeleteConfirm = async () => {
    if (deletePost) {
      try {
        await removePost({ id: deletePost._id, token: token ?? undefined });
        setDeletePost(null);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDelete = (post) => {
    setDeletePost(post);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-blue-600' },
    { label: 'Published', value: posts.filter(p => p.published).length, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Drafts', value: posts.filter(p => !p.published).length, icon: Edit, color: 'text-orange-600' },
    { label: 'Categories', value: categories.length, icon: Tag, color: 'text-purple-600' },
  ];

  // Security: Show unauthorized message or Bootstrap option
  if (!isLoading && !isAuthorized) {
    if (hasAdminUser === false) {
      if (!currentUser) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">Admin Setup</h1>
              <p className="text-gray-600 mb-6">
                No administrators configured. You must log in to claim admin access.
              </p>
              <Button onClick={() => window.location.href = '/login'} className="bg-[#1E3A5F] hover:bg-[#162B47] w-full">
                Log In
              </Button>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">Setup Admin Access</h1>
            <p className="text-gray-600 mb-6">
              There are no administrators currently configured. As the first user, you can claim admin access to manage the system.
            </p>
            <Button
              onClick={async () => {
                try {
                  await registerFirstAdmin({ token: token ?? undefined });
                  // The reactive queries will update automatically
                } catch (e) {
                  console.error("Failed to register admin:", e);
                }
              }}
              className="bg-[#1E3A5F] hover:bg-[#162B47] w-full"
            >
              Claim Admin Access
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need super-administrator privileges to access this page.</p>
          <Button onClick={() => window.location.href = '/'} className="bg-[#C41E3A] hover:bg-[#A01830]">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A5F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1E3A5F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Manage blog posts and content</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">OWASP Secured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Admins (Invitations part hidden inside Management for non-super) */}
      {isAdmin(currentUser) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex border-b border-gray-200 mb-8 space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`pb-4 px-2 font-semibold text-sm transition-all relative ${activeTab === 'posts' ? 'text-[#C41E3A]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Blog Management
              {activeTab === 'posts' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A]" />}
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`pb-4 px-2 font-semibold text-sm transition-all relative ${activeTab === 'admins' ? 'text-[#C41E3A]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Admins & Invitations
              {activeTab === 'admins' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A]" />}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'posts' ? (
        <>
          {/* Stats */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#1E3A5F] mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-12 h-12 ${stat.color}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                onClick={() => setShowAnalytics(!showAnalytics)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
              </Button>
              <Button
                onClick={() => setShowCategoryManager(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                Manage Categories
              </Button>
              <Link to={createPageUrl('APIExport')}>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share API & Export
                </Button>
              </Link>
              {isSuperAdmin(currentUser) && (
                <Button
                  onClick={() => setActiveTab('admins')}
                  variant="outline"
                  className="flex items-center gap-2 border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A] hover:text-white"
                >
                  <UserPlus className="w-4 h-4" />
                  Manage Admins
                </Button>
              )}
            </div>

            {/* Analytics Dashboard */}
            {showAnalytics && (
              <div className="mb-8">
                <AnalyticsDashboard posts={posts} categories={categories} />
              </div>
            )}

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={() => {
                    setEditingPost(null);
                    setShowEditor(true);
                  }}
                  className="bg-[#C41E3A] hover:bg-[#A01830] w-full md:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Blog Post
                </Button>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500">Loading posts...</div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No blog posts found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Title</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts.map((post) => (
                        <tr key={post._id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-start gap-3">
                              {post.featured_image && (
                                <img
                                  src={post.featured_image}
                                  alt={post.title}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div>
                                <p className="font-semibold text-gray-900">{post.title}</p>
                                <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={categoryColors[post.category]}>
                              {post.category?.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <Badge variant={post.published ? 'default' : 'secondary'}>
                                {post.published ? 'Published' : 'Draft'}
                              </Badge>
                              {post.is_featured && (
                                <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-600">
                            {format(new Date(post.created_date), 'MMM d, yyyy')}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleEdit(post)}
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleDelete(post)}
                                title="Delete"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdminManagement />
        </div>
      )}

      {/* Editor Modal */}
      {
        showEditor && (
          <BlogPostEditor
            post={editingPost}
            onSave={handleSavePost}
            onCancel={() => {
              setShowEditor(false);
              setEditingPost(null);
            }}
          />
        )
      }

      {/* Category Manager Modal */}
      {
        showCategoryManager && (
          <CategoryManager onClose={() => setShowCategoryManager(false)} />
        )
      }

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletePost} onOpenChange={() => setDeletePost(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletePost?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div >
  );
}