import { NavLink } from "react-router-dom";
import clsx from "classnames";

import css from "../App.module.css";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
  });

const Layout = ({ children }) => {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={getNavLinkClassNames} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/movies" end>
          Movies
        </NavLink>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
