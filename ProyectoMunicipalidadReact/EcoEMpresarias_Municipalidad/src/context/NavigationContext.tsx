// NavigationContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type NavItem = { path: string; label: string };

// NavigationContext.tsx
const NavigationContext = createContext<{
  history: NavItem[];
  setHistory: React.Dispatch<React.SetStateAction<NavItem[]>>;
}>({ history: [], setHistory: () => {} });

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [history, setHistory] = useState<NavItem[]>([]);

  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
      setHistory([]);
      return;
    }

    const firstSegment = parts[0];
    const label = firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);

    setHistory((prev) => {
      const exists = prev.find((item) => item.path === location.pathname);
      if (exists) return prev;
      return [...prev, { path: location.pathname, label }];
    });
  }, [location]);

  return (
    <NavigationContext.Provider value={{ history, setHistory }}>
      {children}
    </NavigationContext.Provider>
  );
}


export function useNavigationHistory() {
  return useContext(NavigationContext);
}
