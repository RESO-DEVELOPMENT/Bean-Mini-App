export type BaseReponse<T> = {
  items: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
};

export type TRequestPaging = {
  size?: number;
  page?: number;
  total?: number;
  totalPage?: number;
};
