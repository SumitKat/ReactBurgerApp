//  Build Control Component.
import React from "react";
import classes from "./BuildControl.css";

// Returns Controller for burger builder with label for ingredient,
// button to increase/decrese ingredient's quantity.
const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
