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
import { MulchCalculatorPage } from './pages/MulchCalculatorPage';
import { TopsoilCalculatorPage } from './pages/TopsoilCalculatorPage';
import { ConcreteCalculatorPage } from './pages/ConcreteCalculatorPage';
import { TileCalculatorPage } from './pages/TileCalculatorPage';
import { DrywallCalculatorPage } from './pages/DrywallCalculatorPage';
import { PaverCalculatorPage } from './pages/PaverCalculatorPage';
import { SodCalculatorPage } from './pages/SodCalculatorPage';
import { RoofingCalculatorPage } from './pages/RoofingCalculatorPage';
import { FenceCalculatorPage } from './pages/FenceCalculatorPage';
import { GravelGuidePage } from './pages/guides/GravelGuidePage';
import { SandGuidePage } from './pages/guides/SandGuidePage';
import { PaintGuidePage } from './pages/guides/PaintGuidePage';
import { FlooringGuidePage } from './pages/guides/FlooringGuidePage';
import { ConcreteGuidePage } from './pages/guides/ConcreteGuidePage';

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
  '/tools/mulch-calculator': {
    title: 'Mulch Calculator — How Much Mulch Do I Need? | Measurely',
    description: 'Use the Measurely mulch calculator to find how much mulch you need. Calculate mulch volume in cubic metres or cubic yards and estimated weight for garden beds, landscaping, and trees.',
    canonical: `${PRODUCTION_DOMAIN}/tools/mulch-calculator`,
  },
  '/mulch-calculator': {
    title: 'Mulch Calculator — How Much Mulch Do I Need? | Measurely',
    description: 'Use the Measurely mulch calculator to find how much mulch you need. Calculate mulch volume in cubic metres or cubic yards and estimated weight for garden beds, landscaping, and trees.',
    canonical: `${PRODUCTION_DOMAIN}/tools/mulch-calculator`,
  },
  '/tools/topsoil-calculator': {
    title: 'Topsoil Calculator — How Much Topsoil Do I Need? | Measurely',
    description: 'Use the Measurely topsoil calculator to find how much topsoil you need. Calculate topsoil volume in cubic metres or cubic yards and estimated weight for gardens, lawns, and raised beds.',
    canonical: `${PRODUCTION_DOMAIN}/tools/topsoil-calculator`,
  },
  '/topsoil-calculator': {
    title: 'Topsoil Calculator — How Much Topsoil Do I Need? | Measurely',
    description: 'Use the Measurely topsoil calculator to find how much topsoil you need. Calculate topsoil volume in cubic metres or cubic yards and estimated weight for gardens, lawns, and raised beds.',
    canonical: `${PRODUCTION_DOMAIN}/tools/topsoil-calculator`,
  },
  '/tools/concrete-calculator': {
    title: 'Concrete Calculator — How Much Concrete Do I Need? | Measurely',
    description: 'Use the Measurely concrete calculator to find how much concrete you need. Calculate concrete volume in cubic metres or cubic yards for slabs, footings, driveways, and patios.',
    canonical: `${PRODUCTION_DOMAIN}/tools/concrete-calculator`,
  },
  '/concrete-calculator': {
    title: 'Concrete Calculator — How Much Concrete Do I Need? | Measurely',
    description: 'Use the Measurely concrete calculator to find how much concrete you need. Calculate concrete volume in cubic metres or cubic yards for slabs, footings, driveways, and patios.',
    canonical: `${PRODUCTION_DOMAIN}/tools/concrete-calculator`,
  },
  '/tools/tile-calculator': {
    title: 'Tile Calculator — How Many Tiles Do I Need? | Measurely',
    description: 'Use the Measurely tile calculator to find how many tiles you need. Calculate tile quantities for floors and walls based on surface area and tile dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/tile-calculator`,
  },
  '/tile-calculator': {
    title: 'Tile Calculator — How Many Tiles Do I Need? | Measurely',
    description: 'Use the Measurely tile calculator to find how many tiles you need. Calculate tile quantities for floors and walls based on surface area and tile dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/tile-calculator`,
  },
  '/tools/drywall-calculator': {
    title: 'Drywall Calculator — How Many Sheets Do I Need? | Measurely',
    description: 'Use the Measurely drywall calculator to find how many drywall sheets you need. Calculate sheet counts for walls and ceilings based on surface area and sheet dimensions with extra allowance for waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/drywall-calculator`,
  },
  '/drywall-calculator': {
    title: 'Drywall Calculator — How Many Sheets Do I Need? | Measurely',
    description: 'Use the Measurely drywall calculator to find how many drywall sheets you need. Calculate sheet counts for walls and ceilings based on surface area and sheet dimensions with extra allowance for waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/drywall-calculator`,
  },
  '/tools/paver-calculator': {
    title: 'Paver Calculator — How Many Pavers Do I Need? | Measurely',
    description: 'Use the Measurely paver calculator to find how many pavers you need. Calculate paver quantities for patios, walkways, and driveways based on surface area and paver dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paver-calculator`,
  },
  '/paver-calculator': {
    title: 'Paver Calculator — How Many Pavers Do I Need? | Measurely',
    description: 'Use the Measurely paver calculator to find how many pavers you need. Calculate paver quantities for patios, walkways, and driveways based on surface area and paver dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paver-calculator`,
  },
  '/tools/sod-calculator': {
    title: 'Sod Calculator — How Much Sod Do I Need? | Measurely',
    description: 'Use the Measurely sod calculator to find how much sod you need. Calculate sod amount and lawn surface area for turf grass installation with extra allowance for curves and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sod-calculator`,
  },
  '/sod-calculator': {
    title: 'Sod Calculator — How Much Sod Do I Need? | Measurely',
    description: 'Use the Measurely sod calculator to find how much sod you need. Calculate sod amount and lawn surface area for turf grass installation with extra allowance for curves and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sod-calculator`,
  },
  '/tools/roofing-calculator': {
    title: 'Roofing Calculator — How Much Roofing Do I Need? | Measurely',
    description: 'Use the Measurely roofing calculator to find how much roofing material you need. Calculate roof surface area and recommended roofing material with extra allowance for ridges, valleys, and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/roofing-calculator`,
  },
  '/roofing-calculator': {
    title: 'Roofing Calculator — How Much Roofing Do I Need? | Measurely',
    description: 'Use the Measurely roofing calculator to find how much roofing material you need. Calculate roof surface area and recommended roofing material with extra allowance for ridges, valleys, and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/roofing-calculator`,
  },
  '/tools/fence-calculator': {
    title: 'Fence Calculator — How Much Fencing Do I Need? | Measurely',
    description: 'Use the Measurely fence calculator to find how much fencing material you need. Calculate fence surface area and recommended fencing material with extra allowance for trimming and cut waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/fence-calculator`,
  },
  '/fence-calculator': {
    title: 'Fence Calculator — How Much Fencing Do I Need? | Measurely',
    description: 'Use the Measurely fence calculator to find how much fencing material you need. Calculate fence surface area and recommended fencing material with extra allowance for trimming and cut waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/fence-calculator`,
  },
  '/guides': {
    title: 'Measurely Guides — Simple Home & DIY Material Guides',
    description: 'Browse simple, practical guides to help you calculate gravel, sand, paint, flooring, concrete, and more for home projects.',
    canonical: `${PRODUCTION_DOMAIN}/guides`,
  },
  '/guides/how-much-gravel-do-i-need': {
    title: 'How Much Gravel Do I Need? | Measurely Guide',
    description: 'Learn how to calculate gravel volume in cubic yards, cubic metres, and tons for driveways, paths, garden beds, and French drains.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-gravel-do-i-need`,
  },
  '/guides/how-much-sand-do-i-need': {
    title: 'How Much Sand Do I Need? | Measurely Guide',
    description: 'Calculate sand requirements for paver bedding, sandboxes, mortar, and pools in cubic yards, tonnes, and 50 lb bags.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-sand-do-i-need`,
  },
  '/guides/how-much-paint-do-i-need': {
    title: 'How Much Paint Do I Need for a Room? | Measurely Guide',
    description: 'Calculate how many gallons or litres of paint you need for room walls and ceilings with opening deductions and multi-coat formulas.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-paint-do-i-need`,
  },
  '/guides/how-much-flooring-do-i-need': {
    title: 'How Much Flooring Do I Need? | Measurely Guide',
    description: 'Calculate floor area, recommended 10% waste allowance, and total carton box counts for laminate, vinyl plank, and hardwood.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-flooring-do-i-need`,
  },
  '/guides/how-much-concrete-do-i-need': {
    title: 'How Much Concrete Do I Need? | Measurely Guide',
    description: 'Calculate concrete volume in cubic yards, cubic metres, and premix bag counts for slabs, footings, patios, and post holes.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-concrete-do-i-need`,
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
      } else if (window.location.pathname === '/mulch-calculator') {
        window.history.replaceState({}, '', '/tools/mulch-calculator');
      } else if (window.location.pathname === '/topsoil-calculator') {
        window.history.replaceState({}, '', '/tools/topsoil-calculator');
      } else if (window.location.pathname === '/concrete-calculator') {
        window.history.replaceState({}, '', '/tools/concrete-calculator');
      } else if (window.location.pathname === '/tile-calculator') {
        window.history.replaceState({}, '', '/tools/tile-calculator');
      } else if (window.location.pathname === '/drywall-calculator') {
        window.history.replaceState({}, '', '/tools/drywall-calculator');
      } else if (window.location.pathname === '/paver-calculator') {
        window.history.replaceState({}, '', '/tools/paver-calculator');
      } else if (window.location.pathname === '/sod-calculator') {
        window.history.replaceState({}, '', '/tools/sod-calculator');
      } else if (window.location.pathname === '/roofing-calculator') {
        window.history.replaceState({}, '', '/tools/roofing-calculator');
      } else if (window.location.pathname === '/fence-calculator') {
        window.history.replaceState({}, '', '/tools/fence-calculator');
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
      case '/tools/mulch-calculator':
      case '/mulch-calculator':
        return <MulchCalculatorPage />;
      case '/tools/topsoil-calculator':
      case '/topsoil-calculator':
        return <TopsoilCalculatorPage />;
      case '/tools/concrete-calculator':
      case '/concrete-calculator':
        return <ConcreteCalculatorPage />;
      case '/tools/tile-calculator':
      case '/tile-calculator':
        return <TileCalculatorPage />;
      case '/tools/drywall-calculator':
      case '/drywall-calculator':
        return <DrywallCalculatorPage />;
      case '/tools/paver-calculator':
      case '/paver-calculator':
        return <PaverCalculatorPage />;
      case '/tools/sod-calculator':
      case '/sod-calculator':
        return <SodCalculatorPage />;
      case '/tools/roofing-calculator':
      case '/roofing-calculator':
        return <RoofingCalculatorPage />;
      case '/tools/fence-calculator':
      case '/fence-calculator':
        return <FenceCalculatorPage />;
      case '/tools':
        return <ToolsPage />;
      case '/guides/how-much-gravel-do-i-need':
        return <GravelGuidePage />;
      case '/guides/how-much-sand-do-i-need':
        return <SandGuidePage />;
      case '/guides/how-much-paint-do-i-need':
        return <PaintGuidePage />;
      case '/guides/how-much-flooring-do-i-need':
        return <FlooringGuidePage />;
      case '/guides/how-much-concrete-do-i-need':
        return <ConcreteGuidePage />;
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
