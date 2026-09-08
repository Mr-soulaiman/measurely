import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPath: '/',
  navigate: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p === '/paint-calculator') return '/tools/paint-calculator';
      return p || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname || '/';
      if (path === '/paint-calculator') path = '/tools/paint-calculator';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

export interface LinkProps extends React.ComponentProps<'a'> {
  key?: React.Key;
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Link({ href, children, className, onClick, ...rest }: LinkProps) {
  const { navigate } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
