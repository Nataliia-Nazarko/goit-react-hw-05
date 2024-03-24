import { NavLink } from "react-router-dom";
import clsx from "classnames";

import css from "./Navigation.module.css";

const linksStyle = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={linksStyle}>
        Home
      </NavLink>
      <NavLink to="/movies" className={linksStyle}>
        Movies
      </NavLink>
    </nav>
  );
}
