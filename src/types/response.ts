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

export interface BaseZaloApiResponse<T> {
  data: T;
  error: number;
  message: string;
}

export interface PhoneNumberResponse {
  number: string;
}
export interface LocationResponse {
  provider: string;
  latitude: string;
  longitude: string;
  timestamp: string;
}
