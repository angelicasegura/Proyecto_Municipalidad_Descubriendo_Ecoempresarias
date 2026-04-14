import { createContext, useContext, useState } from "react";

const NavbarContext = createContext<any>(null);

export function NavbarProvider({ children }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <NavbarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}