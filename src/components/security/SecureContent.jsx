import React from 'react';
import ReactMarkdown from 'react-markdown';
import { sanitizeHTMLContent } from '@/components/utils/security';

/**
 * SecureContent Component
 * Renders user-generated content with XSS protection
 * Implements OWASP A03: Injection prevention
 */
export default function SecureContent({ content, type = 'markdown', className = '' }) {
  if (!content) return null;

  // For markdown content (blog posts, etc.)
  if (type === 'markdown') {
    return (
      <div className={className}>
        <ReactMarkdown
          components={{
            // Sanitize links
            a: ({ href, children, ...props }) => {
              // Ensure links open in new tab and are safe
              const isExternal = href && !href.startsWith('/') && !href.startsWith('#');
              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  {...props}
                >
                  {children}
                </a>
              );
            },
            // Prevent image injection
            img: ({ src, alt, ...props }) => {
              // Only allow https images
              if (!src || (!src.startsWith('https://') && !src.startsWith('/'))) {
                return null;
              }
              return <img src={src} alt={alt || ''} loading="lazy" {...props} />;
            },
            // Remove iframe support
            iframe: () => null,
            // Remove script support
            script: () => null,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  // For plain text content
  if (type === 'text') {
    return <div className={className}>{content}</div>;
  }

  // For HTML content (sanitized)
  if (type === 'html') {
    const sanitized = sanitizeHTMLContent(content);
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    );
  }

  return <div className={className}>{content}</div>;
}