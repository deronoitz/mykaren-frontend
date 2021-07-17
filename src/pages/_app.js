import Layout from "components/commons/Layout";
import "assets/Base.less";
import "assets/Flex.less";
import "antd/dist/antd.less";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
