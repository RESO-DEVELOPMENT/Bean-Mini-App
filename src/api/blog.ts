import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { TBlog } from "types/blog";

const getListBlog = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TBlog>>(`users/blog`, {
    params,
  });

const blogApi = {
  getListBlog,
};

export default blogApi;
