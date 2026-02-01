import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pagesConfig } from '@/pages.config';

export default function NavigationTracker() {
    const location = useLocation();
    const { Pages, mainPage } = pagesConfig;
    const mainPageKey = mainPage ?? Object.keys(Pages)[0];

    useEffect(() => {
        // Tracker logic could be added here later for Convex
    }, [location, Pages, mainPageKey]);

    return null;
}