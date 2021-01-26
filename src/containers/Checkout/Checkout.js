//  Checkout Container.
import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  // Checkout failed, redirects to previous route.
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  // Checkout successfull, redirects to contact data route.
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    // Order summary variable, initially set to Redirect to homepage.
    let summary = <Redirect to="/" />;

    // Check if ingredients are set in redux store.
    if (this.props.ings) {
      // If already purchased redirect to homepage.
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      // Update summary variable with checkout summary and link
      summary = (
        <div>
          {purchasedRedirect}

          {/* Summary component with ingredients, checkoutContinued
           and checkoutCancelled handler passed as props.*/}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}
          />

          {/* Contact Data route will be loaded here if path matches /contact-data */}
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}

// Mapping redux state to props for container
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

// Export component.
export default connect(mapStateToProps)(Checkout);
