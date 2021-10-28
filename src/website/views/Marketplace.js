import React, { useEffect } from "react";

import MarketplaceSection from "../components/Marketplace/MarketplaceSection";
import ProductsSection from "../components/Marketplace/ProductsSection";

const Marketplace = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      {/* <MarketplaceSection /> */}
      <ProductsSection />
    </React.Fragment>
  );
};

export default Marketplace;
