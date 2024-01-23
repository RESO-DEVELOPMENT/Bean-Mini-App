import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { BlogDetails, TBlog } from "types/blog";

const getListBlog = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TBlog>>(`users/blog`, {
    params,
  });

const getBlogDetails = (id: string, params?: any) =>
  requestWebAdmin.get<BlogDetails>(`blogposts/${id}`, {
    params,
  });

const blogApi = {
  getListBlog,
  getBlogDetails,
};

export default blogApi;
