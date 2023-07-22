import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import CreateNew from "./CreateNew";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/create_new">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>
      <Routes>
        <Route path="/create_new" element={<CreateNew />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router> 
  );
};

export default Menu;
