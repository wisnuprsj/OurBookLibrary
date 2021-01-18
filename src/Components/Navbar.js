import React, { useState } from "react";

function Navbar(props) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div id="navigation-bar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/Home">
          T&W Library
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a
              className={`nav-link ${props.active === "home" ? "active" : ""}`}
              aria-current="page"
              href="/Home"
            >
              Home
            </a>
            <a
              className={`nav-link ${
                props.active === "addbooks" ? "active" : ""
              }`}
              href="/AddBooks"
            >
              Add Books
            </a>
            <a
              className={`nav-link ${
                props.active === "collection" ? "active" : ""
              }`}
              href="/Collection"
            >
              Collection
            </a>

            <a
              className={`nav-link ${
                props.active === "monitoring" ? "active" : ""
              }`}
              href="/Monitoring"
            >
              Monitoring
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
