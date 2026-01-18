import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { formatPostForAPI } from '@/components/utils/shareAPI';

export default function APIPosts() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['api-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }, '-created_date'),
  });

  useEffect(() => {
    if (!isLoading) {
      const formattedPosts = posts.map(formatPostForAPI);
      
      // Display as formatted JSON
      document.body.innerHTML = `<pre style="font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; overflow: auto;">${JSON.stringify(formattedPosts, null, 2)}</pre>`;
    }
  }, [posts, isLoading]);

  if (isLoading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        Loading posts...
      </div>
    );
  }

  return null;
}