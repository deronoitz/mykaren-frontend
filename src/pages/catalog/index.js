import PublicLayout from "components/Layout/PublicLayout";
import Search from "components/_Catalog/Search";
import CardWrapper from "components/_Catalog/CardWrapper";
import Filter from "components/_Catalog/Filter";
import { Product__GetCatalog } from "modules/product/get-catalog";
import { useEffect } from "react";
import { Typography } from "antd";
import { useRouter } from "next/router";
const { Title, Text } = Typography;

export default function Catalog() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.search) {
      document.title = `Search "${query.search}" | MyKaren`;
    }
    if (!query.search) {
      document.title = "Browse product | MyKaren";
    }
  }, [query]);

  const isSearch = query.search?.length > 0;
  const getQuery =
    query.search?.length > 0 ? `?name_contains=${query.search}` : "";
  const productSWR = Product__GetCatalog.swr(getQuery);
  const products = productSWR.data?.data;

  return (
    <PublicLayout>
      <style jsx>
        {`
          .related-item {
            margin: 0 10px;
            display: inline-block;
          }
        `}
      </style>
      <Search />
      <div style={{ padding: "30px 0" }}>
        <div className="container">
          <Title level={1} className="centered">
            {!query.search && "Catalog"}
            {isSearch && products && `${products?.length} products found`}
            {isSearch && !products && "Loading..."}
          </Title>
          <Text
            className="centered"
            style={{ display: "block", fontSize: 16, marginBottom: 10 }}
          >
            {isSearch && (
              <div>
                Search result for "{query.search}" -{" "}
                <a onClick={() => router.push("/catalog")}>Clear search</a>
              </div>
            )}
            {!query.search && "Browse all products on events"}
          </Text>
          {/* <div className="f mdl f-ctr">
            <Text style={{ marginRight: 10, fontWeight: 500 }}>Suggested:</Text>
            <a className="related-item">fgo</a>
            <a className="related-item">arknight</a>
            <a className="related-item">vtuber</a>
            <a className="related-item">genshin impact</a>
            <a className="related-item">r18</a>
          </div> */}
        </div>
      </div>
      <Filter />
      <CardWrapper data={products} />
    </PublicLayout>
  );
}
