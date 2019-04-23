import React, { SFC } from "react";

let Space: SFC<{
  width?: number;
  height?: number;
}> = (props) => {
  return (
    <div
      style={{
        display: props.width ? "inline-block" : "block",
        width: props.width || 1,
        height: props.height || 1,
      }}
    />
  );
};

export default Space;
