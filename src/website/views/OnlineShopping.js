import React, { useEffect } from "react";
import { GiCargoShip, GiHomeGarage } from "react-icons/gi";
import { GoDeviceDesktop } from "react-icons/go";

import BuynShipSteps from "../components/ServicePages/BuynShipSteps";
import BuynShipText from "../components/ServicePages/BuynShipText";
import Timeline from "../components/ServicePages/Timeline";
import WarehouseAddress from "../components/ServicePages/WarehouseAddress";

const OnlineShopping = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <BuynShipSteps />
      <WarehouseAddress />
      <Timeline
        first_icon={<GoDeviceDesktop size={50} />}
        first_text="You Place Your Order Online"
        second_icon={<GiCargoShip size={60} />}
        second_text="We Receive and Ship Your Order"
        third_icon={<GiHomeGarage size={60} />}
        third_text="We Deliver it to You"
        time1="2 to 20"
        time2="Business Days"
        time3="7 to 15"
        time4="Business Days"
      />
      <BuynShipText />
    </React.Fragment>
  );
};

export default OnlineShopping;
