import TransactionWrapper from "components/commons/Transaction/Wrapper";
import qs from "query-string";

import { Typography } from "antd";
import { Transaction_Get } from "modules/transaction/get-transaction";

export default function Order() {
  const query = qs.stringify({});
  const TransactionSWR = Transaction_Get.swr(`?${query}`, {
    onSuccess: (res) => {
      console.log(res);
    }
  });
  return (
    <div>
      <Typography.Title level={4}>Circle Order</Typography.Title>
      <TransactionWrapper />
    </div>
  );
}
