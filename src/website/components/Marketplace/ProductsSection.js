import React from "react";

import tape from "../../../shared/assets/tape.jpg";
import blackSheet from "../../../shared/assets/BlackSheet.jpg";
import largeBox from "../../../shared/assets/LargeBox.jpeg";
import mediumBox from "../../../shared/assets/MediumBox.jpeg";
import plasticSheet from "../../../shared/assets/plastic-sheet.jpg";
import barrel from "../../../shared/assets/barrel.jpg";
import fragileTape from "../../../shared/assets/FragileTape.jpg";
import ProductCard from "../../../shared/components/ProductCard";

const ProductsSection = () => {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-md-4 mb-5">
          <ProductCard
            type="product"
            imgSrc={tape}
            name="6 Pack of Adhesive Tape"
            price="£ 12.00"
          />
        </div>
        <div className="col-md-4 mb-5">
          <ProductCard
            type="product"
            imgSrc={blackSheet}
            name="Bale Wrap"
            price="£ 10.00"
          />
        </div>
        <div className="col-md-4 mb-5">
          <ProductCard
            type="product"
            imgSrc={largeBox}
            name="Large Box 60x60x60"
            price="£ 6.00"
          />
        </div>
        <div className="col-md-4 mb-5">
          <ProductCard
            type="product"
            imgSrc={mediumBox}
            name="Medium Box 50x50x57"
            price="£ 5.00"
          />
        </div>
        <div className="col-md-4 mb-5">
          <ProductCard
            type="product"
            imgSrc={plasticSheet}
            name="6 Pack of Shrink Wrap"
            price="£ 60.00"
          />
        </div>
        <div className="col-md-4 mb-5">
          <ProductCard
            type="product"
            imgSrc={barrel}
            name="Plastic Barrel"
            price="£ 40.00"
          />
        </div>
        <div className="col-md-4 mb-5">
          <ProductCard
            type="product"
            imgSrc={fragileTape}
            name="Fragile Packing Tape (48mm x 66m)"
            price="£ 2.00"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
