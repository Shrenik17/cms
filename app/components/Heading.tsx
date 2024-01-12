import React from "react";

const Heading = (props: any) => {
  return (
    <div className="flex justify-center items-center p-6 font-semibold text-3xl uppercase text-black">
      <p>{props.title}</p>
    </div>
  );
};

export default Heading;
