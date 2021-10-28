import React, { useContext, useEffect, useState } from "react";
import { RiShipFill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import BigGradientCard from "../../../shared/components/BigGradientCard";

import "./Dashboard.css";
import MainGraph from "../../../shared/components/MainGraph";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [stats, setStats] = useState();
  const [graphValues, setGraphValues] = useState([]);

  const getDashboardStatsApi = async () => {
    const response = await sendRequest(
      `shipment/shipment_stats/${auth.userId}`
    );
    setStats(response.data.shipment_stats);
  };

  const getGraphValuesApi = async () => {
    const response = await sendRequest(
      `shipment/get_graph_data/${auth.userId}/30`
    );
    setGraphValues(response.data.stats);
  };

  useEffect(() => {
    getDashboardStatsApi();
    getGraphValuesApi();
  }, []);

  return (
    <div className="container-fluid admin-dashboard">
      {stats && (
        <div className="row">
          <BigGradientCard
            color="purple"
            heading="Ship by Sea"
            icon={<RiShipFill size={20} />}
            one={{
              name: "Today's Shipment",
              value: stats?.ship?.today,
              link: "\\",
            }}
            two={{
              name: "Unpaid Shipment",
              value: stats?.ship?.unpaid,
              link: "\\",
            }}
            three={{
              name: "In-progress Shipment",
              value: stats?.ship?.pending,
              link: "\\",
            }}
            four={{
              name: "Completed Shipment",
              value: stats?.ship?.completed,
              link: "\\",
            }}
          />
          <BigGradientCard
            color="orange"
            heading="Ship by Air"
            icon={<FaPlaneDeparture size={20} />}
            one={{
              name: "Today's Shipment",
              value: stats?.plane?.today,
              link: "\\",
            }}
            two={{
              name: "Unpaid Shipment",
              value: stats?.plane?.unpaid,
              link: "\\",
            }}
            three={{
              name: "In-progress Shipment",
              value: stats?.plane?.pending,
              link: "\\",
            }}
            four={{
              name: "Completed Shipment",
              value: stats?.plane?.completed,
              link: "\\",
            }}
          />
          <BigGradientCard
            color="blue"
            heading="Buy n Ship"
            icon={<MdShoppingCart size={20} />}
            one={{
              name: "Today's Shipment",
              value: stats?.buynship?.today,
              link: "\\",
            }}
            two={{
              name: "Unpaid Shipment",
              value: stats?.buynship?.unpaid,
              link: "\\",
            }}
            three={{
              name: "In-progress Shipment",
              value: stats?.buynship?.pending,
              link: "\\",
            }}
            four={{
              name: "Completed Shipment",
              value: stats?.buynship?.completed,
              link: "\\",
            }}
          />
        </div>
      )}
      <MainGraph data={graphValues} />
    </div>
  );
};

export default Dashboard;
