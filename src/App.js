// Base component.

import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from "./hoc/asyncComponent/syncComponent";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

// Lazy loading for Checkout Component
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

// Lazy loading for Orders Component
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

// Lazy loading for Authentication Component
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    // Routes if user is not authenticated.
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    // Routes if user is authenticated.
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

// Map redux state to props.
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

// Map actions to props.
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

// Connect is used for subscription to state.
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
