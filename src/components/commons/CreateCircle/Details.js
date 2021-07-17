import { useState, useEffect } from "react";
import { Typography, Select, Input as InputDefault, Upload, Button } from "antd";
import { PictureOutlined, LoadingOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Circle__SlugContract } from "modules/circle/get-slug";
import { Circle__GetCategory } from "modules/circle/get-category";
import { Controller } from "react-hook-form";

import Input from "components/commons/Input";
import getBase64 from "libs/getBase64";
import slug from "limax";

const { Option } = Select;

const Details = (props) => {
  const [imgUrl, setImageUrl] = useState("");
  const [slugError, setSlugError] = useState(false);
  const [slugLoading, setSlugLoading] = useState(false);
  const watchSlug = props.form.watch("url", true);
  const watchBanner = props.form.watch("banner", true);
  const categorySWR = Circle__GetCategory.swr();

  const handlePreview = async () => {
    const base64 = await getBase64(watchBanner.file.originFileObj);
    setImageUrl(base64);
  };

  useEffect(() => {
    if (watchBanner?.file?.originFileObj) {
      handlePreview();
    }
  }, [watchBanner]);

  useEffect(() => {
    setSlugLoading(true);
    Circle__SlugContract.fetcher({ slug: watchSlug })
      .then((res) => {
        if (!res.data) {
          setSlugError(true);
          setSlugLoading(false);
        } else {
          setSlugError(false);
          setSlugLoading(false);
        }
      })
      .catch((err) => err);
  }, [watchSlug]);

  const uploadBanner = (
    <div>
      <PictureOutlined style={{ fontSize: 48, color: "#fff" }} />
    </div>
  );
  return (
    <div>
      <Typography.Title level={3} strong style={{ textAlign: "center", width: 383, margin: "0 auto" }}>
        Great, then add some details of &nbsp;
        {props.circleName}
      </Typography.Title>
      <div style={{ margin: "40px 0 50px" }}>
        <Typography.Text strong style={{ color: "#000", marginBottom: 5, display: "block" }}>
          About it
        </Typography.Text>
        <Controller
          defaultValue=""
          name="description"
          control={props.form.control}
          render={({ onChange, value }) => (
            <InputDefault.TextArea style={{ marginBottom: 25 }} value={value} onChange={onChange} placeholder="About" />
          )}
        />
        <Typography.Text strong style={{ color: "#000", marginBottom: 5, display: "block" }}>
          What we do
        </Typography.Text>
        <Controller
          defaultValue={[]}
          name="category"
          control={props.form.control}
          render={({ onChange, value }) => (
            <Select
              className="karenSelector"
              mode="multiple"
              style={{ width: "100%", marginBottom: 25 }}
              placeholder="Insert..."
              maxTagCount={3}
              value={value}
              onChange={onChange}
            >
              {categorySWR.data?.data?.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          )}
        />
        <Typography.Text strong style={{ color: "#000", marginBottom: 5, display: "block" }}>
          Circle Profile URL
        </Typography.Text>
        <Controller
          name="url"
          defaultValue={slug(props.circleName)}
          control={props.form.control}
          render={({ onChange, value }) => (
            <>
              <InputDefault
                className="inputAddOn"
                style={{ marginBottom: 25, width: "75%" }}
                addonBefore="http://mykaren.com/c/"
                onChange={onChange}
                value={value}
                suffix={
                  slugLoading ? (
                    <LoadingOutlined style={{ color: "#777" }} />
                  ) : !slugError ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#eb2f96" />
                  )
                }
              />
              {slugError && (
                <p style={{ marginTop: -20, color: "var(--primaryColor)" }}>
                  URL already exist. Please change URL value
                </p>
              )}
            </>
          )}
        />

        <Typography.Text strong style={{ color: "#000", display: "block" }}>
          Facebook link
        </Typography.Text>
        <Controller
          name="facebook"
          defaultValue=""
          control={props.form.control}
          render={({ onChange, value }) => (
            <Input
              style={{ width: "75%", marginBottom: 25 }}
              onChange={onChange}
              value={value}
              placeholder="Your Facebook link"
            />
          )}
        />

        <Typography.Text strong style={{ color: "#000" }}>
          Instagram account
        </Typography.Text>
        <Controller
          name="instagram"
          defaultValue=""
          control={props.form.control}
          render={({ onChange, value }) => (
            <Input
              style={{ width: "75%", marginBottom: 25 }}
              onChange={onChange}
              value={value}
              placeholder="Your Instagram username"
            />
          )}
        />

        <Typography.Text strong style={{ color: "#000" }}>
          Website
        </Typography.Text>
        <Controller
          name="website"
          defaultValue=""
          control={props.form.control}
          render={({ onChange, value }) => (
            <>
              <Input
                style={{ width: "75%", marginBottom: 25 }}
                onChange={onChange}
                value={value}
                placeholder="Your website URL"
                error={props.form.errors.website?.message}
              />
            </>
          )}
        />

        <Typography.Text strong style={{ color: "#000", marginBottom: 10, display: "block" }}>
          Banner
        </Typography.Text>
        <style jsx global>
          {`
            .banner-uploader > .ant-upload {
              width: 100%;
              height: 152px;
              border-radius: 8px;
              border: solid 5px #dbdbdb;
              overflow: hidden;
              background: var(--primaryColor);
            }
            .banner-uploader .img {
              width: 100%;
              height: 152px;
              object-fit: cover;
            }
          `}
        </style>
        <Controller
          name="banner"
          defaultValue={{}}
          control={props.form.control}
          render={({ onChange }) => (
            <Upload listType="picture-card" className="banner-uploader" showUploadList={false} onChange={onChange}>
              {imgUrl ? <img className="img" src={imgUrl} /> : uploadBanner}
            </Upload>
          )}
        />
        <Typography.Text style={{ fontSize: 12 }}>
          Karen recommend an image of at least 1920 x 768px for banner.
        </Typography.Text>
      </div>

      <div className="f mdl f-rht">
        <a className="link lined" onClick={() => props.onClickPrev()}>
          Previous
        </a>

        <Button loading={props.loading} type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Details;
