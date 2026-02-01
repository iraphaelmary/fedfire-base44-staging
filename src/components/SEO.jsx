import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title = '', description = '', type = 'website', image = '', url = '' }) => {
    const siteTitle = 'FedFire';
    const siteDescription = 'FedFire Application';
    const siteUrl = window.location.origin;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name='description' content={description || siteDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Open Graph tags */}
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || siteDescription} />
            <meta property="og:type" content={type} />
            {image && <meta property="og:image" content={image} />}
            <meta property="og:url" content={url || window.location.href} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || siteDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Canonical Link */}
            <link rel="canonical" href={url || window.location.href} />
        </Helmet>
    );
};

export default SEO;
