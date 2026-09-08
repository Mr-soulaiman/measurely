import { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { GuidesPage } from './pages/GuidesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PaintCalculatorPage } from './pages/PaintCalculatorPage';

interface PageMetadata {
  title: string;
  description: string;
}

const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Measurely — Simple Material Calculators',
    description: 'Simple tools to help you estimate materials for home and DIY projects.',
  },
  '/tools': {
    title: 'Measurely Tools — Material Calculators',
    description: 'Browse simple, practical material calculators for your home and DIY projects.',
  },
  '/tools/paint-calculator': {
    title: 'Paint Calculator — How Much Paint Do I Need? | Measurely',
    description: 'Calculate how much paint you need based on room dimensions or wall area, including doors, windows, multiple coats, and ceiling.',
  },
  '/paint-calculator': {
    title: 'Paint Calculator — How Much Paint Do I Need? | Measurely',
    description: 'Calculate how much paint you need based on room dimensions or wall area, including doors, windows, multiple coats, and ceiling.',
  },
  '/guides': {
    title: 'Measurely Guides — Home & DIY Tips',
    description: 'Simple guides to help you plan your projects.',
  },
  '/about': {
    title: 'About Measurely',
    description: 'Measurely creates simple calculators that help you estimate the materials needed for everyday home and DIY projects.',
  },
  '/contact': {
    title: 'Contact Measurely',
    description: 'Have a question, found a problem, or have an idea for a calculator? Contact Measurely.',
  },
};

function AppContent() {
  const { currentPath } = useNavigation();

  // Normalize /paint-calculator to /tools/paint-calculator if accessed directly
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/paint-calculator') {
      window.history.replaceState({}, '', '/tools/paint-calculator');
    }
  }, []);

  // Synchronize document.title and meta tags with current route
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const meta = ROUTE_METADATA[currentPath] || ROUTE_METADATA['/'];
    document.title = meta.title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', meta.description);
    }

    // Update Twitter Card tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', meta.title);
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', meta.description);
    }
  }, [currentPath]);

  // Route matching
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/tools/paint-calculator':
      case '/paint-calculator':
        return <PaintCalculatorPage />;
      case '/tools':
        return <ToolsPage />;
      case '/guides':
        return <GuidesPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#1A1918] font-sans flex flex-col justify-between antialiased selection:bg-[#163A5F]/20 selection:text-[#163A5F]">
      <Navigation />
      {renderCurrentPage()}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
