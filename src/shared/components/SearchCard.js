import React from "react";
import { Link } from "react-router-dom";

import "./SearchCard.css";

const SearchCard = (props) => {
  return (
    <div className={`custom-search-card ${props.className}`}>
      {/* <h3>This is the Heading</h3> */}
      <p>{props.text}</p>
      <Link to={props.link} className="btn btn-danger btn-sm px-3">
        Read More...
      </Link>
    </div>
  );
};

export default SearchCard;
