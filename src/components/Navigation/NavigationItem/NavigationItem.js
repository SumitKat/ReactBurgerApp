// Single Navigation item comoponent.

import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

//  Returns list item with React Router Nav link to redirect to a page, with bool exact match.
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
