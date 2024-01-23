import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { getBlogDetailState } from "state";
import { TBlog } from "types/blog";
import { Box, Text } from "zmp-react";
import { Header, Page } from "zmp-ui";

const BlogDetail = () => {
  const location = useLocation();
  const id = location.state?.id;
  const blogDetail = useRecoilValueLoadable(getBlogDetailState(id));
  return (
    <Page className="flex flex-col">
      <Header title="Chi tiết" className="pt-12" showBackIcon={true} />
      {blogDetail.state === "hasValue" && blogDetail.contents !== null ? (
        <div className="blog-detail-container max-w-4xl mx-auto p-4">
          <Text className="text-small font-bold mb-4">
            {blogDetail.contents?.title}
          </Text>
          <img
            src={blogDetail.contents.image}
            style={{
              width: "100%",

              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
          <article
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{
              __html: blogDetail.contents.metaData ?? "",
            }}
          />
        </div>
      ) : (
        <Box />
      )}
    </Page>
  );
};

export default BlogDetail;
