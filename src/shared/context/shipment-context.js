import { createContext } from "react";

const ShipmentContext = createContext({
  shipments: [],
  getShipments: () => {},
});
