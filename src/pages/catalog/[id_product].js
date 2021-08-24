import PublicLayout from "components/commons/Layout/PublicLayout";
import ProductDetails from "components/scenes/Catalog/_ProductDetails";
import Context from "hooks/product-details";
import qs from "query-string";

import { Product__GetCatalog } from "modules/product/get-catalog";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { query } = router;
  const stringify = qs.stringify({ id: query.id_product });
  const productSWR = Product__GetCatalog.swr("?" + stringify);
  const data = productSWR.data;
  useEffect(() => {
    document.title = data?.data?.[0].name || "Product" + " | MyKaren";
  });
  return (
    <Context.Provider>
      <PublicLayout>
        {!data && (
          <div className="f f-ctr mdl" style={{ minHeight: "90vh" }}>
            <LoadingOutlined style={{ fontSize: 32, color: "#ccc" }} />
          </div>
        )}
        {data && <ProductDetails data={data} />}
      </PublicLayout>
    </Context.Provider>
  );
}
