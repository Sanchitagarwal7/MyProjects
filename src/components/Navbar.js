import React from "react";
import Filter from "./Filter"

const Navbar = () => {
  return (
    <>
      <div>LOGO</div>
      <div className="d-flex justify-content-around">
        <div>
          <Filter title={"Roles"}/>
        </div>
        <div>
          <Filter title={"Tags"}/>
        </div>
        <div>
          <Filter title={"Category"}/>
        </div>
      </div>
    </>
  );
};

export default Navbar;
