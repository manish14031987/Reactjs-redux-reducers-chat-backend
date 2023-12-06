import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const loader = () => {
  return (
    <div className="right-contant">
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <Skeleton variant="rect" height={200} />
      <Skeleton width="60%" />
      <Skeleton />
    </div>
  );
};

export default loader;
