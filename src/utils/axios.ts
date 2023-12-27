import axios, { AxiosRequestConfig } from "axios";

// Custom Axios Type
export enum AxiosClientFactoryEnum {
  ADMIN = "admin",
  ZALOAPI = "zalo",
}

// ----------------------------------------------------------------------

export const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray =
      isParamTypeObject &&
      Array.isArray(params[key]) &&
      params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const admin = `https://admin.reso.vn/api/v1/`;
const zaloApi = `https://admin.reso.vn/api/v1/`;

const requestWebAdmin = axios.create({
  baseURL: admin,
  paramsSerializer: parseParams,
});

requestWebAdmin.interceptors.request.use((options) => {
  const { method } = options;

  if (method === "put" || method === "post") {
    Object.assign(options.headers, {
      "Content-Type": "application/json;charset=UTF-8",
    });
  }

  return options;
});

requestWebAdmin.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Có lỗi xảy ra")
);

const requestZaloApi = axios.create({
  baseURL: zaloApi,
  paramsSerializer: parseParams,
});

requestZaloApi.interceptors.request.use((options) => {
  const { method } = options;

  if (method === "put" || method === "post" || method === "patch") {
    Object.assign(options.headers, {
      "Content-Type": "application/json;charset=UTF-8",
    });
  }

  return options;
});

requestZaloApi.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Có lỗi xảy ra")
);

// ----------------------------------------------------------------------
class AxiosClientFactory {
  /**
   * Use to get instance of AxiosClientFactory
   * @param type AxiosClientFactoryEnum
   * @param config AxiosRequestConfig
   * @returns AxiosInstance
   *
   * @example
   * ```javascript
   *
   * // Get the Axios Instance
   * import { axiosClientFactory, axiosInstance } from 'utils/axios';
   * var axiosInstance = axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.SALE);
   *
   *
   * ```
   *
   */
  getAxiosClient(
    type?: AxiosClientFactoryEnum,
    config: AxiosRequestConfig = {}
  ) {
    switch (type) {
      case "admin":
        return requestWebAdmin;
      case "zalo":
        return requestZaloApi;
      default:
        return requestWebAdmin;
    }
  }
}

const axiosClientFactory = new AxiosClientFactory();
/**
 * Singleton Pattern for Axios Request
 */
export const axiosInstances = {
  webAdmin: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.ADMIN),
  zaloApi: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.ZALOAPI),
};

export default axiosInstances.webAdmin;
