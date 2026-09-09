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
import { GravelCalculatorPage } from './pages/GravelCalculatorPage';
import { SandCalculatorPage } from './pages/SandCalculatorPage';
import { FlooringCalculatorPage } from './pages/FlooringCalculatorPage';

interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
}

const PRODUCTION_DOMAIN = 'https://measurely-tools.vercel.app';

const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Measurely — Simple Material Calculators',
    description: 'Simple tools to help you estimate materials for home and DIY projects.',
    canonical: `${PRODUCTION_DOMAIN}/`,
  },
  '/tools': {
    title: 'Measurely Tools — Material Calculators',
    description: 'Browse simple, practical material calculators for your home and DIY projects.',
    canonical: `${PRODUCTION_DOMAIN}/tools`,
  },
  '/tools/flooring-calculator': {
    title: 'Flooring Calculator — How Much Flooring Do I Need? | Measurely',
    description: 'Use the Measurely flooring calculator to find how much flooring you need for a room or floor area. Calculate floor area and add extra material for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/flooring-calculator`,
  },
  '/flooring-calculator': {
    title: 'Flooring Calculator — How Much Flooring Do I Need? | Measurely',
    description: 'Use the Measurely flooring calculator to find how much flooring you need for a room or floor area. Calculate floor area and add extra material for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/flooring-calculator`,
  },
  '/tools/paint-calculator': {
    title: 'Paint Calculator — How Much Paint Do I Need? | Measurely',
    description: 'Calculate how much paint you need based on room dimensions or wall area, including doors, windows, multiple coats, and ceiling.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paint-calculator`,
  },
  '/paint-calculator': {
    title: 'Paint Calculator — How Much Paint Do I Need? | Measurely',
    description: 'Calculate how much paint you need based on room dimensions or wall area, including doors, windows, multiple coats, and ceiling.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paint-calculator`,
  },
  '/tools/gravel-calculator': {
    title: 'Gravel Calculator — How Much Gravel Do I Need? | Measurely',
    description: 'Use the Measurely gravel calculator to find how much gravel you need. Calculate gravel volume, cubic yards, cubic metres, and estimated weight for driveways, paths, gardens, and landscaping.',
    canonical: `${PRODUCTION_DOMAIN}/tools/gravel-calculator`,
  },
  '/gravel-calculator': {
    title: 'Gravel Calculator — How Much Gravel Do I Need? | Measurely',
    description: 'Use the Measurely gravel calculator to find how much gravel you need. Calculate gravel volume, cubic yards, cubic metres, and estimated weight for driveways, paths, gardens, and landscaping.',
    canonical: `${PRODUCTION_DOMAIN}/tools/gravel-calculator`,
  },
  '/tools/sand-calculator': {
    title: 'Sand Calculator — How Much Sand Do I Need? | Measurely',
    description: 'Use the Measurely sand calculator to find how much sand you need. Calculate sand volume, cubic yards, cubic metres, and estimated weight for landscaping and other projects.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sand-calculator`,
  },
  '/sand-calculator': {
    title: 'Sand Calculator — How Much Sand Do I Need? | Measurely',
    description: 'Use the Measurely sand calculator to find how much sand you need. Calculate sand volume, cubic yards, cubic metres, and estimated weight for landscaping and other projects.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sand-calculator`,
  },
  '/guides': {
    title: 'Measurely Guides — Home & DIY Tips',
    description: 'Simple guides to help you plan your projects.',
    canonical: `${PRODUCTION_DOMAIN}/guides`,
  },
  '/about': {
    title: 'About Measurely',
    description: 'Measurely creates simple calculators that help you estimate the materials needed for everyday home and DIY projects.',
    canonical: `${PRODUCTION_DOMAIN}/about`,
  },
  '/contact': {
    title: 'Contact Measurely',
    description: 'Have a question, found a problem, or have an idea for a calculator? Contact Measurely.',
    canonical: `${PRODUCTION_DOMAIN}/contact`,
  },
};

function AppContent() {
  const { currentPath } = useNavigation();

  // Normalize /paint-calculator, /gravel-calculator, /sand-calculator, /flooring-calculator to /tools/* if accessed directly
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/paint-calculator') {
        window.history.replaceState({}, '', '/tools/paint-calculator');
      } else if (window.location.pathname === '/gravel-calculator') {
        window.history.replaceState({}, '', '/tools/gravel-calculator');
      } else if (window.location.pathname === '/sand-calculator') {
        window.history.replaceState({}, '', '/tools/sand-calculator');
      } else if (window.location.pathname === '/flooring-calculator') {
        window.history.replaceState({}, '', '/tools/flooring-calculator');
      }
    }
  }, []);

  // Synchronize document.title, canonical URL, and meta tags with current route
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const meta = ROUTE_METADATA[currentPath] || ROUTE_METADATA['/'];
    document.title = meta.title;

    // Update Canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', meta.canonical);

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }

    // Update Open Graph tags
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', meta.canonical);

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
      case '/tools/flooring-calculator':
      case '/flooring-calculator':
        return <FlooringCalculatorPage />;
      case '/tools/paint-calculator':
      case '/paint-calculator':
        return <PaintCalculatorPage />;
      case '/tools/gravel-calculator':
      case '/gravel-calculator':
        return <GravelCalculatorPage />;
      case '/tools/sand-calculator':
      case '/sand-calculator':
        return <SandCalculatorPage />;
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
