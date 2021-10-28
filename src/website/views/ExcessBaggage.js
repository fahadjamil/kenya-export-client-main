import React, { useEffect } from "react";
import BaggageSection from "../components/ServicePages/BaggageSection";
import WarehouseAddress from "../components/ServicePages/WarehouseAddress";

const ExcessBaggage = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <BaggageSection />
      <WarehouseAddress />
    </React.Fragment>
  );
};

export default ExcessBaggage;
