import React, { useState } from "react";

function Header({ handleSearch }) {
  const [search, setSearch] = useState("");
  return (
    <nav className="navbar navbar-light justify-content-between">
      <a className="navbar-brand">
        <img src="https://www.nitssolutions.com/images/logo.png" alt="" />
      </a>
      <form className="form-inline d-flex"  >
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        /> &nbsp;
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={() => handleSearch(search)}
          type={"button"}
        >
          Search
        </button>
      </form>
    </nav>
  );
}

export default Header;
