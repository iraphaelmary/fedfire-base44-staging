/**
 * Security Utilities for OWASP Top 10 Protection
 * Provides input validation, sanitization, and security controls
 */

// ==================== INPUT VALIDATION ====================

/**
 * Validates email format (A03: Injection Prevention)
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321
};

/**
 * Validates phone number (allows various formats)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitizes string input to prevent XSS (A03: Injection)
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove inline event handlers
    .slice(0, 10000); // Limit length to prevent DoS
};

/**
 * Sanitizes text with length limits (A04: Insecure Design)
 */
export const sanitizeText = (text, maxLength = 5000) => {
  if (typeof text !== 'string') return '';
  return sanitizeInput(text).slice(0, maxLength);
};

/**
 * Validates string length
 */
export const isValidLength = (text, min = 1, max = 10000) => {
  if (typeof text !== 'string') return false;
  const length = text.trim().length;
  return length >= min && length <= max;
};

/**
 * Checks for SQL injection patterns (defense in depth)
 */
export const hasSQLInjection = (input) => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(union|join|from|where|having)/gi,
    /[;'"\\]/g
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

/**
 * Checks for script injection attempts (A03: Injection)
 */
export const hasScriptInjection = (input) => {
  const scriptPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // Event handlers
    /<iframe/gi,
    /<object/gi,
    /<embed/gi
  ];
  
  return scriptPatterns.some(pattern => pattern.test(input));
};

// ==================== RATE LIMITING ====================

const rateLimitStore = new Map();

/**
 * Simple client-side rate limiting (A04: Insecure Design)
 * Prevents rapid form submissions and potential abuse
 */
export const checkRateLimit = (identifier, maxAttempts = 3, windowMs = 60000) => {
  const now = Date.now();
  const key = `rate_limit_${identifier}`;
  
  const attempts = rateLimitStore.get(key) || [];
  const recentAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    const oldestAttempt = Math.min(...recentAttempts);
    const waitTime = Math.ceil((windowMs - (now - oldestAttempt)) / 1000);
    return {
      allowed: false,
      waitTime,
      message: `Too many attempts. Please wait ${waitTime} seconds.`
    };
  }
  
  recentAttempts.push(now);
  rateLimitStore.set(key, recentAttempts);
  
  return { allowed: true };
};

/**
 * Clear rate limit for an identifier
 */
export const clearRateLimit = (identifier) => {
  rateLimitStore.delete(`rate_limit_${identifier}`);
};

// ==================== HONEYPOT DETECTION ====================

/**
 * Validates honeypot field is empty (bot detection)
 * (A07: Identification and Authentication Failures)
 */
export const isHoneypotEmpty = (value) => {
  return !value || value.trim() === '';
};

// ==================== CONTENT SECURITY ====================

/**
 * Sanitizes HTML content for safe display (A03: Injection)
 * Allows only safe markdown formatting
 */
export const sanitizeHTMLContent = (html) => {
  if (typeof html !== 'string') return '';
  
  // Remove dangerous tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*>/gi, '');
};

// ==================== URL VALIDATION ====================

/**
 * Validates URL is safe (A10: SSRF Prevention)
 */
export const isValidURL = (url) => {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Validates redirect URL is internal (A01: Broken Access Control)
 */
export const isInternalURL = (url) => {
  if (!url) return true;
  
  // Check if URL is relative
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }
  
  // Check if URL is same origin
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin === window.location.origin;
  } catch {
    return false;
  }
};

// ==================== FORM VALIDATION ====================

/**
 * Comprehensive form validation (A04: Insecure Design)
 */
export const validateContactForm = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.name || !isValidLength(formData.name, 2, 100)) {
    errors.name = 'Name must be between 2 and 100 characters';
  }
  if (hasScriptInjection(formData.name)) {
    errors.name = 'Invalid characters in name';
  }
  
  // Email validation
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation (optional)
  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Subject validation
  if (!formData.subject || !isValidLength(formData.subject, 3, 200)) {
    errors.subject = 'Subject must be between 3 and 200 characters';
  }
  if (hasScriptInjection(formData.subject)) {
    errors.subject = 'Invalid characters in subject';
  }
  
  // Message validation
  if (!formData.message || !isValidLength(formData.message, 10, 5000)) {
    errors.message = 'Message must be between 10 and 5000 characters';
  }
  if (hasScriptInjection(formData.message)) {
    errors.message = 'Invalid characters in message';
  }
  
  // Check for SQL injection attempts
  const fieldsToCheck = [formData.name, formData.subject, formData.message];
  if (fieldsToCheck.some(field => hasSQLInjection(field))) {
    errors._security = 'Invalid input detected';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ==================== SESSION SECURITY ====================

/**
 * Generate random token for CSRF-like protection (A01: Broken Access Control)
 */
export const generateSecurityToken = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Validate session token
 */
export const validateSecurityToken = (token, storedToken) => {
  return token === storedToken && token.length === 64;
};

// ==================== DATA SANITIZATION ====================

/**
 * Sanitize all form data before submission (A03: Injection)
 */
export const sanitizeFormData = (data) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

// ==================== SECURITY CONSTANTS ====================

export const SECURITY_CONFIG = {
  // Rate limiting
  MAX_FORM_SUBMISSIONS: 3,
  RATE_LIMIT_WINDOW_MS: 60000, // 1 minute
  
  // Input lengths
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_PHONE_LENGTH: 20,
  MAX_SUBJECT_LENGTH: 200,
  MAX_MESSAGE_LENGTH: 5000,
  
  // Minimum lengths
  MIN_NAME_LENGTH: 2,
  MIN_SUBJECT_LENGTH: 3,
  MIN_MESSAGE_LENGTH: 10,
  
  // Session
  SESSION_TIMEOUT_MS: 3600000, // 1 hour
};

// ==================== ERROR MESSAGES ====================

export const SECURITY_ERRORS = {
  RATE_LIMIT: 'Too many requests. Please try again later.',
  INVALID_INPUT: 'Invalid input detected. Please check your entries.',
  INJECTION_DETECTED: 'Security violation detected.',
  SESSION_EXPIRED: 'Your session has expired. Please refresh the page.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
};