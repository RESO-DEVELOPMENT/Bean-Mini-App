export interface TBlog {
  [x: string]: string | undefined;
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
