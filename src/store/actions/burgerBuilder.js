// Burger Builder action creator.

import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// Add ingredient action creator.
export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

// Remove ingredient action creator.
export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

// Set ingredients action creator.
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

// Fetch ingredients failed action creator.
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

// Initialiaze action creator.
export const initIngredients = () => {
  return dispatch => {
    // Fetch ingredient, call setIngredients if success
    // otherwise call fetchIngredientsFailed action creator.
    axios
      .get("https://react-my-burger-89b59.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
