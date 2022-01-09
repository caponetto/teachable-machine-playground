import React, { createContext, ReactNode, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { routes } from "./Routes";

export const APP_NAME = "Teachable Machine Playground";

export type Device = "desktop" | "mobile";

export interface AppContextType {
  device: Device;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function useApp() {
  return useContext(AppContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider(props: AppProviderProps) {
  const location = useLocation();

  const device: Device = useMemo(
    () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "mobile" : "desktop",
    []
  );

  useEffect(() => {
    if (location.pathname === routes.nav.root.path) {
      document.title = APP_NAME;
      return;
    }

    const nav = Object.values(routes.nav).find((n) => n.path === location.pathname);
    if (!nav) {
      return;
    }

    document.title = `${APP_NAME} | ${nav.name}`;
  }, [location.pathname]);

  const value = useMemo(() => ({ device }), [device]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
