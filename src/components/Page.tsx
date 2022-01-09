import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { APP_NAME } from "../app/AppContext";
import { routes } from "../app/Routes";

interface PageProps {
  title: string;
  showBack: boolean;
  children: ReactNode;
}

export function Page(props: PageProps) {
  return (
    <div className="container">
      <div>
        <img src={routes.images.robot} width={70} height={70} />
      </div>
      <h1>{APP_NAME}</h1>
      <h3>{props.title}</h3>
      {props.showBack && <Link to={routes.nav.home.path}>{"Back"}</Link>}
      {props.children}
    </div>
  );
}
