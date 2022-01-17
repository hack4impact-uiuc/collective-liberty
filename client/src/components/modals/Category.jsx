import React from "react";

const Category = ({ name, className, children }) => (
  <div className="category">
    <h3>
      <div className={`square ${className}`} />
      {name}
    </h3>
    <p>{children}</p>
  </div>
);

export default Category;
