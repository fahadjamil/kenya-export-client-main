import React, { useEffect } from "react";
import { GiCommercialAirplane, GiHomeGarage } from "react-icons/gi";

import AirSteps from "../components/ServicePages/AirSteps";
import AirText from "../components/ServicePages/AirText";
import Timeline from "../components/ServicePages/Timeline";
import WarehouseAddress from "../components/ServicePages/WarehouseAddress";

const ByAir = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <AirSteps />
      <WarehouseAddress />
      <Timeline
        first_icon={<GiCommercialAirplane size={60} />}
        first_text="We Ship Your Order"
        third_icon={<GiHomeGarage size={60} />}
        third_text="We Deliver to You"
        time1="5 business days"
        time2="(excluding weekends)"
      />
      <AirText />
    </React.Fragment>
  );
};

export default ByAir;
