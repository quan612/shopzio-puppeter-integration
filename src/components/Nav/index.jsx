import React, { useState } from "react";
import * as ROUTES from "app/routes";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <header className="w-full bg-blue-500 ">
      <div className="w-full mb-1 flex justify-center">
        <>
          <NavLink
            className="no-underline border-b-2 border-transparent uppercase tracking-wide font-bold  py-4 mr-8"
            to={ROUTES.CATALOG}
            activeClassName="true"
          >
            Catalog
          </NavLink>
          <NavLink
            className="no-underline border-b-2 border-transparent uppercase tracking-wide font-bold  py-4 mr-8"
            to={ROUTES.IMPORTSHOPZIO}
            activeClassName="true"
          >
            Import Shopzio
          </NavLink>
        </>
      </div>
    </header>
  );
};

export default Nav;
