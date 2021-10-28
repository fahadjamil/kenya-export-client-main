import React, { useEffect } from "react";
import { GiCargoShip, GiHomeGarage } from "react-icons/gi";

import SeaSteps from "../components/ServicePages/SeaSteps";
import SeaText from "../components/ServicePages/SeaText";
import WarehouseAddress from "../components/ServicePages/WarehouseAddress";
import Timeline from "../components/ServicePages/Timeline";

const BySea = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <SeaSteps />
      <WarehouseAddress />
      <Timeline
        first_icon={<GiCargoShip size={60} />}
        first_text="We Ship Your Order"
        third_icon={<GiHomeGarage size={60} />}
        third_text="We Deliver to You"
        time1="40 to 45 business days"
        time2="(excluding weekends)"
      />
      <SeaText />
    </React.Fragment>
  );
};

export default BySea;
