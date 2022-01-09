import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../app/Routes";
import { Page } from "../components/Page";

export function HomePage() {
  return (
    <Page title={routes.nav.home.name} showBack={false}>
      {Object.values(routes.nav)
        .filter((nav) => nav !== routes.nav.home && nav !== routes.nav.root)
        .map(({ path, name }) => (
          <div key={path}>
            <Link to={path}>{name}</Link>
          </div>
        ))}
    </Page>
  );
}
