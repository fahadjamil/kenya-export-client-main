import React, { useContext, useEffect, useState } from "react";
import { RiShipFill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import BigGradientCard from "../../../shared/components/BigGradientCard";
import MainGraph from "../../../shared/components/MainGraph";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [stats, setStats] = useState();
  const [graphValues, setGraphValues] = useState([]);

  const getDashboardStatsApi = async () => {
    const response = await sendRequest(`shipment/shipment_stats`);
    setStats(response.data.shipment_stats);
  };

  const getGraphValuesApi = async () => {
    const response = await sendRequest(`shipment/get_graph_data/30`);
    setGraphValues(response.data.stats);
  };

  useEffect(() => {
    console.log(graphValues);
  }, [graphValues]);

  useEffect(() => {
    getDashboardStatsApi();
    getGraphValuesApi();
  }, []);

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row">
        <BigGradientCard
          color="purple"
          heading="Ship by Sea"
          icon={<RiShipFill size={20} />}
          one={{
            name: "Today's Shipment",
            value: stats?.ship?.today || 0,
            link: "/",
          }}
          two={{
            name: "Unpaid Shipment",
            value: stats?.ship?.unpaid || 0,
            link: "\\",
          }}
          three={{
            name: "In-progress Shipment",
            value: stats?.ship?.pending || 0,
            link: "\\",
          }}
          four={{
            name: "Completed Shipment",
            value: stats?.ship?.completed || 0,
            link: "\\",
          }}
        />
        <BigGradientCard
          color="orange"
          heading="Ship by Air"
          icon={<FaPlaneDeparture size={20} />}
          one={{
            name: "Today's Shipment",
            value: stats?.plane?.today || 0,
            link: "\\",
          }}
          two={{
            name: "Unpaid Shipment",
            value: stats?.plane?.unpaid || 0,
            link: "\\",
          }}
          three={{
            name: "In-progress Shipment",
            value: stats?.plane?.pending || 0,
            link: "\\",
          }}
          four={{
            name: "Completed Shipment",
            value: stats?.plane?.completed || 0,
            link: "\\",
          }}
        />
        <BigGradientCard
          color="blue"
          heading="Buy n Ship"
          icon={<MdShoppingCart size={20} />}
          one={{
            name: "Today's Shipment",
            value: stats?.buynship?.today || 0,
            link: "\\",
          }}
          two={{
            name: "Unpaid Shipment",
            value: stats?.buynship?.unpaid || 0,
            link: "\\",
          }}
          three={{
            name: "In-progress Shipment",
            value: stats?.buynship?.pending || 0,
            link: "\\",
          }}
          four={{
            name: "Completed Shipment",
            value: stats?.buynship?.completed || 0,
            link: "\\",
          }}
        />
      </div>
      {graphValues && <MainGraph data={graphValues} />}
    </div>
  );
};

export default Dashboard;
