import React, { useState } from "react";

//here we are using children for component composition (to fix prop drilling)
export default function NavBar({children}) {
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export function NumResults({movies}) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
