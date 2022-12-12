import React from "react";

const Heading = ({ className, title }) => {
  return (
    <div className={`heading ${className ? className : ""}`}>
      <h2 className="widget-title">
        <b>{title}</b>
      </h2>
    </div>
  );
};

export default Heading;
