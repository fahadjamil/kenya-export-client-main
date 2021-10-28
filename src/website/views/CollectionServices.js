import React, { useEffect } from "react";

import CollectionSection from "../components/ServicePages/CollectionServices";
import DoorDelivery from "../components/ServicePages/DoorDelivery";
import FindPostCode from "../components/ServicePages/FindPostCode";
import WarehouseAddress from "../components/ServicePages/WarehouseAddress";

const CollectionServices = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <FindPostCode />
      <DoorDelivery />
      <CollectionSection />
      <WarehouseAddress />
    </React.Fragment>
  );
};

export default CollectionServices;
