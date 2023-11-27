import React from "react";

function Heading({ title, subtitle, center }) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-semibold">{title}</div>
      <div className="font-light text-neutral-500 my-4 ">{subtitle}</div>
    </div>
    
  );
}

export default Heading;