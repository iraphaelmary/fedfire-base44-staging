import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Calendar, Tag } from 'lucide-react';

const COLORS = ['#C41E3A', '#1E3A5F', '#D4AF37', '#4CAF50', '#FF9800', '#9C27B0', '#2196F3', '#F44336'];

export default function AnalyticsDashboard({ posts, categories }) {
  // Posts by category
  const categoryData = categories.map(cat => ({
    name: cat.name,
    count: posts.filter(p => p.category === cat.slug).length,
    color: cat.color,
  }));

  // Posts by month (last 6 months)
  const monthlyData = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    monthlyData[key] = 0;
  }

  posts.forEach(post => {
    const date = new Date(post.created_date);
    const key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (monthlyData.hasOwnProperty(key)) {
      monthlyData[key]++;
    }
  });

  const monthlyChartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    posts: count,
  }));

  // Status distribution
  const statusData = [
    { name: 'Published', value: posts.filter(p => p.published).length },
    { name: 'Drafts', value: posts.filter(p => !p.published).length },
  ];

  // Featured vs Regular
  const featuredData = [
    { name: 'Featured', value: posts.filter(p => p.is_featured).length },
    { name: 'Regular', value: posts.filter(p => !p.is_featured).length },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Posts by Category - Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-[#C41E3A]" />
          <h3 className="text-lg font-bold text-[#1E3A5F]">Posts by Category</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#C41E3A" name="Posts" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly Posts Trend - Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#C41E3A]" />
          <h3 className="text-lg font-bold text-[#1E3A5F]">Posts Trend (Last 6 Months)</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#1E3A5F" name="Posts Created" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Status Distribution - Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-[#C41E3A]" />
          <h3 className="text-lg font-bold text-[#1E3A5F]">Publication Status</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Featured Distribution - Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#C41E3A]" />
          <h3 className="text-lg font-bold text-[#1E3A5F]">Featured Posts</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={featuredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {featuredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index + 2]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}