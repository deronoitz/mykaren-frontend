import { Typography, Tag, Button, Alert } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Transaction_Get } from "modules/transaction/get-transaction";
import { useRouter } from "next/router";

import Status from "./Status";
import groupProductByCircle from "libs/groupProductByCircle";
import CircleProduct from "./CircleProduct";
import moment from "moment";
import Link from "next/link";

const { Title, Text } = Typography;

export default function DetailTransaction() {
  const router = useRouter();
  const { id } = router.query;
  const TransactionSWR = Transaction_Get.swr(`?id=${id}`);
  const data = TransactionSWR.data?.data?.[0];
  const date = moment(data?.createdAt).format("DD MMMM YYYY, LTS");
  const circle = data ? groupProductByCircle(data?.items) : [];
  return (
    <div>
      <style jsx>
        {`
          .info td {
            padding: 5px 0;
          }
          .item {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin: 10px 0;
          }
          .wrapper {
            padding: 26px 34px;
          }
        `}
      </style>
      <Link href="/transaction">
        <a style={{ display: "inline-block" }}>
          <Title level={4}>
            <ArrowLeftOutlined style={{ marginRight: 12 }} />
            Back to My Order
          </Title>
        </a>
      </Link>
      {data && (
        <>
          <div className="item">
            <div className="wrapper f f-btw mdl" style={{ borderBottom: "solid 1px #e8e8e8" }}>
              <div>
                <div className="f mdl">
                  <Text style={{ fontSize: 16, fontWeight: 500, color: "var(--titleColor)", marginRight: 12 }}>
                    {data.invoiceNumber}
                  </Text>
                  {data.status === "waiting-for-payment" && <Tag color="var(--primaryColor)">New</Tag>}
                  <Status status={data.status} />
                </div>
                <Text style={{ fontSize: 12, color: "var(--contentColor)" }}>
                  {data.items.length} Items | {date}
                </Text>
              </div>
              <div>
                <Text style={{ color: "var(--contentColor)" }}>
                  Total:{" "}
                  <span style={{ fontWeight: 700, color: "var(--titleColor)" }}>
                    Rp. {new Intl.NumberFormat(["ban", "id"]).format(data.total + data.uniqueCode)}
                  </span>
                </Text>
              </div>
            </div>
            <div className="wrapper">
              <Alert
                message={<Text style={{ fontWeight: 500, fontSize: 14 }}>Waiting for payment</Text>}
                description={
                  <Text style={{ fontSize: 12 }}>
                    You need to upload the proof of transfer to verify the transaction.
                  </Text>
                }
                type="warning"
                action={<Button type="primary">Upload proof of transfer</Button>}
                showIcon
                style={{ marginBottom: 20 }}
              />
              <Text style={{ fontSize: 16, fontWeight: 500, color: "var(--titleColor)", marginRight: 12 }}>
                Purchased Items
              </Text>

              {circle.map((i, index) => (
                <CircleProduct key={index} data={i} />
              ))}

              <div style={{ padding: "20px 0 10px", borderTop: "solid 1px #e8e8e8" }} className="f f-rht">
                <table className="info">
                  <tbody>
                    <tr>
                      <td style={{ width: 170 }}>Sub-total</td>
                      <td style={{ textAlign: "right" }}>
                        <Text style={{ fontWeight: 500, color: "var(--titleColor" }}>
                          Rp. {new Intl.NumberFormat(["ban", "id"]).format(data.total)}
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td>Unique Code*</td>
                      <td style={{ textAlign: "right" }}>
                        <Text style={{ fontWeight: 500, color: "var(--titleColor" }}>{data.uniqueCode}</Text>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Text style={{ fontWeight: 500, color: "var(--titleColor)" }}>Total Amount</Text>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Text style={{ fontWeight: 500, color: "var(--titleColor" }}>
                          Rp. {new Intl.NumberFormat(["ban", "id"]).format(data.total + data.uniqueCode)}
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td style={{ textAlign: "right" }}>
                        <Status status={data.status} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
