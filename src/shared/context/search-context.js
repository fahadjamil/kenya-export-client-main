import { createContext } from "react";

export const SearchContext = createContext({
  keyword: "",
  setKeyword: () => {},
  currentView: "",
  startSearchHandler: () => {},
  searchedResult: [],
  resultCount: 0,
  setResultCount: () => {},
});
