import Context from "hooks/bag";
import useUser from "libs/useUser";
import createID from "libs/createId";

import { Typography, Button, message } from "antd";
import { useState } from "react";
import { Transaction_Create } from "modules/transaction/create-transaction";
import { useRouter } from "next/router";

const { Text } = Typography;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Float({ cart }) {
  const { step, setStep, total, setData } = Context.useContainer();
  const { isLoggedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleNext = async () => {
    if (step < 3) {
      if (isLoggedIn) {
        if (step === 1) {
          setStep(step + 1);
        }
        if (step === 2) {
          try {
            const uniqueCode = Math.round(getRandomArbitrary(1, 99));
            const invoiceNumber = createID(5).toUpperCase();
            const products = cart.map((i) => ({
              id: i.id,
              quantity: i.quantity,
              product: i.product.id,
              price: i.product.price
            }));
            const data = {
              invoiceNumber,
              items: products,
              uniqueCode
            };
            setLoading(true);
            await Transaction_Create.fetcher(data).then((res) => {
              setData(res);
              // localStorage.setItem('myBag', '[]')
              setLoading(false);
              setStep(step + 1);
            });
          } catch {
            setLoading(false);
            message.error(`Can't process request`);
          }
        }
      } else {
        router.push(`/login?return=${router.pathname}`);
      }
    } else {
      router.push("/catalog");
    }
  };
  const itemArray = total.map((i) => i.count);
  const totalArray = total.map((i) => i.total);
  const countItem = itemArray.reduce((a, b) => a + b, 0);
  const countTotal = totalArray.reduce((a, b) => a + b, 0);
  return (
    <div className="wrapper">
      <style jsx>
        {`
          .wrapper {
            padding: 28px;
            border-radius: 16px;
            box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 100px;
          }
          .separator {
            height: 1px;
            width: 100%;
            background: #e8e8e8;
            margin: 14px 0 14px;
          }
        `}
      </style>
      <Text style={{ color: "var(--titleColor)", fontSize: 16, fontWeight: 600 }}>Cart Summary</Text>
      <div className="f f-btw" style={{ marginTop: 12 }}>
        <Text>
          Total item amount
          <br />
          <span style={{ fontSize: 12 }}>({countItem} items)</span>
        </Text>
        <Text style={{ color: "var(--titleColor)", fontWeight: 500 }}>
          Rp. {new Intl.NumberFormat(["ban", "id"]).format(countTotal)}
        </Text>
      </div>
      <div className="separator" />
      <div className="f f-btw f-end" style={{ marginBottom: 15 }}>
        <Text>Grand total</Text>
        <Text style={{ color: "var(--primaryColor)", fontSize: 18, fontWeight: 600 }}>
          Rp. {new Intl.NumberFormat(["ban", "id"]).format(countTotal)}
        </Text>
      </div>
      <Button loading={loading} disabled={total.length === 0} type="primary" block onClick={() => handleNext()}>
        {step === 1 && "Checkout"}
        {step === 2 && "Proceed"}
        {step === 3 && "Done"}
      </Button>
    </div>
  );
}
