import { useEffect } from "react";
import { withSession } from "libs/session";

import PublicLayout from "components/Layout/PublicLayout";
import LoginForm from "components/User/LoginForm";
import KarenParticle from "components/Particle";
import css from "styled-jsx/css";

const style = css.global`
   {
    .signContainer {
      max-width: 450px;
      width: 100%;
      margin: 150px auto 0;
    }
    .banner {
      background: var(--primaryColor);
      max-width: 382px;
      padding: 30px 45px;
    }
    .form {
      width: 450px;
      padding: 45px 50px;
      border-radius: 16px;
      box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
      background: #fff;
    }
  }
`;

export default function LoginPage() {
  useEffect(() => {
    document.title = "Login | Combat";
  });
  return (
    <PublicLayout>
      <style jsx>{style}</style>
      <div style={{ position: "absolute", zIndex: -1, opacity: 0.3, top: 0 }}>
        <KarenParticle height={556} />
      </div>
      <div className="signContainer f">
        <LoginForm />
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("karen-user-data");
  if (res) {
    if (user) {
      try {
        await res.writeHead(302, { Location: "/dashboard" });
        await res.end();
      } catch {
        console.log("Error");
      }
    }
  }
  return {
    props: {}
  };
});
