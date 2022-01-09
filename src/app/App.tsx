import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "../../static/styles.css";
import { HomePage } from "../pages/HomePage";
import { NailBitingDetectorPage } from "../pages/NailBitingDetectorPage";
import { AppProvider } from "./AppContext";
import { routes } from "./Routes";

export function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route path={routes.nav.root.path} element={<Navigate to={routes.nav.home.path} />} />
          <Route path={routes.nav.home.path} element={<HomePage />} />
          <Route path={routes.nav.nbd.path} element={<NailBitingDetectorPage />} />
          {/* Your new route goes here */}
          <Route path="*" element={<Navigate to={routes.nav.home.path} />} />
        </Routes>
      </AppProvider>
    </HashRouter>
  );
}
