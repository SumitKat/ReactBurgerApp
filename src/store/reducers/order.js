// Order reducer.

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

// Initial State.
const initialState = {
  order: [],
  loading: false,
  purchased: false
};

// Purchase init method sets purchase property to false in state object.
const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
  },
  // Start Burger Purchase method sets loading property to true in state object.
  purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
  },
  // Burger Purchase Success method sets loading property to false,
  // updates order array and set purchase to true in state object.
  purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
      id: action.orderId
    });

    return updateObject(state, {
      loading: false,
      orders: state.order.concat(newOrder),
      purchased: true
    });
  },
  // Burger puchase fail method sets loading to true.
  purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
  },
  // Start orders fetching method sets loading property to true in state object.
  fetchOrdersStart = (state, action) => {
    return updateObject(state, {
      loading: true
    });
  },
  // Fetching orders success method sets orders and loading property in state object.
  fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
      order: action.orders,
      loading: false
    });
  },
  // Fetching orders fail method sets loading to false.
  fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false });
  };

// Reducer method, receives state, action as payload
// Checks action type and call methods.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
