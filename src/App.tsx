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
import { ExtraFlooringGuidePage } from './pages/guides/ExtraFlooringGuidePage';
import { FlooringWasteGuidePage } from './pages/guides/FlooringWasteGuidePage';
import { LShapedRoomFlooringGuidePage } from './pages/guides/LShapedRoomFlooringGuidePage';
import { TenByTenFlooringGuidePage } from './pages/guides/TenByTenFlooringGuidePage';
import { DrivewayGravelGuidePage } from './pages/guides/DrivewayGravelGuidePage';
import { DrivewayGravelDepthGuidePage } from './pages/guides/DrivewayGravelDepthGuidePage';
import { TonsOfGravelGuidePage } from './pages/guides/TonsOfGravelGuidePage';
import { IrregularAreaGravelGuidePage } from './pages/guides/IrregularAreaGravelGuidePage';
import { TwoCoatsPaintGuidePage } from './pages/guides/TwoCoatsPaintGuidePage';
import { WallVsFloorAreaPaintGuidePage } from './pages/guides/WallVsFloorAreaPaintGuidePage';
import { PaintForOneRoomGuidePage } from './pages/guides/PaintForOneRoomGuidePage';
import { CeilingPaintGuidePage } from './pages/guides/CeilingPaintGuidePage';

interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
}

const PRODUCTION_DOMAIN = 'https://measurely-tools.vercel.app';

