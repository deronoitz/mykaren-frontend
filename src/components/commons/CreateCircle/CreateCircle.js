import Intro from "./Intro";
import Details from "./Details";
import QuickDetail from "./QuickDetail";
import useUser from "libs/useUser";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { cleanBody } from "libs/cleanBody";
import { message, Modal, Typography, Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Circle__CreateContract } from "modules/circle/create";

const { Title, Text } = Typography;

export default function CreateCircle(props) {
  const [step, setStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [circleName, setCircleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const [avatarImage, setAvatarImage] = useState({});
  const router = useRouter();
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(Circle__CreateContract.schema)
  });
  const { user } = useUser();
  const handleSubmit = form.handleSubmit((data) => {
    let dataOut = {
      ...data,
      owner: user.id,
      name: circleName,
      members: [user.id],
      profilePicture: avatarImage?.file?.originFileObj,
      banner: data.banner?.file?.originFileObj
    };
    dataOut = cleanBody(dataOut);
    setLoading(true);
    Circle__CreateContract.fetcher(dataOut)
      .then((res) => {
        setSlug(res.url);
        setModalVisible(true);
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  });

  return (
    <div style={{ padding: "30px 0" }}>
      <div className="step-container">
        <style jsx>
          {`
            .step-container {
              max-width: ${step === 0 ? "480px" : "715px"};
              padding: ${step === 0 ? "40px" : "57px"};
              background: #fff;
              box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
              border-radius: 16px;
              width: 100%;
              margin: 0 auto;
            }
          `}
        </style>
        {step === 0 && <Intro onClickNext={() => setStep(1)} />}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <QuickDetail
              form={form}
              onTitleChange={(e) => setCircleName(e)}
              circleName={circleName}
              onClickPrev={() => setStep(0)}
              onClickNext={() => setStep(2)}
              onAvatarChange={(e) => setAvatarImage(e)}
            />
          )}
          {step === 2 && (
            <Details form={form} loading={loading} circleName={circleName} onClickPrev={() => setStep(1)} />
          )}
        </form>
        <Modal visible={modalVisible} footer={false} closable={false} width={480}>
          <div className="f f-ctr mdl f-c">
            <img
              src="/images/ciby/WebCat_S_c_final.png"
              style={{ width: 204, margin: "0 auto 20px", display: "block" }}
            />

            <Title level={3} strong style={{ textAlign: "center" }}>
              Yeaayy, your circle
              <br />
              is created!
            </Title>
            <Typography.Text style={{ display: "block", textAlign: "center", maxWidth: "70%" }}>
              Your circle is successfully created. Let's check what is inside your circle!
            </Typography.Text>
            <div style={{ marginTop: 20 }} className="f f-c f-ctr mdl">
              <Button onClick={() => router.push(`/circle/${slug}`)} type="primary" style={{ marginBottom: 10 }}>
                Go to Circle Menu
              </Button>
              <Button onClick={() => router.push(`/dashboard`)}>Back to Dashboard</Button>
            </div>
            <br />
          </div>
        </Modal>
      </div>
    </div>
  );
}
