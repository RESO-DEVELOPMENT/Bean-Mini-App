import React, { FC } from "react";
import { Spinner } from "zmp-ui";
import beanLogo from "static/logo.png";


export const ContentFallback: FC = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Spinner visible logo={beanLogo} />
      </div>
    );
  };
 