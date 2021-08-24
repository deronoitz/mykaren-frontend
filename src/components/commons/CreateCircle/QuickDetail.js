import { useState, useEffect } from "react";
import { Typography, Upload, Button } from "antd";
import { LoadingOutlined, PictureOutlined } from "@ant-design/icons";
import { Controller, useWatch } from "react-hook-form";

import getBase64 from "libs/getBase64";
import Link from "components/commons/Link";
import Input from "components/commons/Input";

const QuickDetail = (props) => {
  const [uploadLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const watchAvatar = useWatch({
    control: props.form.control,
    name: "avatar"
  });
  const watchName = useWatch({
    control: props.form.control,
    name: "name",
    defaultValue: ""
  });

  const handlePreview = async () => {
    const base64 = await getBase64(watchAvatar.file.originFileObj);
    setImageUrl(base64);
  };

  useEffect(() => {
    props.onTitleChange(watchName);
    props.onAvatarChange(watchAvatar);
    if (watchAvatar?.file?.originFileObj) {
      handlePreview();
    }
  }, [watchName, watchAvatar]);

  const uploadButton = (
    <div>{uploadLoading ? <LoadingOutlined /> : <PictureOutlined style={{ fontSize: 48, color: "#fff" }} />}</div>
  );

  return (
    <div>
      <Typography.Title level={3} strong style={{ textAlign: "center", width: 317, margin: "0 auto" }}>
        Some quick detail about your circle
      </Typography.Title>
      <div className="f mdl f-btw" style={{ margin: "40px 0 50px" }}>
        <div style={{ width: "65%" }}>
          <Typography.Text strong style={{ color: "#000" }}>
            What's your circle name
          </Typography.Text>
          <Controller
            defaultValue=""
            name="name"
            control={props.form.control}
            render={({ onChange, value }) => <Input placeholder="Circle Name" value={value} onChange={onChange} />}
          />

          <Typography.Text style={{ fontSize: 12, marginTop: 10, display: "block" }}>
            By creating a circle, you agree to MyKaren’s <br />
            <Link href="/">
              <a>Community Guidelines</a>
            </Link>
            .
          </Typography.Text>
        </div>

        <div className="f f-c f-ctr">
          <style jsx global>
            {`
              .avatar-uploader > .ant-upload {
                width: 138px;
                height: 138px;
                border-radius: 50%;
                border: solid 5px #dbdbdb;
                background: var(--primaryColor);
                overflow: hidden;
              }
            `}
          </style>
          <Controller
            name="avatar"
            control={props.form.control}
            defaultValue=""
            render={({ onChange }) => (
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                multiple={false}
                onChange={onChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} className="avatar" alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          />
          <Typography.Text className="centered" style={{ fontSize: 12 }}>
            Minimum size: 250x250px
          </Typography.Text>
        </div>
      </div>
      <div className="f mdl f-rht">
        <a className="link lined" onClick={() => props.onClickPrev()}>
          Previous
        </a>

        <Button
          disabled={watchName.length === 0}
          type="primary"
          onClick={() => props.onClickNext()}
          style={{ marginLeft: 30 }}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default QuickDetail;
