import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { getConfig } from "utils/config";
import { Layout } from "./layout";
import { ConfigProvider } from "./config-provider";
import { ProductContextProvider } from "./context/app-context";

const MyApp = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <ProductContextProvider>
          <App>
            <SnackbarProvider>
              <ZMPRouter>
                <Layout />
              </ZMPRouter>
            </SnackbarProvider>
          </App>
        </ProductContextProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
