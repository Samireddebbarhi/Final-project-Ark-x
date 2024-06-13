import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import classes from "./style.module.scss";

export const Loader = ({ height, width }) => {
  return (
    <div className={classes["loader-indicator"]}>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default Loader;
