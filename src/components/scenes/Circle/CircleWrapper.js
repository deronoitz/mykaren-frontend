import CircleCard from "components/commons/CircleCard/CircleCard";
import EmptyData from "components/scenes/Circle/EmptyData";

import { Circle__GetContract } from "modules/circle/get";

const CircleWrapper = () => {
  const { data, isLoading } = Circle__GetContract.swr();
  return (
    <>
      {!data && "loading..."}
      {data?.data.length === 0 && <EmptyData />}
      {data?.data.length > 0 && (
        <div style={{ margin: "20px -12px 0" }}>
          {data?.data.map((i) => (
            <CircleCard
              key={i.id}
              slug={i.url}
              title={i.name}
              member={i.members.length}
              products={i.products.length}
              banner={i.banner}
              // count={2}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CircleWrapper;
