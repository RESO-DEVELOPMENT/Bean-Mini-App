import blogApi from "api/blog";
import { selector, selectorFamily } from "recoil";
import { BlogDetails } from "types/blog";

export const listBlogState = selector({
  key: "listBlog",
  get: async () => {
    const listBlog = await blogApi.getListBlog({
      page: 1,
      size: 10,
      brandCode: "VHGP",
    });
    return listBlog.data.items;
  },
});
export const getBlogDetailState = selectorFamily<BlogDetails, string>({
  key: "blogDetails",
  get: (blogId) => async () => {
    const order = await blogApi.getBlogDetails(blogId);
    return order.data;
  },
});