const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Measivo — Simple Material Calculators',
    description: 'Simple tools to help you estimate materials for home and DIY projects.',
    canonical: `${PRODUCTION_DOMAIN}/`,
  },
  '/tools': {
    title: 'Measivo Tools — Material Calculators',
    description: 'Browse simple, practical material calculators for your home and DIY projects.',
    canonical: `${PRODUCTION_DOMAIN}/tools`,
  },
  '/tools/flooring-calculator': {
    title: 'Flooring Calculator — How Much Flooring Do I Need? | Measivo',
    description: 'Use the Measivo flooring calculator to find how much flooring you need for a room or floor area. Calculate floor area and add extra material for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/flooring-calculator`,
  },
  '/flooring-calculator': {
    title: 'Flooring Calculator — How Much Flooring Do I Need? | Measivo',
    description: 'Use the Measivo flooring calculator to find how much flooring you need for a room or floor area. Calculate floor area and add extra material for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/flooring-calculator`,
  },
  '/tools/paint-calculator': {
    title: 'Paint Calculator — How Much Paint Do I Need? | Measivo',
    description: 'Calculate how much paint you need based on room dimensions or wall area, including doors, windows, multiple coats, and ceiling.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paint-calculator`,
  },
  '/paint-calculator': {
    title: 'Paint Calculator — How Much Paint Do I Need? | Measivo',
    description: 'Calculate how much paint you need based on room dimensions or wall area, including doors, windows, multiple coats, and ceiling.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paint-calculator`,
  },
  '/tools/gravel-calculator': {
    title: 'Gravel Calculator — How Much Gravel Do I Need? | Measivo',
    description: 'Use the Measivo gravel calculator to find how much gravel you need. Calculate gravel volume, cubic yards, cubic metres, and estimated weight for driveways, paths, gardens, and landscaping.',
    canonical: `${PRODUCTION_DOMAIN}/tools/gravel-calculator`,
  },
  '/gravel-calculator': {
    title: 'Gravel Calculator — How Much Gravel Do I Need? | Measivo',
    description: 'Use the Measivo gravel calculator to find how much gravel you need. Calculate gravel volume, cubic yards, cubic metres, and estimated weight for driveways, paths, gardens, and landscaping.',
    canonical: `${PRODUCTION_DOMAIN}/tools/gravel-calculator`,
  },
  '/tools/sand-calculator': {
    title: 'Sand Calculator — How Much Sand Do I Need? | Measivo',
    description: 'Use the Measivo sand calculator to find how much sand you need. Calculate sand volume, cubic yards, cubic metres, and estimated weight for landscaping and other projects.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sand-calculator`,
  },
  '/sand-calculator': {
    title: 'Sand Calculator — How Much Sand Do I Need? | Measivo',
    description: 'Use the Measivo sand calculator to find how much sand you need. Calculate sand volume, cubic yards, cubic metres, and estimated weight for landscaping and other projects.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sand-calculator`,
  },
  '/tools/mulch-calculator': {
    title: 'Mulch Calculator — How Much Mulch Do I Need? | Measivo',
    description: 'Use the Measivo mulch calculator to find how much mulch you need. Calculate mulch volume in cubic metres or cubic yards and estimated weight for garden beds, landscaping, and trees.',
    canonical: `${PRODUCTION_DOMAIN}/tools/mulch-calculator`,
  },
  '/mulch-calculator': {
    title: 'Mulch Calculator — How Much Mulch Do I Need? | Measivo',
    description: 'Use the Measivo mulch calculator to find how much mulch you need. Calculate mulch volume in cubic metres or cubic yards and estimated weight for garden beds, landscaping, and trees.',
    canonical: `${PRODUCTION_DOMAIN}/tools/mulch-calculator`,
  },
  '/tools/topsoil-calculator': {
    title: 'Topsoil Calculator — How Much Topsoil Do I Need? | Measivo',
    description: 'Use the Measivo topsoil calculator to find how much topsoil you need. Calculate topsoil volume in cubic metres or cubic yards and estimated weight for gardens, lawns, and raised beds.',
    canonical: `${PRODUCTION_DOMAIN}/tools/topsoil-calculator`,
  },
  '/topsoil-calculator': {
    title: 'Topsoil Calculator — How Much Topsoil Do I Need? | Measivo',
    description: 'Use the Measivo topsoil calculator to find how much topsoil you need. Calculate topsoil volume in cubic metres or cubic yards and estimated weight for gardens, lawns, and raised beds.',
    canonical: `${PRODUCTION_DOMAIN}/tools/topsoil-calculator`,
  },
  '/tools/concrete-calculator': {
    title: 'Concrete Calculator — How Much Concrete Do I Need? | Measivo',
    description: 'Use the Measivo concrete calculator to find how much concrete you need. Calculate concrete volume in cubic metres or cubic yards for slabs, footings, driveways, and patios.',
    canonical: `${PRODUCTION_DOMAIN}/tools/concrete-calculator`,
  },
  '/concrete-calculator': {
    title: 'Concrete Calculator — How Much Concrete Do I Need? | Measivo',
    description: 'Use the Measivo concrete calculator to find how much concrete you need. Calculate concrete volume in cubic metres or cubic yards for slabs, footings, driveways, and patios.',
    canonical: `${PRODUCTION_DOMAIN}/tools/concrete-calculator`,
  },
  '/tools/tile-calculator': {
    title: 'Tile Calculator — How Many Tiles Do I Need? | Measivo',
    description: 'Use the Measivo tile calculator to find how many tiles you need. Calculate tile quantities for floors and walls based on surface area and tile dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/tile-calculator`,
  },
  '/tile-calculator': {
    title: 'Tile Calculator — How Many Tiles Do I Need? | Measivo',
    description: 'Use the Measivo tile calculator to find how many tiles you need. Calculate tile quantities for floors and walls based on surface area and tile dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/tile-calculator`,
  },
  '/tools/drywall-calculator': {
    title: 'Drywall Calculator — How Many Sheets Do I Need? | Measivo',
    description: 'Use the Measivo drywall calculator to find how many drywall sheets you need. Calculate sheet counts for walls and ceilings based on surface area and sheet dimensions with extra allowance for waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/drywall-calculator`,
  },
  '/drywall-calculator': {
    title: 'Drywall Calculator — How Many Sheets Do I Need? | Measivo',
    description: 'Use the Measivo drywall calculator to find how many drywall sheets you need. Calculate sheet counts for walls and ceilings based on surface area and sheet dimensions with extra allowance for waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/drywall-calculator`,
  },
  '/tools/paver-calculator': {
    title: 'Paver Calculator — How Many Pavers Do I Need? | Measivo',
    description: 'Use the Measivo paver calculator to find how many pavers you need. Calculate paver quantities for patios, walkways, and driveways based on surface area and paver dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paver-calculator`,
  },
  '/paver-calculator': {
    title: 'Paver Calculator — How Many Pavers Do I Need? | Measivo',
    description: 'Use the Measivo paver calculator to find how many pavers you need. Calculate paver quantities for patios, walkways, and driveways based on surface area and paver dimensions with extra allowance for cuts and waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/paver-calculator`,
  },
  '/tools/sod-calculator': {
    title: 'Sod Calculator — How Much Sod Do I Need? | Measivo',
    description: 'Use the Measivo sod calculator to find how much sod you need. Calculate sod amount and lawn surface area for turf grass installation with extra allowance for curves and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sod-calculator`,
  },
  '/sod-calculator': {
    title: 'Sod Calculator — How Much Sod Do I Need? | Measivo',
    description: 'Use the Measivo sod calculator to find how much sod you need. Calculate sod amount and lawn surface area for turf grass installation with extra allowance for curves and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/sod-calculator`,
  },
  '/tools/roofing-calculator': {
    title: 'Roofing Calculator — How Much Roofing Do I Need? | Measivo',
    description: 'Use the Measivo roofing calculator to find how much roofing material you need. Calculate roof surface area and recommended roofing material with extra allowance for ridges, valleys, and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/roofing-calculator`,
  },
  '/roofing-calculator': {
    title: 'Roofing Calculator — How Much Roofing Do I Need? | Measivo',
    description: 'Use the Measivo roofing calculator to find how much roofing material you need. Calculate roof surface area and recommended roofing material with extra allowance for ridges, valleys, and cutting waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/roofing-calculator`,
  },
  '/tools/fence-calculator': {
    title: 'Fence Calculator — How Much Fencing Do I Need? | Measivo',
    description: 'Use the Measivo fence calculator to find how much fencing material you need. Calculate fence surface area and recommended fencing material with extra allowance for trimming and cut waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/fence-calculator`,
  },
  '/fence-calculator': {
    title: 'Fence Calculator — How Much Fencing Do I Need? | Measivo',
    description: 'Use the Measivo fence calculator to find how much fencing material you need. Calculate fence surface area and recommended fencing material with extra allowance for trimming and cut waste.',
    canonical: `${PRODUCTION_DOMAIN}/tools/fence-calculator`,
  },
  '/guides': {
    title: 'Measivo Guides — Simple Home & DIY Material Guides',
    description: 'Browse simple, practical guides to help you calculate materials and plan home and DIY projects.',
    canonical: `${PRODUCTION_DOMAIN}/guides`,
  },
  '/guides/how-much-extra-flooring-should-you-buy': {
    title: 'How Much Extra Flooring Should You Buy? | Measivo Guide',
    description: 'Learn why purchasing exact room square footage leaves you stranded, how end-of-row cut scraps work, and how whole-box rounding protects your project.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-extra-flooring-should-you-buy`,
  },
  '/guides/what-flooring-waste-percentage-should-you-use': {
    title: 'What Flooring Waste Percentage Should You Use? | Measivo Guide',
    description: 'Decide whether to add 5%, 10%, 15%, or 20% waste based on your room shape, layout complexity, and installation pattern like herringbone or diagonal runs.',
    canonical: `${PRODUCTION_DOMAIN}/guides/what-flooring-waste-percentage-should-you-use`,
  },
  '/guides/how-to-measure-an-l-shaped-room-for-flooring': {
    title: 'How to Measure an L-Shaped Room for Flooring | Measivo Guide',
    description: 'Use the two-rectangle split method and outer subtraction trick to accurately calculate square footage, doorway depth, and box counts for irregular rooms.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-to-measure-an-l-shaped-room-for-flooring`,
  },
  '/guides/how-much-flooring-do-i-need-for-a-10x10-room': {
    title: 'How Much Flooring Do I Need for a 10×10 Room? | Measivo Guide',
    description: 'A realistic, step-by-step example showing how a 100 sq ft room translates into 110 sq ft with waste, actual carton counts (5 to 6 boxes), and estimated material costs.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-flooring-do-i-need-for-a-10x10-room`,
  },
  '/guides/how-much-gravel-do-i-need-for-a-driveway': {
    title: 'How Much Gravel Do I Need for a Driveway? | Measivo Guide',
    description: 'Calculate exact driveway gravel volume in cubic yards and tonnes. Learn how to measure length, width, and depth, convert to truckloads, and avoid running short.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-gravel-do-i-need-for-a-driveway`,
  },
  '/guides/how-deep-should-driveway-gravel-be': {
    title: 'How Deep Should Driveway Gravel Be? | Measivo Guide',
    description: 'Find the right gravel depth for a driveway refresh vs new base build. Learn why depth dictates your budget and how to avoid rutting or tire sinking.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-deep-should-driveway-gravel-be`,
  },
  '/guides/how-many-tons-of-gravel-do-i-need': {
    title: 'How Many Tons of Gravel Do I Need? | Measivo Guide',
    description: 'Convert cubic yards and cubic metres of gravel into tons or tonnes. Understand rock density, moisture variation, and how to order bulk rock without running short.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-many-tons-of-gravel-do-i-need`,
  },
  '/guides/how-to-calculate-gravel-for-an-irregular-area': {
    title: 'How to Calculate Gravel for an Irregular Area | Measivo Guide',
    description: 'Calculate gravel for L-shaped driveways, curved paths, parking nooks, and irregular garden beds. Learn the split-section method and common measurement traps.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-to-calculate-gravel-for-an-irregular-area`,
  },
  '/guides/how-much-paint-do-i-need-for-2-coats': {
    title: 'How Much Paint Do I Need for 2 Coats? | Measivo Guide',
    description: 'Calculate exact paint needs for 2 coats. Understand coverage differences between coats, why drywall absorbs coat 1 faster, and how to order gallons vs quarts.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-paint-do-i-need-for-2-coats`,
  },
  '/guides/do-you-calculate-paint-from-wall-area-or-floor-area': {
    title: 'Do You Calculate Paint From Wall Area or Floor Area? | Measivo Guide',
    description: 'Always calculate paint from wall area, not floor area. Learn why floor area alone causes major shortages, how room perimeter links the two, and how ceiling height changes wall square footage.',
    canonical: `${PRODUCTION_DOMAIN}/guides/do-you-calculate-paint-from-wall-area-or-floor-area`,
  },
  '/guides/how-much-paint-do-i-need-for-one-room': {
    title: 'How Much Paint Do I Need for One Room? | Measivo Guide',
    description: 'A practical step-by-step room measuring blueprint: perimeter formulas, ceiling height multipliers, door and window deductions, 2-coat math, and when to buy quarts vs full gallons.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-paint-do-i-need-for-one-room`,
  },
  '/guides/how-much-paint-do-i-need-for-a-ceiling': {
    title: 'How Much Paint Do I Need for a Ceiling? | Measivo Guide',
    description: 'Calculate ceiling paint square footage, compare smooth drywall vs popcorn texture absorption, and learn why ceiling paint is formulated dead flat.',
    canonical: `${PRODUCTION_DOMAIN}/guides/how-much-paint-do-i-need-for-a-ceiling`,
  },
  '/about': {
    title: 'About Measivo',
    description: 'Measivo creates simple calculators that help you estimate the materials needed for everyday home and DIY projects.',
    canonical: `${PRODUCTION_DOMAIN}/about`,
  },
  '/contact': {
    title: 'Contact Measivo',
    description: 'Have a question, found a problem, or have an idea for a calculator? Contact Measivo.',
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
      case '/guides/how-much-extra-flooring-should-you-buy':
        return <ExtraFlooringGuidePage />;
      case '/guides/what-flooring-waste-percentage-should-you-use':
        return <FlooringWasteGuidePage />;
      case '/guides/how-to-measure-an-l-shaped-room-for-flooring':
        return <LShapedRoomFlooringGuidePage />;
      case '/guides/how-much-flooring-do-i-need-for-a-10x10-room':
        return <TenByTenFlooringGuidePage />;
      case '/guides/how-much-gravel-do-i-need-for-a-driveway':
        return <DrivewayGravelGuidePage />;
      case '/guides/how-deep-should-driveway-gravel-be':
        return <DrivewayGravelDepthGuidePage />;
      case '/guides/how-many-tons-of-gravel-do-i-need':
        return <TonsOfGravelGuidePage />;
      case '/guides/how-to-calculate-gravel-for-an-irregular-area':
        return <IrregularAreaGravelGuidePage />;
      case '/guides/how-much-paint-do-i-need-for-2-coats':
        return <TwoCoatsPaintGuidePage />;
      case '/guides/do-you-calculate-paint-from-wall-area-or-floor-area':
        return <WallVsFloorAreaPaintGuidePage />;
      case '/guides/how-much-paint-do-i-need-for-one-room':
        return <PaintForOneRoomGuidePage />;
      case '/guides/how-much-paint-do-i-need-for-a-ceiling':
        return <CeilingPaintGuidePage />;
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
