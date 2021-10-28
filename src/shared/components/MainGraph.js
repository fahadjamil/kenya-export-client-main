import * as React from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";

const MainGraph = (props) => {
  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    let values = [];
    for (let i = 0; i < props.data.length; i++) {
      values.push({ date: props.data[i].date, shipments: props.data[i].count });
      if (i === props.data.length - 1) setData(values);
    }
  }, [props.data]);

  return (
    data.length !== 0 && (
      <div className="bg-white rounded shadow mt-3 px-3 py-3 mb-5">
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="shipments"
            argumentField="date"
            color="#0799c2"
          />
          <Title text="Total Shipments Statistics" />
          <Animation />
        </Chart>
      </div>
    )
  );
};

export default MainGraph;
