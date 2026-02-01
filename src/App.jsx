import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
// import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"; // Removed with auth library
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ConvexClientProvider } from '@/api/convexClient';
import { HelmetProvider } from 'react-helmet-async';
import { pagesConfig } from './pages.config';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from './lib/query-client';
import NavigationTracker from './lib/NavigationTracker';
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from './context/AuthContext';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Main Page (Home) - Public */}
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />

      {/* Logic to map other pages, excluding 'admin' which we handle specifically */}
      {Object.entries(Pages).map(([path, Page]) => {
        if (path === 'admin') return null;
        return (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        );
      })}

      {/* Admin Route - Protected */}
      <Route path="/admin" element={
        isAuthenticated ? (
          <LayoutWrapper currentPageName="admin">
            <Pages.admin />
          </LayoutWrapper>
        ) : (
          <Navigate to="/login" />
        )
      } />

      {/* Legacy Admin Redirect */}
      <Route path="/AdminDashboard" element={<Navigate to="/admin" replace />} />

      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Unified Auth Route */}
      <Route path="/signup" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <ConvexClientProvider>
      <QueryClientProvider client={queryClientInstance}>
        <HelmetProvider>
          <Router>
            <NavigationTracker />
            <AppRoutes />
          </Router>
          <Toaster />
        </HelmetProvider>
      </QueryClientProvider>
    </ConvexClientProvider>
  )
}

export default App
