import Intro from "./Intro";
import Details from "./Details";
import Finalize from "./Finalize";

import { useForm } from "react-hook-form";
import { size } from "lodash";
import { useState } from "react";
import { message, Modal, Typography, Button } from "antd";
import { cleanBody } from "libs/cleanBody";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProductContext } from "hooks/create-product";
import { Product__CreateContract } from "modules/product/create";

const { Title } = Typography;

export default function AddProduct({ circleData }) {
  const { step, setStep } = CreateProductContext.useContainer();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(Product__CreateContract.schema)
  });
  const handleSubmit = form.handleSubmit((data) => {
    if (step === 2) {
      const errors = form.errors;
      if (size(errors) === 0) {
        setStep(3);
      } else {
        message.error("Some field need to be filled!");
      }
    }
    if (step === 3) {
      const circle_id = circleData.id;
      let allData = {
        ...data,
        circle: circle_id
      };
      allData = cleanBody(allData);
      setLoading(true);
      Product__CreateContract.fetcher(allData)
        .then((res) => {
          message.success("Product successfully created!");
          setModalVisible(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          message.error("Failed to add product");
          setLoading(false);
        });
    }
  });
  const handleAddNew = () => {
    setModalVisible(false);
    setStep(1);
    form.reset();
  };
  return (
    <div style={{ padding: "30px 0" }}>
      <div className="step-container">
        <style jsx>
          {`
            .step-container {
              max-width: 480px;
              padding: 40px;
              background: #fff;
              border-radius: 16px;
              box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
              width: 100%;
              margin: 0 auto;
              position: relative;
            }
          `}
        </style>
        <form onSubmit={handleSubmit}>
          {step === 1 && <Intro data={circleData} />}
          <Details form={form} style={{ display: step === 2 ? "block" : "none" }} />
          <Finalize
            loading={loading}
            circleData={circleData}
            style={{ display: step === 3 ? "block" : "none" }}
            data={form.getValues()}
          />
        </form>
        <Modal visible={modalVisible} footer={false} width={480}>
          <div className="f f-ctr mdl f-c">
            <img
              src="/images/ciby/WebCat_S_c_final.png"
              style={{ width: 204, margin: "0 auto 20px", display: "block" }}
            />

            <Title level={3} strong style={{ textAlign: "center" }}>
              Yeaayy, your product
              <br />
              is added!
            </Title>
            <Typography.Text style={{ display: "block", textAlign: "center", maxWidth: "70%" }}>
              <span style={{ fontWeight: 600 }}>{form.getValues("name")}</span> is successfully added. Do you want to
              add another product?
            </Typography.Text>
            <div style={{ marginTop: 20 }} className="f f-c f-ctr mdl">
              <Button onClick={() => handleAddNew()} type="primary" style={{ marginBottom: 10 }}>
                <PlusOutlined />
                Add Another Product
              </Button>
              <Button onClick={() => router.push(`/circle/${router.query.circle}/catalog`)}>Go To Catalog</Button>
            </div>
            <br />
          </div>
        </Modal>
      </div>
    </div>
  );
}
