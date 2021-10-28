import React, { useContext, useState } from "react";

import SearchCard from "../../shared/components/SearchCard";
import { SearchContext } from "../../shared/context/search-context";
import "./SearchArea.css";

const SearchedArea = () => {
  const search = useContext(SearchContext);
  const [searchedResult, setSearchResult] = useState(search.searchedResult);

  return (
    <div className="container my-5">
      {searchedResult?.map((data, index) => (
        <SearchCard
          key={index}
          text={data.text}
          link={`${search.currentView}#${data.id}`}
          className="mt-2"
        />
      ))}
    </div>
  );
};

export default SearchedArea;
