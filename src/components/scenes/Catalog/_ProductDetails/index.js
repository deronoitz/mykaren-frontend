import { useEffect } from "react";

import CircleProducts from "./CircleProducts";
import SimilarProducts from "./SimilarProducts";
import Float from "./Float";
import Gallery from "./Gallery";
import Info from "./Info";
import Context from "hooks/product-details";
import Breadcrumb from "components/commons/Breadcrumb";

export default function ProductDetails({ data }) {
  const product = data?.data;
  const { setData } = Context.useContainer();
  useEffect(() => {
    setData(product);
  }, [product]);
  return (
    <div>
      <style jsx>
        {`
          .right {
            min-width: 300px;
            width: 300px;
          }
          .left {
            width: calc(100% - 300px);
          }
        `}
      </style>
      <div className="container">
        <Breadcrumb />
        <div className="f" style={{ marginTop: 20, paddingBottom: 70 }}>
          <div className="left">
            <div className="f">
              <Gallery />
              <Info />
            </div>
          </div>
          <div className="right">
            <Float />
          </div>
        </div>
      </div>
      <CircleProducts />
      {/* <SimilarProducts /> */}
    </div>
  );
}
