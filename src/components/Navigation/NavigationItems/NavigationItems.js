// Navigation Items Component

import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "../NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    {/* Burger Builder  Tab */}
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>

    {/* Orders Tab */}
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : (
      ""
    )}

    {/* Authenticate or Logout Tab */}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
