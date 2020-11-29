import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import Nav from "../../components/Nav";

import * as PAGES from "./pages";

export const CATALOG = "/catalog";
export const IMPORTSHOPZIO = "/import";

const Routes = () => {
  const location = useLocation();
  return (
    <>
      <Nav />
      <section className="w-full h-full bg-white container-fluid">
        <Switch location={location}>
          <Route path={CATALOG} component={() => <PAGES.CATALOG />} />
          <Route
            path={IMPORTSHOPZIO}
            component={() => <PAGES.IMPORTSHOPZIO />}
          />
        </Switch>
      </section>
    </>
  );
};

export default Routes;
