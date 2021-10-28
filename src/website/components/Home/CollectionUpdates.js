import React, { useEffect, useState } from "react";
import { GiCargoShip, GiStopwatch, GiCommercialAirplane } from "react-icons/gi";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  addDays,
  capitalize,
  getDayStringWithNum,
  shipmentModeNameInverse,
} from "../../../shared/utils/functions";
import "./CollectionUpdate.css";

const CollectionUpdate = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [shipmentSchedule, setShipmentSchedule] = useState([]);

  const shipmentScheduleApi = async () => {
    const response = await sendRequest("shipment/get_shipment_schedule");
    setShipmentSchedule(response.data);
  };

  useEffect(() => {
    shipmentScheduleApi();
  }, []);

  return (
    <section className="collection-update-secion" id="collectionUpdateSection">
      <div className="container">
        <h1>COLLECTION UPDATES</h1>
        <div className="row">
          {shipmentSchedule?.map((data, index) => (
            <React.Fragment key={index}>
              <div className="col-lg-3 col-md-6">
                <div className="collection-card">
                  <div>
                    <GiStopwatch size={80} className="update-icon" />
                    <h5>
                      NEXT {shipmentModeNameInverse(data.mode)} FREIGHT <br />
                      <span className="text-white badge badge-danger">
                        COLLECTION DEADLINE
                      </span>
                    </h5>
                  </div>
                  <div>
                    <small>Shipment Collection Deadline:</small>
                    <br />
                    <p className="h5 font-weight-bold">
                      {data.mode === "PLANE"
                        ? new Date(data.departureTimestamp)
                            .toISOString()
                            .split("T")[0]
                        : addDays(new Date(data.departureTimestamp), -1)
                            .toISOString()
                            .split("T")[0]}
                      <br />
                      <span className="h6 text-danger">
                        {" " +
                          capitalize(
                            data.mode === "PLANE"
                              ? data.departureDay
                              : getDayStringWithNum(
                                  addDays(
                                    new Date(data.departureTimestamp),
                                    -1
                                  ).getDay()
                                )
                          )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="collection-card">
                  <div>
                    {data.mode === "PLANE" ? (
                      <GiCommercialAirplane size={80} className="update-icon" />
                    ) : (
                      <GiCargoShip size={80} className="update-icon" />
                    )}
                    <h5>
                      NEXT {shipmentModeNameInverse(data.mode)} FREIGHT{" "}
                      <span>DEPARTURE</span>
                    </h5>
                  </div>
                  <div>
                    <small>Shipment Departure:</small>
                    <br />
                    <p className="h5 font-weight-bold">
                      {data.mode === "PLANE"
                        ? addDays(new Date(data.departureTimestamp), 1)
                            .toISOString()
                            .split("T")[0]
                        : new Date(data.departureTimestamp)
                            .toISOString()
                            .split("T")[0]}
                      <br />
                      <span className="h6 text-danger">
                        {" " +
                          capitalize(
                            data.mode === "PLANE"
                              ? getDayStringWithNum(
                                  addDays(
                                    new Date(data.departureTimestamp),
                                    1
                                  ).getDay()
                                )
                              : data.departureDay
                          )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CollectionUpdate;
