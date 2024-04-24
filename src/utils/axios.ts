import axios, { AxiosRequestConfig } from "axios";

// Custom Axios Type
export enum AxiosClientFactoryEnum {
  ADMIN = "admin",
  LOGIN = "login",
  PAYMENT = "payment",
  REPORT = "report",
  PROMOTION = "promotion",
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

const admin = "https://admin.reso.vn/api/v1/";
const account = `${process.env.REACT_APP_WEB_ADMIN_URL}`;
const paymentService = `${process.env.REACT_APP_PAYMENT_SERVICE_URL}`;
const report = `${process.env.REACT_APP_REPORT_BASE_URL}`;
const promotion = "https://api-pointify.reso.vn/api";
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
const requestPaymentServices = axios.create({
  baseURL: paymentService,
  paramsSerializer: parseParams,
});
requestPaymentServices.interceptors.request.use((options) => {
  const { method } = options;

  if (method === "put" || method === "post") {
    Object.assign(options.headers, {
      "Content-Type": "application/json;charset=UTF-8",
    });
  }

  return options;
});

requestPaymentServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Có lỗi xảy ra")
);

const requestLogin = axios.create({
  baseURL: account,
  paramsSerializer: parseParams,
});

const requestPromotion = axios.create({
  baseURL: promotion,
  paramsSerializer: parseParams,
});

requestPromotion.interceptors.request.use((options) => {
  const { method } = options;

  if (method === "put" || method === "post") {
    Object.assign(options.headers, {
      "Content-Type": "application/json;charset=UTF-8",
    });
  }

  return options;
});

requestPromotion.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Có lỗi xảy ra")
);

requestLogin.interceptors.request.use((options) => {
  const { method } = options;

  if (method === "put" || method === "post") {
    Object.assign(options.headers, {
      "Content-Type": "application/json;charset=UTF-8",
    });
  }

  return options;
});

requestLogin.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Có lỗi xảy ra")
);

const requestReport = axios.create({
  baseURL: report,
  paramsSerializer: parseParams,
});

requestReport.interceptors.request.use((options) => {
  const { method } = options;

  if (method === "put" || method === "post") {
    Object.assign(options.headers, {
      "Content-Type": "application/json;charset=UTF-8",
    });
  }

  return options;
});

requestReport.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Có lỗi xảy ra")
);

// ----------------------------------------------------------------------
class AxiosClientFactory {
  /**
   * Use to get instance of AxiosClientFactory
   * @param type AxiosClientFactoryEnum
   * @param _config AxiosRequestConfig
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
    _config: AxiosRequestConfig = {}
  ) {
    switch (type) {
      case "admin":
        return requestWebAdmin;
      case "login":
        return requestLogin;
      case "report":
        return requestReport;
      case "payment":
        return requestPaymentServices;
      case "promotion":
        return requestPromotion;
      default:
        return requestWebAdmin;
    }
  }
}

const axiosClientFactory = new AxiosClientFactory();
export const axiosInstances = {
  login: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.LOGIN),
  webAdmin: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.ADMIN),
  paymentService: axiosClientFactory.getAxiosClient(
    AxiosClientFactoryEnum.PAYMENT
  ),
  report: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.REPORT),
  promotion: axiosClientFactory.getAxiosClient(
    AxiosClientFactoryEnum.PROMOTION
  ),
};

export default axiosInstances.webAdmin;
