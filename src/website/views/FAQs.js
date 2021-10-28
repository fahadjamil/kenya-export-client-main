import React, { useEffect } from "react";

import QAList from "../components/FAQs/QAList";

const FAQs = () => {

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <React.Fragment>
      <QAList />
    </React.Fragment>
  );
};

export default FAQs;
