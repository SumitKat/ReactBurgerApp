// HOC for lazy loading

import React, { Component } from "react";

const asyncComponent = importComponent => {
  // Returns a component that is passed as payload.
  return class extends Component {
    state = {
      component: null
    };

    // Set component as local state.
    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
