import React from "react";

import img1 from "../../../shared/assets/1.png";
import img2 from "../../../shared/assets/2.png";
import img3 from "../../../shared/assets/3.png";
import img4 from "../../../shared/assets/4.png";
import img5 from "../../../shared/assets/5.png";
import img6 from "../../../shared/assets/6.png";
import "./MarketplaceSection.css";

const MarketplaceSection = () => {
  return (
    <section
      className="container marketplace-section my-5"
      id="marketPlaceSection"
    >
      <table>
        <tbody>
          <tr>
            <td rowSpan="2">
              <p className="img1">Great Customer Support</p>
              <img src={img1} />
            </td>
            <td>
              <p className="img2">Fast and Safe delivery</p>
              <img src={img2} />
            </td>
            <td>
              <p className="img2">7 years in operation</p>
              <img className="my-2" src={img3} />
            </td>
          </tr>
          <tr>
            <td>
              <p className="img2">Collection Nationwide</p>
              <img src={img4} />
            </td>
            <td rowSpan="2">
              <p className="img3">Quote provided</p>
              <img src={img5} />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <p className="img1">Best prices for air and sea cargo</p>
              <img className="mx-2" src={img6} />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
export default MarketplaceSection;
