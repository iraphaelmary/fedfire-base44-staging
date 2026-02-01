import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X, Shield } from 'lucide-react';
import { sanitizeInput, SECURITY_CONFIG } from '@/components/utils/security';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

export default function BlogPostEditor({ post, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    featured_image: '',
    is_featured: false,
    author: '',
    published: true,
  });

  const categories = useQuery(api.categories.list) || [];

  useEffect(() => {
    if (post) {
      setFormData(post);
    } else if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0].slug }));
    }
  }, [post, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Security: Sanitize inputs
    const dataToSave = {
      ...formData,
      title: sanitizeInput(formData.title),
      excerpt: sanitizeInput(formData.excerpt),
      author: sanitizeInput(formData.author),
    };

    if (!dataToSave.slug) {
      dataToSave.slug = dataToSave.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    onSave(dataToSave);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 overflow-y-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl w-full max-w-4xl my-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">
              {post ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Input sanitization enabled</span>
            </div>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Blog post title"
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Input
              id="excerpt"
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short summary of the post"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <div className="bg-white border rounded-lg">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={modules}
                placeholder="Write your blog post content here..."
                className="h-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-16">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat._id} value={cat.slug}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image URL</Label>
            <Input
              id="featured_image"
              value={formData.featured_image}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <Label htmlFor="is_featured" className="cursor-pointer">Featured on Homepage</Label>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published" className="cursor-pointer">Published</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#C41E3A] hover:bg-[#A01830]">
              {post ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}