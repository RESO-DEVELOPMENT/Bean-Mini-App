export interface TBlog {
  id: string;
  title: string;
  blogContent: string;
  brandId: string;
  image: string;
  isDialog: boolean;
  metaData: string;
  status: string;
  priority: number;
}

export interface BlogDetails {
  id: string;
  title: string;
  blogContent: string;
  brandId: string;
  image: string;
  isDialog: boolean;
  metaData: string;
  status: string;
  priority: number;
  type: string;
}
