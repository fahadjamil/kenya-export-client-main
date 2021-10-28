import { useState, useEffect } from "react";

export const useSearch = () => {
  const [keyword, setKeywordState] = useState("");
  const [currentView, setCurrentView] = useState();
  const [resultCount, setResultCount] = useState(0);
  let count = 0;
  // let resultCount = 0;
  const searchedResult = [];

  // const setResultCount = (value) => {
  //   resultCount = value;
  //   console.log(resultCount);
  // };

  const setKeyword = (value) => {
    setKeywordState(value.trim().replace(/" "/g, ""));
    setCurrentView(window.location.href);
    console.log(window.location.href);
  };

  let queue = [document.body],
    curr;
  const startSearchHandler = (action) => {
    if (keyword) {
      console.log("START SEARCHING IN THE DOM.");
      while ((curr = queue.pop())) {
        if (!curr.textContent.match(keyword)) continue;
        for (var i = 0; i < curr.childNodes.length; ++i) {
          switch (curr.childNodes[i].nodeType) {
            case Node.TEXT_NODE: // 3
              if (curr.childNodes[i].textContent.match(keyword)) {
                if (action === "start") {
                  count += 1;
                  setResultCount(count);
                  const text = curr.innerText;
                  console.log(curr);
                  curr.innerHTML = `<mark>${text}</mark>`;
                } else {
                  setKeywordState("");
                  curr.classList.add("inactive");
                }
                // console.log(curr.innerText);
                // console.log(
                //   document.querySelector(curr.tagName).closest("section").id
                // );
                // const regex = new RegExp(text, "g");
                // const newText = curr
                // curr.innerHTML = newText;
                // searchedData.push({
                //   text: curr.innerText,
                //   id: document.querySelector(curr.tagName).closest("section")
                //     .id,
                // });
                // you might want to end your search here.
              }
              break;
            case Node.ELEMENT_NODE: // 1
              queue.push(curr.childNodes[i]);
              break;
          }
        }
      }
    }
  };

  return {
    keyword,
    setKeyword,
    currentView,
    startSearchHandler,
    searchedResult,
    resultCount,
    setResultCount,
  };
};
