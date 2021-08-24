import { useState } from "react";
import Router from "next/router";
import { Typography, Checkbox, Button, message } from "antd";
import User__SignContract from "modules/user/signIn";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "components/commons/Input";
import Link from "next/link";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({});
  const onSubmit = form.handleSubmit((data) => {
    setLoading(true);
    User__SignContract.fetcher(data)
      .then((res) => {
        if (res.code >= 400) {
          message.error(res.message);
        } else {
          const redirect = router.query?.return;
          message.success("Login success, please wait...");
          Router.push(redirect || "/dashboard");
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  });

  return (
    <div className="form">
      <div className="f f-ctr mdl f-c" style={{ marginBottom: 35 }}>
        <Typography.Title level={3}>Welcome back!</Typography.Title>
        <Typography.Text>We are so excited to see you again</Typography.Text>
      </div>
      <form onSubmit={onSubmit}>
        <Controller
          control={form.control}
          name="email"
          defaultValue=""
          render={({ onChange, value }) => (
            <Input onChange={onChange} value={value} placeholder="Email Address" style={{ marginBottom: 10 }} />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Password"
              type="password"
              style={{ marginBottom: 20 }}
            />
          )}
        />
        <Controller
          control={form.control}
          name="remember"
          defaultValue={false}
          render={({ onChange, value }) => (
            <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value}>
              Remember me
            </Checkbox>
          )}
        />
        <div style={{ marginTop: 20, marginBottom: 10 }}>
          <Button loading={loading} block size="large" type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </form>
      <Typography.Text>
        Need an account? &nbsp;
        <Link href="/register">Register</Link>
      </Typography.Text>
    </div>
  );
}
