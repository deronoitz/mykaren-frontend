import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import User__CreateContract from "modules/user/create";
import Recaptcha__Contract from "modules/recaptcha";
import { useForm, Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import Input from "../../components/Input/Input";
import Link from "next/link";
import { Typography, Button, Radio, message } from "antd";
const { Text } = Typography;
const Label = (props) => (
  <Text
    strong
    style={{ color: "var(--titleColor)", marginBottom: 4, display: "block" }}
  >
    {props.children}
  </Text>
);
export function RegisterForm({ onFinish, setEmail }) {
  let [isStudent, setIsStudent] = useState(false);
  let [loading, setLoading] = useState(false);
  let [isHuman, setHuman] = useState(false);
  let form = useForm({
    resolver: yupResolver(User__CreateContract.schema)
  });

  let onSubmit = form.handleSubmit((data) => {
    setLoading(true);
    User__CreateContract.fetcher(data)
      .then((res) => {
        if (res.code >= 400) {
          message.error(res.message);
        } else {
          setEmail(data.email);
          message.success("Registration success!");
          onFinish();
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  });

  let handleRecaptchaSubmit = (data) => {
    Recaptcha__Contract.fetcher({
      key: data
    }).then((res) => {
      if (res.message === "Success") {
        setHuman(true);
      }
    });
  };

  return (
    <div className="form" style={{ marginBottom: 100 }}>
      <div className="f f-ctr mdl f-c" style={{ marginBottom: 25 }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Welcome to Combat! Let's introduce yourself!
        </Typography.Title>
        <Typography.Text>We want to know you more</Typography.Text>
      </div>
      <form onSubmit={onSubmit}>
        <div className="f mdl" style={{ width: "100%" }}>
          <Controller
            defaultValue=""
            name="firstName"
            control={form.control}
            render={({ onChange, value }) => (
              <Input
                parentStyle={{ width: "100%" }}
                placeholder="First Name"
                style={{ marginBottom: 10 }}
                onChange={onChange}
                value={value}
                error={form.errors.firstName && form.errors.firstName.message}
              />
            )}
          />
          &nbsp;&nbsp;
          <Controller
            defaultValue=""
            name="lastName"
            control={form.control}
            render={({ onChange, value }) => (
              <Input
                parentStyle={{ width: "100%" }}
                placeholder="Last Name"
                onChange={onChange}
                value={value}
                style={{ marginBottom: 10 }}
                error={form.errors.lastName && form.errors.lastName.message}
              />
            )}
          />
        </div>

        <Controller
          defaultValue=""
          control={form.control}
          name="username"
          render={({ onChange, value }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Username"
              style={{ marginBottom: 10 }}
              error={form.errors.username && form.errors.username.message}
            />
          )}
        />

        <Controller
          defaultValue=""
          control={form.control}
          name="email"
          render={({ onChange, value }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Email Address"
              style={{ marginBottom: 10 }}
              error={form.errors.email && form.errors.email.message}
            />
          )}
        />

        <Controller
          defaultValue=""
          control={form.control}
          name="password"
          render={({ onChange, value }) => (
            <Input
              placeholder="Password"
              type="password"
              onChange={onChange}
              value={value}
              style={{ marginBottom: 10 }}
              error={form.errors.password && form.errors.password.message}
            />
          )}
        />
        <Controller
          defaultValue=""
          name="phoneNumber"
          control={form.control}
          render={({ onChange, value }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Phone Number"
              style={{ marginBottom: 20 }}
            />
          )}
        />
        <div>
          <Label>Are you a student?</Label>
          <Radio.Group
            style={{ marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setIsStudent(e.target.value)}
            value={isStudent}
          >
            <Radio value={true}>Yes, I'm a student</Radio>
            <Radio value={false}>No, I'm stranger</Radio>
          </Radio.Group>

          {isStudent && (
            <>
              <Controller
                defaultValue=""
                control={form.control}
                name="nis"
                render={({ onChange, value }) => (
                  <Input
                    placeholder="NIS ID"
                    onChange={onChange}
                    value={value}
                    style={{ marginBottom: 10 }}
                  />
                )}
              />
              <Typography.Text
                style={{
                  fontSize: 14,
                  color: "var(--contentColor)"
                }}
              >
                Contoh NIS: 1154
              </Typography.Text>
            </>
          )}
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_CLIENT_RECAPTCHA}
          style={{ marginTop: 20 }}
          onChange={handleRecaptchaSubmit}
        />
        <div style={{ marginTop: 20, marginBottom: 10 }}>
          <Button
            block
            size="large"
            type="primary"
            htmlType="submit"
            disabled={!isHuman}
            loading={loading}
          >
            Sign Up
          </Button>
        </div>
      </form>
      <Typography.Text>
        Already have an account? &nbsp;
        <Link href="/login">Login</Link>
      </Typography.Text>
    </div>
  );
}
