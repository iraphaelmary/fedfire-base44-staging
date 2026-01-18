/**
 * Blog Post Share API Utilities
 * Provides structured data formats for third-party integrations
 */

/**
 * Convert blog post to API-friendly format
 */
export const formatPostForAPI = (post) => {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author || 'Federal Fire Service',
    published: post.published,
    featured: post.is_featured,
    image: post.featured_image,
    publishedDate: post.created_date,
    updatedDate: post.updated_date,
    url: `${window.location.origin}/#/BlogPost?id=${post.id}`,
    shareUrl: {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/#/BlogPost?id=' + post.id)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/#/BlogPost?id=' + post.id)}&text=${encodeURIComponent(post.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/#/BlogPost?id=' + post.id)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.origin + '/#/BlogPost?id=' + post.id)}`
    }
  };
};

/**
 * Generate RSS feed structure
 */
export const generateRSSFeed = (posts) => {
  const items = posts.map(post => ({
    title: post.title,
    link: `${window.location.origin}/#/BlogPost?id=${post.id}`,
    description: post.excerpt,
    pubDate: new Date(post.created_date).toUTCString(),
    category: post.category,
    author: post.author || 'Federal Fire Service'
  }));

  return {
    title: 'Federal Fire Service - News & Updates',
    link: window.location.origin,
    description: 'Latest news, safety tips, and updates from the Federal Fire Service of Nigeria',
    lastBuildDate: new Date().toUTCString(),
    items
  };
};

/**
 * Generate JSON Feed (modern alternative to RSS)
 */
export const generateJSONFeed = (posts) => {
  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Federal Fire Service - News & Updates',
    home_page_url: window.location.origin,
    feed_url: `${window.location.origin}/#/api/feed.json`,
    description: 'Latest news, safety tips, and updates from the Federal Fire Service of Nigeria',
    icon: `${window.location.origin}/favicon.ico`,
    authors: [
      {
        name: 'Federal Fire Service of Nigeria',
        url: window.location.origin
      }
    ],
    items: posts.map(post => ({
      id: post.id,
      url: `${window.location.origin}/#/BlogPost?id=${post.id}`,
      title: post.title,
      content_html: post.content,
      summary: post.excerpt,
      image: post.featured_image,
      date_published: post.created_date,
      date_modified: post.updated_date,
      author: {
        name: post.author || 'Federal Fire Service'
      },
      tags: [post.category]
    }))
  };
};

/**
 * Generate embeddable widget code
 */
export const generateEmbedCode = (post) => {
  const embedUrl = `${window.location.origin}/#/embed/post/${post.id}`;
  return {
    iframe: `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0"></iframe>`,
    script: `<div id="ffs-post-${post.id}"></div><script src="${window.location.origin}/embed.js" data-post="${post.id}"></script>`,
    url: embedUrl
  };
};

/**
 * Export posts as CSV
 */
export const exportToCSV = (posts) => {
  const headers = ['ID', 'Title', 'Category', 'Author', 'Published Date', 'Status', 'URL'];
  const rows = posts.map(post => [
    post.id,
    `"${post.title.replace(/"/g, '""')}"`,
    post.category,
    post.author || 'Federal Fire Service',
    new Date(post.created_date).toLocaleDateString(),
    post.published ? 'Published' : 'Draft',
    `${window.location.origin}/#/BlogPost?id=${post.id}`
  ]);

  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  return csv;
};

/**
 * Download file helper
 */
export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate Open Graph meta tags
 */
export const generateOGTags = (post) => {
  return {
    'og:title': post.title,
    'og:description': post.excerpt,
    'og:image': post.featured_image,
    'og:url': `${window.location.origin}/#/BlogPost?id=${post.id}`,
    'og:type': 'article',
    'article:published_time': post.created_date,
    'article:author': post.author,
    'article:section': post.category,
    'twitter:card': 'summary_large_image',
    'twitter:title': post.title,
    'twitter:description': post.excerpt,
    'twitter:image': post.featured_image
  };
};