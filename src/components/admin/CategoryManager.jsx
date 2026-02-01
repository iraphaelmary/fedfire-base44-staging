import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, X, Shield } from 'lucide-react';
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
import { validateCategoryForm, sanitizeFormData, SECURITY_CONFIG } from '@/components/utils/security';

const colorOptions = [
  'bg-blue-100 text-blue-800',
  'bg-purple-100 text-purple-800',
  'bg-green-100 text-green-800',
  'bg-orange-100 text-orange-800',
  'bg-red-100 text-red-800',
  'bg-pink-100 text-pink-800',
  'bg-yellow-100 text-yellow-800',
  'bg-teal-100 text-teal-800',
];

export default function CategoryManager({ onClose }) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: 'bg-blue-100 text-blue-800',
  });
  const [errors, setErrors] = useState({});

  const categories = useQuery(api.categories.list, {}) || [];

  const createCategory = useMutation(api.categories.create);
  const updateCategory = useMutation(api.categories.update);
  const removeCategory = useMutation(api.categories.remove);


  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '', color: 'bg-blue-100 text-blue-800' });
    setShowForm(false);
    setEditingCategory(null);
    setErrors({});
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData(category);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedData = sanitizeFormData(formData);
    if (!sanitizedData.slug) {
      sanitizedData.slug = sanitizedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory._id, ...sanitizedData });
      } else {
        await createCategory(sanitizedData);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">Manage Categories</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span>OWASP secured</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#C41E3A] hover:bg-[#A01830] mb-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-[#1E3A5F] mb-4">
                {editingCategory ? 'Edit Category' : 'New Category'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Category name"
                    maxLength={SECURITY_CONFIG.MAX_NAME_LENGTH}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-name"
                    maxLength={SECURITY_CONFIG.MAX_NAME_LENGTH}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Category description"
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div className="space-y-2 mb-4">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${color} ${formData.color === color ? 'ring-2 ring-offset-2 ring-[#C41E3A]' : ''
                        }`}
                    >
                      Sample
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-[#C41E3A] hover:bg-[#A01830]">
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Badge className={category.color}>{category.name}</Badge>
                  <span className="text-sm text-gray-600">{category.slug}</span>
                  {category.description && (
                    <span className="text-sm text-gray-500">- {category.description}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setDeleteCategory(category)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No categories yet. Create your first category above.
              </div>
            )}
          </div>
        </div>

        <AlertDialog open={!!deleteCategory} onOpenChange={() => setDeleteCategory(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Category</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteCategory?.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    await removeCategory({ id: deleteCategory._id });
                    setDeleteCategory(null);
                  } catch (error) {
                    console.error("Failed to delete category:", error);
                  }
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}